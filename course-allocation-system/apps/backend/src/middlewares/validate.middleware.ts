import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

type ValidateTarget = "body" | "params" | "query";

export const validate =
  (schema: ZodSchema, target: ValidateTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    req[target] = result.data;
    next();
  };
