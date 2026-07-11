import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthService } from "../services/auth.service";
import type { JwtPayload } from "../middlewares/auth.middleware";

export const AuthController = {
  adminLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as { email: string; password: string };
      if (!email || !password) {
        res.status(400).json({ success: false, message: "Email and password are required" });
        return;
      }
      const result = await AuthService.loginAdmin(email.trim().toLowerCase(), password);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },

  studentLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as { email: string; password: string };
      if (!email || !password) {
        res.status(400).json({ success: false, message: "Email and password are required" });
        return;
      }
      const result = await AuthService.loginStudent(email.trim().toLowerCase(), password);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },

  studentSignup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { StudentService } = await import("../services/student.service");
      const student = await StudentService.create(req.body);
      // Automatically log them in after signup
      const result = await AuthService.loginStudent(req.body.email.trim().toLowerCase(), req.body.password);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },

  studentProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId = (req as Request & { studentId?: string }).studentId;
      if (!studentId) {
        res.status(403).json({ success: false, message: "Access denied" });
        return;
      }
      const student = await AuthService.getStudentProfile(studentId);
      res.json({ success: true, data: student });
    } catch (err) { next(err); }
  },

  /**
   * GET /api/auth/verify
   * Validates a JWT and returns the decoded role + userId.
   * Used by frontend guards to confirm token validity on page load.
   */
  verifyToken: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "No token provided" });
        return;
      }
      const token = authHeader.slice(7);
      const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      res.json({
        success: true,
        data: {
          valid: true,
          userId: payload.userId,
          role: payload.role,
          studentId: payload.studentId ?? null,
        },
      });
    } catch {
      res.status(401).json({ success: false, message: "Invalid or expired token", data: { valid: false } });
    }
  },
};
