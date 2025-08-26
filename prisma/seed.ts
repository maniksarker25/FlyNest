import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function seed() {
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const classes = await prisma.class.createMany({
    data: [
      {
        name: "Math 101",
        section: "A",
      },
      {
        name: "Physics 101",
        section: "B",
      },
      {
        name: "Chemistry 101",
        section: "C",
      },
      {
        name: "Biology 101",
        section: "D",
      },
    ],
  });

  const teacherOnePassword = await bcrypt.hash("teacher1", 10);
  const teachertwoPassword = await bcrypt.hash("teacher2", 10);
  const teachers = await prisma.$transaction(async (prisma) => {
    const user1 = await prisma.user.create({
      data: {
        name: "John Doe",
        email: ".com",
        password: teacherOnePassword,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: teachertwoPassword,
      },
    });

    const teacher1 = await prisma.teacher.create({
      data: {
        name: "John Doe",
        subject: "Math",
        userId: user1.id,
      },
    });

    const teacher2 = await prisma.teacher.create({
      data: {
        name: "Jane Smith",
        subject: "Physics",
        userId: user2.id,
      },
    });

    return [teacher1, teacher2];
  });

  console.log("Admin created:", admin);
  console.log("Classes created:", classes);
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
