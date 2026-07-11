import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  // ── AI Provider Keys ────────────────────────────────────────────────────────
  // At least one AI provider key must be set for the chat endpoint to work.
  // You don't need all three — just whichever providers you want to use.

  // GROQ — https://console.groq.com/keys
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().optional(), // default: llama-3.3-70b-versatile

  // NVIDIA NIM — https://build.nvidia.com/
  NVIDIA_NIM_API_KEY: z.string().optional(),
  NVIDIA_MODEL: z.string().optional(), // default: meta/llama-3.3-70b-instruct

  // OpenRouter (Free) — https://openrouter.ai/keys
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().optional(), // default: meta-llama/llama-3.3-70b-instruct:free

  // ── Auth ────────────────────────────────────────────────────────────────────
  JWT_SECRET: z.string().default("changeme-super-secret-jwt-key-32chars!"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
