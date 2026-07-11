import type { Request, Response, NextFunction } from "express";
import { AllocationService } from "../services/allocation.service";

export const AllocationController = {
  trigger: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AllocationService.runAllocation();
      res.json({ success: true, message: "Allocation completed", data: result });
    } catch (err) { next(err); }
  },

  getResults: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await AllocationService.getResults();
      res.json({ success: true, data: results });
    } catch (err) { next(err); }
  },

  getDashboardStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await AllocationService.getDashboardStats();
      res.json({ success: true, data: stats });
    } catch (err) { next(err); }
  },

  reset: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AllocationService.reset();
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  },

  exportCsv: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rows = await AllocationService.getResults();
      const header = "Student ID,Student Name,Marks,Category,Allocated Course,Preference No.,Allocated Under,Date";
      const lines = rows.map((r) => [
        r.studentId,
        `"${r.student.name.replace(/"/g, '""')}"`,
        r.student.marks,
        r.student.category,
        `"${r.course.name.replace(/"/g, '""')}"`,
        r.preference?.priority ?? "",
        r.allocatedCategory,
        new Date(r.allocationDate).toISOString().split("T")[0],
      ].join(","));

      const csv = [header, ...lines].join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="allocations_${Date.now()}.csv"`);
      res.send(csv);
    } catch (err) { next(err); }
  },
};
