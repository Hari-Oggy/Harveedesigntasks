import { z } from "zod";

export const chatQuerySchema = z.object({
  message: z
    .string()
    .min(3, "Message must be at least 3 characters")
    .max(500, "Message cannot exceed 500 characters")
    .trim(),
  provider: z
    .enum(["groq", "nvidia", "openrouter"])
    .default("groq")
    .describe("Which AI provider to use"),
  sessionId: z
    .string()
    .uuid("Invalid session ID")
    .optional()
    .describe("Optional session ID to continue a conversation"),
});

export type ChatQueryInput = z.infer<typeof chatQuerySchema>;
