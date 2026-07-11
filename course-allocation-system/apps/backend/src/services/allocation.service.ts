import { prisma } from "../lib/db";
import type { Category } from "../../../../packages/db/generated/client";

/**
 * CORE ALLOCATION ALGORITHM
 *
 * Rules:
 * 1. Sort students by marks DESC, applicationDate ASC (tie-breaker)
 * 2. For each student, try preferences in priority order (1, 2, 3)
 * 3. For each preference, try to allocate under the student's category first.
 *    If no reserved seat available, try a GENERAL seat.
 * 4. A student gets at most ONE allocation.
 * 5. Rejected preferences are marked REJECTED.
 * 6. Students who get no allocation are marked UNALLOCATED.
 */
export const AllocationService = {
  async runAllocation() {
    // 1. Fetch all PENDING students sorted by priority criteria
    const students = await prisma.student.findMany({
      where: { status: "PENDING" },
      include: {
        preferences: {
          orderBy: { priority: "asc" },
          include: { course: true },
        },
      },
      orderBy: [{ marks: "desc" }, { applicationDate: "asc" }],
    });

    // 2. Build a live in-memory seat counter to avoid repeated DB hits inside the loop
    const courses = await prisma.course.findMany();
    const existingAllocations = await prisma.allocation.groupBy({
      by: ["courseId", "allocatedCategory"],
      _count: { id: true },
    });

    // seat usage map: courseId -> { GENERAL: n, OBC: n, SC: n, ST: n }
    const seatUsage = new Map<string, Record<Category, number>>();
    for (const course of courses) {
      seatUsage.set(course.id, { GENERAL: 0, OBC: 0, SC: 0, ST: 0 });
    }
    for (const row of existingAllocations) {
      const entry = seatUsage.get(row.courseId);
      if (entry) entry[row.allocatedCategory as Category] = row._count.id;
    }

    // seat quota map: courseId -> { GENERAL: n, OBC: n, SC: n, ST: n }
    const seatQuota = new Map<string, Record<Category, number>>();
    for (const course of courses) {
      seatQuota.set(course.id, {
        GENERAL: course.generalSeats,
        OBC: course.obcSeats,
        SC: course.scSeats,
        ST: course.stSeats,
      });
    }

    const results = {
      allocated: 0,
      unallocated: 0,
      details: [] as Array<{ studentId: string; name: string; result: string }>,
    };

    // 3. Process each student
    for (const student of students) {
      let gotSeat = false;

      for (const pref of student.preferences) {
        const usage = seatUsage.get(pref.courseId);
        const quota = seatQuota.get(pref.courseId);
        if (!usage || !quota) continue;

        // Determine which quota to try — student's own category first, then GENERAL
        const categoriesToTry: Category[] =
          student.category === "GENERAL"
            ? ["GENERAL"]
            : [student.category, "GENERAL"];

        let allocatedUnder: Category | null = null;
        for (const cat of categoriesToTry) {
          if (usage[cat] < quota[cat]) {
            allocatedUnder = cat;
            break;
          }
        }

        if (allocatedUnder !== null) {
          // Allocate the student
          await prisma.$transaction([
            prisma.allocation.create({
              data: {
                studentId: student.id,
                courseId: pref.courseId,
                preferenceId: pref.id,
                allocatedCategory: allocatedUnder,
              },
            }),
            prisma.preference.update({
              where: { id: pref.id },
              data: { status: "ALLOCATED" },
            }),
            prisma.student.update({
              where: { id: student.id },
              data: { status: "ALLOCATED" },
            }),
          ]);

          // Update in-memory counter
          usage[allocatedUnder]++;
          gotSeat = true;

          results.allocated++;
          results.details.push({
            studentId: student.id,
            name: student.name,
            result: `Allocated to "${pref.course.name}" under ${allocatedUnder} quota (priority ${pref.priority})`,
          });
          break; // Don't try further preferences
        } else {
          // This preference is rejected
          await prisma.preference.update({
            where: { id: pref.id },
            data: { status: "REJECTED" },
          });
        }
      }

      if (!gotSeat) {
        // Mark student as fully unallocated
        await prisma.student.update({
          where: { id: student.id },
          data: { status: "UNALLOCATED" },
        });
        results.unallocated++;
        results.details.push({
          studentId: student.id,
          name: student.name,
          result: "No seats available in any preferred course",
        });
      }
    }

    return results;
  },

  async getResults() {
    return prisma.allocation.findMany({
      include: {
        student: { select: { id: true, name: true, marks: true, category: true } },
        course: { select: { id: true, name: true } },
        preference: { select: { priority: true } },
      },
      orderBy: { allocationDate: "desc" },
    });
  },

  async getDashboardStats() {
    const [
      totalStudents,
      allocatedStudents,
      unallocatedStudents,
      allCourses,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({ where: { status: "ALLOCATED" } }),
      prisma.student.count({ where: { status: "UNALLOCATED" } }),
      prisma.course.findMany({
        include: { _count: { select: { allocations: true } } },
      }),
    ]);

    // Category-wise allocation
    const categoryAllocation = await prisma.allocation.groupBy({
      by: ["allocatedCategory"],
      _count: { id: true },
    });

    // Rejections per course for "rejection rate"
    const rejectionsByCourse = await prisma.preference.groupBy({
      by: ["courseId"],
      where: { status: "REJECTED" },
      _count: { id: true },
    });

    const preferencesByCourse = await prisma.preference.groupBy({
      by: ["courseId"],
      _count: { id: true },
    });

    const courseNames = await prisma.course.findMany({ select: { id: true, name: true } });
    const nameMap = new Map(courseNames.map((c) => [c.id, c.name]));

    const rejectionRates = rejectionsByCourse.map((r) => {
      const total = preferencesByCourse.find((p) => p.courseId === r.courseId)?._count.id ?? 0;
      return {
        courseId: r.courseId,
        courseName: nameMap.get(r.courseId) ?? "Unknown",
        rejections: r._count.id,
        totalPreferences: total,
        rejectionRate: total > 0 ? ((r._count.id / total) * 100).toFixed(1) + "%" : "0%",
      };
    });

    const courseStats = allCourses.map((c) => ({
      id: c.id,
      name: c.name,
      totalSeats: c.totalSeats,
      allocatedSeats: c._count.allocations,
      availableSeats: c.totalSeats - c._count.allocations,
    }));

    // Students who didn't get first preference
    const notFirstPreference = await prisma.allocation.count({
      where: { preference: { priority: { gt: 1 } } },
    });

    return {
      students: { total: totalStudents, allocated: allocatedStudents, unallocated: unallocatedStudents },
      courses: courseStats,
      categoryAllocation,
      rejectionRates,
      notFirstPreferenceCount: notFirstPreference,
    };
  },

  async reset() {
    // Wipe all allocations and reset statuses — useful for re-running
    await prisma.$transaction([
      prisma.allocation.deleteMany(),
      prisma.preference.updateMany({ data: { status: "PENDING" } }),
      prisma.student.updateMany({ data: { status: "PENDING" } }),
    ]);
    return { message: "All allocations reset. System is ready for re-run." };
  },
};
