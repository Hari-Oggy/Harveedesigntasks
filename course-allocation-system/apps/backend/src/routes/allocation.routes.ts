import { Router } from "express";
import { AllocationController } from "../controllers/allocation.controller";
import { allocationRateLimiter } from "../middlewares/rate-limit.middleware";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/allocations/run — trigger the allocation engine (admin only + rate limited)
router.post("/run", requireAdmin, allocationRateLimiter, AllocationController.trigger);

// DELETE /api/allocations/reset — wipe all allocations (admin only — critical operation)
router.delete("/reset", requireAdmin, AllocationController.reset);

// GET /api/allocations/dashboard — full dashboard stats (admin only)
router.get("/dashboard", requireAdmin, AllocationController.getDashboardStats);

// GET /api/allocations/export — export all allocations as CSV (admin only)
router.get("/export", requireAdmin, AllocationController.exportCsv);

// GET /api/allocations — get all allocations (admin only)
router.get("/", requireAdmin, AllocationController.getResults);

export default router;
