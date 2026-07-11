import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  marks: z
    .number({ invalid_type_error: "Marks must be a number" })
    .min(0, "Marks cannot be negative")
    .max(100, "Marks cannot exceed 100"),
  category: z.enum(["GENERAL", "OBC", "SC", "ST"], {
    errorMap: () => ({ message: "Category must be one of GENERAL, OBC, SC, ST" }),
  }),
  // preferences: array of course IDs in priority order [pref1CourseId, pref2CourseId, pref3CourseId]
  preferences: z
    .array(z.string().uuid("Each preference must be a valid course ID"))
    .min(1, "At least 1 course preference is required")
    .max(3, "Maximum 3 course preferences allowed"),
  // Login credentials assigned by admin
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateStudentSchema = createStudentSchema.partial().omit({
  preferences: true,
});

export const studentIdParamSchema = z.object({
  id: z.string().uuid("Invalid student ID"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
