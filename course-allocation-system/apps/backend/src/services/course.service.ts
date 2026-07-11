import { prisma } from "../lib/db";
import { AppError } from "../middlewares/error.middleware";
import type { CreateCourseInput, UpdateCourseInput } from "../schemas/course.schema";

export const CourseService = {
  async getAll() {
    const courses = await prisma.course.findMany({
      include: { _count: { select: { allocations: true, preferences: true } } },
      orderBy: { name: "asc" },
    });

    return courses.map((c) => ({
      ...c,
      allocatedCount: c._count.allocations,
      availableSeats: c.totalSeats - c._count.allocations,
    }));
  },

  async getById(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        allocations: {
          include: { student: true },
          orderBy: { allocationDate: "desc" },
        },
        _count: { select: { allocations: true } },
      },
    });
    if (!course) throw new AppError(404, `Course with ID ${id} not found`);

    return {
      ...course,
      allocatedCount: course._count.allocations,
      availableSeats: course.totalSeats - course._count.allocations,
    };
  },

  async create(data: CreateCourseInput) {
    return prisma.course.create({ data });
  },

  async update(id: string, data: UpdateCourseInput) {
    await CourseService.getById(id); // throws 404 if not found
    return prisma.course.update({ where: { id }, data });
  },

  async delete(id: string) {
    await CourseService.getById(id);
    return prisma.course.delete({ where: { id } });
  },

  async getAvailableSeats(courseId: string) {
    const course = await CourseService.getById(courseId);

    const categoryCount = await prisma.allocation.groupBy({
      by: ["allocatedCategory"],
      where: { courseId },
      _count: { id: true },
    });

    const used: Record<string, number> = {};
    for (const row of categoryCount) {
      used[row.allocatedCategory] = row._count.id;
    }

    return {
      courseId,
      courseName: course.name,
      totalSeats: course.totalSeats,
      generalSeats: { total: course.generalSeats, used: used["GENERAL"] ?? 0, available: course.generalSeats - (used["GENERAL"] ?? 0) },
      obcSeats: { total: course.obcSeats, used: used["OBC"] ?? 0, available: course.obcSeats - (used["OBC"] ?? 0) },
      scSeats: { total: course.scSeats, used: used["SC"] ?? 0, available: course.scSeats - (used["SC"] ?? 0) },
      stSeats: { total: course.stSeats, used: used["ST"] ?? 0, available: course.stSeats - (used["ST"] ?? 0) },
    };
  },
};
