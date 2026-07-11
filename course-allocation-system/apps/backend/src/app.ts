import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { globalRateLimiter } from "./middlewares/rate-limit.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import apiRoutes from "./routes/index";

export function createApp() {
  const app = express();

  // ─── Security Middlewares ──────────────────────────────────────────────────
  app.use(helmet()); // Sets secure HTTP headers
  app.use(
    cors({
      // Allow any localhost port in dev, or use CORS_ORIGIN env var in prod
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow server-to-server / curl
        if (
          origin.startsWith("http://localhost") ||
          origin.startsWith("http://127.0.0.1") ||
          origin === env.CORS_ORIGIN
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );
  app.use(globalRateLimiter);

  // ─── Body Parsing ─────────────────────────────────────────────────────────
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  // ─── Health Check ─────────────────────────────────────────────────────────
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ─── API Routes ───────────────────────────────────────────────────────────
  app.use("/api", apiRoutes);

  // ─── 404 Handler ──────────────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
  });

  // ─── Global Error Handler ─────────────────────────────────────────────────
  app.use(errorMiddleware);

  return app;
}
