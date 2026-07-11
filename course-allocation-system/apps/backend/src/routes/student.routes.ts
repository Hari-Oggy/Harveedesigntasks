import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { validate } from "../middlewares/validate.middleware";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";
import { createStudentSchema, studentIdParamSchema, updateStudentSchema } from "../schemas/student.schema";

const router = Router();

// GET /api/students        — both ADMIN and STUDENT can read (for the student portal to get course info)
router.get("/", requireAdmin, StudentController.getAll);

// GET /api/students/stats  — admin only
router.get("/stats", requireAdmin, StudentController.getStats);

// GET /api/students/:id    — admin only
router.get("/:id", requireAdmin, validate(studentIdParamSchema, "params"), StudentController.getById);

// POST /api/students       — admin only: creates a new student record
router.post("/", requireAdmin, validate(createStudentSchema), StudentController.create);

// PATCH /api/students/:id  — admin only
router.patch(
  "/:id",
  requireAdmin,
  validate(studentIdParamSchema, "params"),
  validate(updateStudentSchema),
  StudentController.update,
);

// DELETE /api/students/:id — admin only
router.delete("/:id", requireAdmin, validate(studentIdParamSchema, "params"), StudentController.delete);

export default router;
