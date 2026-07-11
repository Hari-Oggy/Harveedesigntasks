import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { AppError } from "../middlewares/error.middleware";
import type { CreateStudentInput, UpdateStudentInput } from "../schemas/student.schema";

export const StudentService = {
  async getAll() {
    return prisma.student.findMany({
      include: {
        preferences: { include: { course: true }, orderBy: { priority: "asc" } },
        allocation: { include: { course: true } },
      },
      orderBy: [{ marks: "desc" }, { applicationDate: "asc" }],
    });
  },

  async getById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        preferences: { include: { course: true }, orderBy: { priority: "asc" } },
        allocation: { include: { course: true } },
      },
    });
    if (!student) throw new AppError(404, `Student with ID ${id} not found`);
    return student;
  },

  async create(data: CreateStudentInput) {
    const { preferences, email, password, ...studentData } = data;

    // Check if email already taken
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new AppError(409, "A user with that email already exists");

    // Validate all course IDs exist
    const courses = await prisma.course.findMany({
      where: { id: { in: preferences } },
      select: { id: true },
    });
    if (courses.length !== preferences.length) {
      throw new AppError(400, "One or more preference course IDs are invalid");
    }

    // Ensure no duplicate course IDs in preferences
    const uniquePrefs = new Set(preferences);
    if (uniquePrefs.size !== preferences.length) {
      throw new AppError(400, "Duplicate course IDs found in preferences");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create student + preferences + user account in one transaction
    const student = await prisma.student.create({
      data: {
        ...studentData,
        preferences: {
          create: preferences.map((courseId, index) => ({
            courseId,
            priority: index + 1, // 1-indexed
          })),
        },
      },
      include: {
        preferences: { include: { course: true }, orderBy: { priority: "asc" } },
      },
    });

    // Create the login user record linked to this student
    await prisma.user.create({
      data: { email, passwordHash, role: "STUDENT", studentId: student.id },
    });

    return { ...student, email };
  },

  async update(id: string, data: UpdateStudentInput) {
    await StudentService.getById(id); // throws 404 if not found
    return prisma.student.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    await StudentService.getById(id); // throws 404 if not found
    return prisma.student.delete({ where: { id } });
  },

  async getStats() {
    const [total, allocated, unallocated, pending] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({ where: { status: "ALLOCATED" } }),
      prisma.student.count({ where: { status: "UNALLOCATED" } }),
      prisma.student.count({ where: { status: "PENDING" } }),
    ]);

    const categoryBreakdown = await prisma.student.groupBy({
      by: ["category"],
      _count: { id: true },
    });

    return { total, allocated, unallocated, pending, categoryBreakdown };
  },
};
