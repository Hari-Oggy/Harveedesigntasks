import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  role: "ADMIN" | "STUDENT";
  studentId?: string;
}

// Extend Request so TS knows about our custom props
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      studentId?: string;
    }
  }
}

function extractToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

/** Requires a valid JWT — works for both ADMIN and STUDENT */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ success: false, message: "Authentication required" });
    return;
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = payload;
    if (payload.studentId) req.studentId = payload.studentId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

/** Only allows ADMIN role */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "ADMIN") {
      res.status(403).json({ success: false, message: "Admin access required" });
      return;
    }
    next();
  });
}

/** Only allows STUDENT role */
export function requireStudent(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "STUDENT") {
      res.status(403).json({ success: false, message: "Student access required" });
      return;
    }
    next();
  });
}
