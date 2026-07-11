import { z } from "zod";

export const triggerAllocationSchema = z.object({
  courseId: z
    .string()
    .uuid("Invalid course ID")
    .optional()
    .describe("If provided, run allocation only for this course"),
});

export type TriggerAllocationInput = z.infer<typeof triggerAllocationSchema>;
