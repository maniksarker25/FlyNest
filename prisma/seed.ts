import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create multiple classes at once using createMany
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

  console.log("Admin created:", admin);
  console.log("Classes created:", classes);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
