"""
Datasets router: handles file uploads, listing, retrieval, deletion, and preview.
"""
from __future__ import annotations

import logging
import os
import tempfile
import uuid
from pathlib import Path
from typing import Optional

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import (
    get_db,
    get_file_processor,
    get_schema_detector,
    get_table_manager,
)
from app.models.dataset import Dataset
from app.schemas.dataset import (
    DatasetCreate,
    DatasetListResponse,
    DatasetPreview,
    DatasetResponse,
)
from app.security.sanitizer import sanitize_user_input, validate_filename
from app.services.file_processor import FileProcessor
from app.services.schema_detector import SchemaDetector
from app.services.table_manager import TableManager
from app.utils.exceptions import (
    DatasetNotFoundError,
    FileProcessingError,
    FileTooLargeError,
    TableCreationError,
    UnsupportedFileTypeError,
)
from app.utils.type_mapping import sanitize_table_name

logger = logging.getLogger(__name__)

router = APIRouter()

# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------


def _make_table_name(dataset_id: uuid.UUID, filename: str) -> str:
    """Build a unique, safe table name: ds_<first8uuid>."""
    short_id = str(dataset_id).replace("-", "")[:8]
    stem = sanitize_table_name(filename)
    return f"ds_{short_id}_{stem}"[:63]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.post(
    "/upload",
    response_model=DatasetResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a CSV or Excel file to create a new dataset",
)
async def upload_dataset(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="CSV or Excel file to upload"),
    name: Optional[str] = Form(None, description="Human-readable dataset name"),
    db: AsyncSession = Depends(get_db),
    file_processor: FileProcessor = Depends(get_file_processor),
    schema_detector: SchemaDetector = Depends(get_schema_detector),
    table_manager: TableManager = Depends(get_table_manager),
) -> DatasetResponse:
    """
    Upload a tabular file and create a queryable dataset.

    The file is validated, processed, schema-detected, and stored in the
    ``user_data`` schema.  A ``Dataset`` metadata record is created
    immediately (status='processing') and the heavy data insertion happens
    in the background, updating status to 'ready' or 'error'.
    """
    original_filename = file.filename or "upload"

    try:
        safe_filename = validate_filename(original_filename)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    # Read file bytes to check size before touching disk
    content = await file.read()
    file_size = len(content)

    try:
        await file_processor.validate_file(file_size, safe_filename)
    except FileTooLargeError as exc:
        raise HTTPException(status_code=413, detail=str(exc))
    except UnsupportedFileTypeError as exc:
        raise HTTPException(status_code=415, detail=str(exc))

    dataset_id = uuid.uuid4()
    table_name = _make_table_name(dataset_id, safe_filename)
    dataset_name = sanitize_user_input(name or Path(safe_filename).stem, max_length=255)

    # Persist to a temp file for async processing
    tmp_dir = tempfile.mkdtemp()
    tmp_path = Path(tmp_dir) / safe_filename
    tmp_path.write_bytes(content)

    # Create dataset record (status=processing)
    dataset = Dataset(
        id=dataset_id,
        name=dataset_name,
        original_filename=safe_filename,
        table_name=table_name,
        file_size_bytes=file_size,
        status="processing",
    )
    db.add(dataset)
    await db.flush()
    await db.commit()

    # Schedule heavy work in background
    background_tasks.add_task(
        _process_and_store,
        tmp_path=tmp_path,
        tmp_dir=tmp_dir,
        safe_filename=safe_filename,
        dataset_id=dataset_id,
        table_name=table_name,
        file_processor=file_processor,
        schema_detector=schema_detector,
        table_manager=table_manager,
    )

    # Refresh and return
    await db.refresh(dataset)
    return DatasetResponse.model_validate(dataset)


