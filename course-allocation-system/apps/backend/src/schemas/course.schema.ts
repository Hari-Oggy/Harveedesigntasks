import { z } from "zod";

const courseBaseSchema = z.object({
  name: z.string().min(2, "Course name must be at least 2 characters").trim(),
  totalSeats: z.number().int().min(1, "Total seats must be at least 1"),
  generalSeats: z.number().int().min(0),
  obcSeats: z.number().int().min(0),
  scSeats: z.number().int().min(0),
  stSeats: z.number().int().min(0),
});

export const createCourseSchema = courseBaseSchema.refine(
  (data) =>
    data.generalSeats + data.obcSeats + data.scSeats + data.stSeats ===
    data.totalSeats,
  {
    message:
      "Sum of generalSeats + obcSeats + scSeats + stSeats must equal totalSeats",
    path: ["totalSeats"],
  }
);

// .partial() on the base (without the refine) so Zod 4 doesn't throw
export const updateCourseSchema = courseBaseSchema.partial();

export const courseIdParamSchema = z.object({
  id: z.string().uuid("Invalid course ID"),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;

