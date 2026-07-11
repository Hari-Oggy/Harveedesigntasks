import type { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/course.service";

export const CourseController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseService.getAll();
      res.json({ success: true, data: courses });
    } catch (err) { next(err); }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await CourseService.getById(req.params.id!);
      res.json({ success: true, data: course });
    } catch (err) { next(err); }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await CourseService.create(req.body);
      res.status(201).json({ success: true, data: course });
    } catch (err) { next(err); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await CourseService.update(req.params.id!, req.body);
      res.json({ success: true, data: course });
    } catch (err) { next(err); }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CourseService.delete(req.params.id!);
      res.json({ success: true, message: "Course deleted successfully" });
    } catch (err) { next(err); }
  },

  getAvailableSeats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const seats = await CourseService.getAvailableSeats(req.params.id!);
      res.json({ success: true, data: seats });
    } catch (err) { next(err); }
  },
};
