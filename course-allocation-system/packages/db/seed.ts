import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🧹 Cleaning up old data...");
  await prisma.user.deleteMany();
  await prisma.allocation.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();

  // ── Create Admin User ──────────────────────────────────────────────────────
  console.log("🔐 Creating admin user...");
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@university.edu",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("  ✅ Admin: admin@university.edu / admin123");

  // ── Courses ────────────────────────────────────────────────────────────────
  console.log("📚 Seeding courses...");
  const course1 = await prisma.course.create({
    data: {
      name: "Introduction to Artificial Intelligence",
      totalSeats: 10,
      generalSeats: 5,
      obcSeats: 3,
      scSeats: 1,
      stSeats: 1,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "Data Structures and Algorithms",
      totalSeats: 5,
      generalSeats: 2,
      obcSeats: 2,
      scSeats: 1,
      stSeats: 0,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: "Database Management Systems",
      totalSeats: 20,
      generalSeats: 10,
      obcSeats: 5,
      scSeats: 3,
      stSeats: 2,
    },
  });

  // ── Students + their login credentials ────────────────────────────────────
  console.log("🎓 Seeding students and preferences...");

  const studentsData = [
    { name: "Alice Smith",     marks: 98.5, category: "GENERAL" as const, prefs: [course1.id, course2.id],             email: "alice@student.edu",   password: "alice123" },
    { name: "Bob Johnson",     marks: 95.0, category: "OBC"     as const, prefs: [course1.id, course3.id],             email: "bob@student.edu",     password: "bob123" },
    { name: "Charlie Brown",   marks: 89.0, category: "SC"      as const, prefs: [course2.id, course1.id, course3.id], email: "charlie@student.edu", password: "charlie123" },
    { name: "Diana Prince",    marks: 99.0, category: "GENERAL" as const, prefs: [course2.id],                         email: "diana@student.edu",   password: "diana123" },
    { name: "Ethan Hunt",      marks: 91.5, category: "ST"      as const, prefs: [course1.id, course2.id],             email: "ethan@student.edu",   password: "ethan123" },
    { name: "Fiona Gallagher", marks: 88.0, category: "OBC"     as const, prefs: [course2.id, course3.id],             email: "fiona@student.edu",   password: "fiona123" },
    { name: "George Costanza", marks: 75.0, category: "GENERAL" as const, prefs: [course1.id],                         email: "george@student.edu",  password: "george123" },
    { name: "Hannah Montana",  marks: 92.0, category: "SC"      as const, prefs: [course3.id, course2.id],             email: "hannah@student.edu",  password: "hannah123" },
    { name: "Ian Malcolm",     marks: 85.5, category: "GENERAL" as const, prefs: [course2.id, course1.id],             email: "ian@student.edu",     password: "ian123" },
    { name: "Jane Doe",        marks: 97.0, category: "OBC"     as const, prefs: [course1.id],                         email: "jane@student.edu",    password: "jane123" },
  ];

  for (const s of studentsData) {
    const student = await prisma.student.create({
      data: {
        name: s.name,
        marks: s.marks,
        category: s.category,
        preferences: {
          create: s.prefs.map((courseId, index) => ({
            courseId,
            priority: index + 1,
          })),
        },
      },
    });

    const passwordHash = await bcrypt.hash(s.password, 12);
    await prisma.user.create({
      data: {
        email: s.email,
        passwordHash,
        role: "STUDENT",
        studentId: student.id,
      },
    });
    console.log(`  ✅ ${s.name}: ${s.email} / ${s.password}`);
  }

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Login Credentials Summary:");
  console.log("  Admin → admin@university.edu / admin123");
  console.log("  Students → <name>@student.edu / <firstname>123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
