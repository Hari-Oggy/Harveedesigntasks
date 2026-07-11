import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../middlewares/error.middleware";

export const AuthService = {
  async loginAdmin(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "ADMIN") {
      throw new AppError(401, "Invalid email or password");
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  },

  async loginStudent(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: {
          include: {
            preferences: {
              orderBy: { priority: "asc" },
              include: { course: true },
            },
            allocation: {
              include: { course: true, preference: { select: { priority: true } } },
            },
          },
        },
      },
    });
    if (!user || user.role !== "STUDENT" || !user.student) {
      throw new AppError(401, "Invalid email or password");
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, role: user.role, studentId: user.studentId },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
      student: user.student,
    };
  },

  async getStudentProfile(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        preferences: {
          orderBy: { priority: "asc" },
          include: { course: true },
        },
        allocation: {
          include: { course: true, preference: { select: { priority: true } } },
        },
      },
    });
    if (!student) throw new AppError(404, "Student not found");
    return student;
  },

  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  },
};
