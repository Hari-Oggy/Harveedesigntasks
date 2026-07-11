import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { validate } from "../middlewares/validate.middleware";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";
import { createCourseSchema, courseIdParamSchema, updateCourseSchema } from "../schemas/course.schema";

const router = Router();

// GET /api/courses         — public (students need to see courses to sign up)
router.get("/", CourseController.getAll);

// GET /api/courses/:id     — any authenticated user
router.get("/:id", requireAuth, validate(courseIdParamSchema, "params"), CourseController.getById);

// GET /api/courses/:id/seats — any authenticated user
router.get("/:id/seats", requireAuth, validate(courseIdParamSchema, "params"), CourseController.getAvailableSeats);

// POST /api/courses        — admin only
router.post("/", requireAdmin, validate(createCourseSchema), CourseController.create);

// PATCH /api/courses/:id   — admin only
router.patch(
  "/:id",
  requireAdmin,
  validate(courseIdParamSchema, "params"),
  validate(updateCourseSchema),
  CourseController.update,
);

// DELETE /api/courses/:id  — admin only
router.delete("/:id", requireAdmin, validate(courseIdParamSchema, "params"), CourseController.delete);

export default router;