async def _process_and_store(
    tmp_path: Path,
    tmp_dir: str,
    safe_filename: str,
    dataset_id: uuid.UUID,
    table_name: str,
    file_processor: FileProcessor,
    schema_detector: SchemaDetector,
    table_manager: TableManager,
) -> None:
    """Background task: process file, detect schema, insert data, update dataset status."""
    from app.database import AsyncSessionLocal

    async with AsyncSessionLocal() as session:
        try:
            result = await file_processor.process_file(tmp_path, safe_filename)
            columns = schema_detector.detect_schema(result.df, result.column_mapping)

            row_count = await table_manager.create_table_and_insert(
                dataset_id=str(dataset_id),
                df=result.df,
                columns=columns,
                table_name=table_name,
            )

            # Serialize column schema for storage
            col_schema = [col.model_dump() for col in columns]

            # Update dataset metadata
            stmt = select(Dataset).where(Dataset.id == dataset_id)
            ds_result = await session.execute(stmt)
            dataset = ds_result.scalar_one_or_none()

            if dataset:
                dataset.column_schema = col_schema
                dataset.row_count = row_count
                dataset.status = "ready"
                await session.commit()
                logger.info("Dataset %s is now ready (%d rows).", dataset_id, row_count)

        except Exception as exc:
            logger.error("Background processing failed for dataset %s: %s", dataset_id, exc)
            try:
                stmt = select(Dataset).where(Dataset.id == dataset_id)
                ds_result = await session.execute(stmt)
                dataset = ds_result.scalar_one_or_none()
                if dataset:
                    dataset.status = "error"
                    dataset.error_message = str(exc)[:1000]
                    await session.commit()
            except Exception as inner:
                logger.error("Failed to update error status: %s", inner)
        finally:
            # Clean up temp files
            try:
                tmp_path.unlink(missing_ok=True)
                os.rmdir(tmp_dir)
            except OSError:
                pass


@router.get(
    "",
    response_model=DatasetListResponse,
    summary="List all datasets with pagination",
)
async def list_datasets(
    skip: int = Query(default=0, ge=0, description="Number of records to skip"),
    limit: int = Query(default=20, ge=1, le=100, description="Max records to return"),
    db: AsyncSession = Depends(get_db),
) -> DatasetListResponse:
    """Return a paginated list of all datasets."""
    count_stmt = select(func.count(Dataset.id))
    total_result = await db.execute(count_stmt)
    total = total_result.scalar_one()

    stmt = (
        select(Dataset)
        .order_by(Dataset.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(stmt)
    datasets = result.scalars().all()

    return DatasetListResponse(
        datasets=[DatasetResponse.model_validate(d) for d in datasets],
        total=total,
    )


@router.get(
    "/{dataset_id}",
    response_model=DatasetResponse,
    summary="Get a single dataset by ID",
)
async def get_dataset(
    dataset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
) -> DatasetResponse:
    """Retrieve full metadata for a single dataset."""
    stmt = select(Dataset).where(Dataset.id == dataset_id)
    result = await db.execute(stmt)
    dataset = result.scalar_one_or_none()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail=f"Dataset '{dataset_id}' not found.",
        )

    return DatasetResponse.model_validate(dataset)


@router.delete(
    "/{dataset_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a dataset and its underlying table",
)
async def delete_dataset(
    dataset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    table_manager: TableManager = Depends(get_table_manager),
) -> dict:
    """
    Delete a dataset record and drop the dynamic user_data table.
    Associated query history rows will have their dataset_id set to NULL.
    """
    stmt = select(Dataset).where(Dataset.id == dataset_id)
    result = await db.execute(stmt)
    dataset = result.scalar_one_or_none()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail=f"Dataset '{dataset_id}' not found.",
        )

    table_name = dataset.table_name

    # Drop the underlying data table first
    await table_manager.drop_table(table_name)

    # Delete the metadata record
    await db.delete(dataset)
    await db.commit()

    logger.info("Deleted dataset %s (table: %s)", dataset_id, table_name)
    return {"message": f"Dataset '{dataset_id}' deleted successfully."}


@router.get(
    "/{dataset_id}/preview",
    response_model=DatasetPreview,
    summary="Preview the first 50 rows of a dataset",
)
async def preview_dataset(
    dataset_id: uuid.UUID,
    limit: int = Query(default=50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    table_manager: TableManager = Depends(get_table_manager),
) -> DatasetPreview:
    """Return the first *limit* rows and column names of a dataset."""
    stmt = select(Dataset).where(Dataset.id == dataset_id)
    result = await db.execute(stmt)
    dataset = result.scalar_one_or_none()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail=f"Dataset '{dataset_id}' not found.",
        )

    if dataset.status != "ready":
        raise HTTPException(
            status_code=409,
            detail=f"Dataset is not ready yet (status: {dataset.status}). "
                   "Please wait for processing to complete.",
        )

    try:
        columns, rows = await table_manager.get_table_preview(
            dataset.table_name, limit=limit
        )
    except Exception as exc:
        logger.error("Preview failed for dataset %s: %s", dataset_id, exc)
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve dataset preview.",
        )

    return DatasetPreview(
        columns=columns,
        rows=rows,
        total_rows=dataset.row_count,
    )
