import type { Request, Response, NextFunction } from "express";
import { AIService } from "../services/ai.service";
import type { AIProvider } from "../lib/ai-providers";

export const AIController = {
  chat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message, provider, sessionId } = req.body as {
        message: string;
        provider: AIProvider;
        sessionId?: string;
      };

      const result = await AIService.chat(message, provider, sessionId);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  getHistory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit as string) : 20;
      const history = await AIService.getHistory(limit);
      res.json({ success: true, data: history });
    } catch (err) {
      next(err);
    }
  },

  deleteSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AIService.deleteSession(req.params.id!);
      res.json({ success: true, message: "Session deleted" });
    } catch (err) {
      next(err);
    }
  },
};
