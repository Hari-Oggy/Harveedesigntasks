.PHONY: help dev-backend dev-frontend dev install-backend install-frontend \
        test-backend lint format db-start db-stop db-reset clean

# ─────────────────────────────────────────
# Help
# ─────────────────────────────────────────
help:
	@echo ""
	@echo "  AI SQL Assistant — Makefile Commands"
	@echo "  ───────────────────────────────────────────"
	@echo "  Setup:"
	@echo "    make install       Install all dependencies"
	@echo ""
	@echo "  Development:"
	@echo "    make dev           Start both backend + frontend (requires tmux)"
	@echo "    make dev-backend   Start backend only (http://localhost:8000)"
	@echo "    make dev-frontend  Start frontend only (http://localhost:5173)"
	@echo ""
	@echo "  Database:"
	@echo "    make db-start      Start PostgreSQL via Docker"
	@echo "    make db-stop       Stop PostgreSQL container"
	@echo "    make db-reset      Drop and recreate database (WARNING: deletes data)"
	@echo ""
	@echo "  Quality:"
	@echo "    make test          Run all tests"
	@echo "    make lint          Run ruff linter"
	@echo "    make format        Run ruff formatter"
	@echo ""
	@echo "  Docker:"
	@echo "    make docker-up     Start full stack with docker-compose"
	@echo "    make docker-down   Stop all docker services"
	@echo ""

# ─────────────────────────────────────────
# Installation
# ─────────────────────────────────────────
install: install-backend install-frontend

install-backend:
	@echo "📦 Installing backend dependencies..."
	cd backend && uv sync

install-frontend:
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install

# ─────────────────────────────────────────
# Development
# ─────────────────────────────────────────
dev-backend:
	@echo "🚀 Starting backend on http://localhost:8000"
	@echo "📖 API Docs: http://localhost:8000/docs"
	cd backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	@echo "🚀 Starting frontend on http://localhost:5173"
	cd frontend && npm run dev

# ─────────────────────────────────────────
# Database
# ─────────────────────────────────────────
db-start:
	@echo "🐘 Starting PostgreSQL..."
	docker run -d --name aisql-postgres \
		-e POSTGRES_DB=aisql \
		-e POSTGRES_USER=aisql_app \
		-e POSTGRES_PASSWORD=dev_password \
		-p 5432:5432 \
		-v aisql-pgdata:/var/lib/postgresql/data \
		-v $$(pwd)/backend/scripts/init_db.sql:/docker-entrypoint-initdb.d/01-init.sql \
		postgres:16-alpine
	@sleep 3
	@echo "✅ PostgreSQL ready at localhost:5432"

db-stop:
	docker stop aisql-postgres && docker rm aisql-postgres

db-reset:
	@echo "⚠️  This will DELETE all data!"
	docker stop aisql-postgres || true
	docker rm aisql-postgres || true
	docker volume rm aisql-pgdata || true
	$(MAKE) db-start

# ─────────────────────────────────────────
# Testing & Quality
# ─────────────────────────────────────────
test:
	cd backend && PYTHONPATH=. uv run pytest tests/ -v --tb=short

lint:
	cd backend && uv run ruff check app/ tests/

format:
	cd backend && uv run ruff format app/ tests/

# ─────────────────────────────────────────
# Docker
# ─────────────────────────────────────────
docker-up:
	docker compose up --build -d
	@echo "✅ Stack started!"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:8000"
	@echo "   API Docs: http://localhost:8000/docs"

docker-down:
	docker compose down

# ─────────────────────────────────────────
# Cleanup
# ─────────────────────────────────────────
clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .ruff_cache -exec rm -rf {} + 2>/dev/null || true
	cd frontend && rm -rf dist node_modules/.cache 2>/dev/null || true
	@echo "✅ Cleaned up cache files"
