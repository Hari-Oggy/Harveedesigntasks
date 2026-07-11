import type { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/student.service";

export const StudentController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await StudentService.getAll();
      res.json({ success: true, data: students });
    } catch (err) { next(err); }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await StudentService.getById(req.params.id!);
      res.json({ success: true, data: student });
    } catch (err) { next(err); }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await StudentService.create(req.body);
      res.status(201).json({ success: true, data: student });
    } catch (err) { next(err); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await StudentService.update(req.params.id!, req.body);
      res.json({ success: true, data: student });
    } catch (err) { next(err); }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await StudentService.delete(req.params.id!);
      res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) { next(err); }
  },

  getStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await StudentService.getStats();
      res.json({ success: true, data: stats });
    } catch (err) { next(err); }
  },
};
