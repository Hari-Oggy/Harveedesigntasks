import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { requireStudent } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createStudentSchema } from "../schemas/student.schema";

const router = Router();

// POST /api/auth/admin/login    — public
router.post("/admin/login", AuthController.adminLogin);

// POST /api/auth/student/login  — public
router.post("/student/login", AuthController.studentLogin);

// POST /api/auth/student/signup — public
router.post("/student/signup", validate(createStudentSchema), AuthController.studentSignup);

// GET /api/auth/student/profile — protected (student JWT required)
router.get("/student/profile", requireStudent, AuthController.studentProfile);

// GET /api/auth/verify          — public (validates any JWT, returns role)
// Used by frontend guards on page load to confirm token is still valid
router.get("/verify", AuthController.verifyToken);

export default router;
