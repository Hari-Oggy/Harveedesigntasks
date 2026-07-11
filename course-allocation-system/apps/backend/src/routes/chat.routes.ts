import { Router } from "express";
import { AIController } from "../controllers/ai.controller";
import { validate } from "../middlewares/validate.middleware";
import { chatQuerySchema } from "../schemas/chat.schema";
import { requireAdmin } from "../middlewares/auth.middleware";
import rateLimit from "express-rate-limit";

const router = Router();

// Strict rate limit on chat — prevent AI API cost abuse
const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: "Too many chat requests. Please wait a moment before asking again.",
  },
});

// POST /api/chat — send a message to the AI assistant (admin only + rate limited)
router.post(
  "/",
  requireAdmin,
  chatRateLimiter,
  validate(chatQuerySchema),
  AIController.chat,
);

// GET /api/chat/history — retrieve past AI sessions (admin only)
router.get("/history", requireAdmin, AIController.getHistory);

// DELETE /api/chat/:id — delete a specific AI session (admin only)
router.delete("/:id", requireAdmin, AIController.deleteSession);

export default router;
