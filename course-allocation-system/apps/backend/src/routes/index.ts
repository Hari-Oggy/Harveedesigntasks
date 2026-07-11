import { Router } from "express";
import studentRoutes from "./student.routes";
import courseRoutes from "./course.routes";
import allocationRoutes from "./allocation.routes";
import chatRoutes from "./chat.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);
router.use("/allocations", allocationRoutes);
router.use("/chat", chatRoutes);

export default router;
