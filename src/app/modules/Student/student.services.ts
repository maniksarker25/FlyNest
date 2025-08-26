import { Prisma, Student } from "@prisma/client";
import prisma from "../../utils/prisma";
import { studentSearchAbleFields } from "./student.constant";
import AppError from "../../error/appError";
import bcrypt from "bcrypt";

const createStudent = async (payload: Student & { password: string }) => {
  const isExits = await prisma.student.findUnique({
    where: { email: payload.email },
  });
  if (isExits) {
    throw new AppError(400, "Student already exits with this email");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
      },
    });
    const studentData = {
      userId: createUser?.id,
      name: payload.name,
      age: Number(payload.age),
      email: payload.email,
    };
    await transactionClient.student.create({
      data: studentData,
    });
    return studentData;
  });
  return result;
};

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const andConditions: Prisma.StudentWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: studentSearchAbleFields.map((field) => ({
        [field]: {
          contains: query.searchTerm as string,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.StudentWhereInput = { AND: andConditions };
  const orderByConditions: Prisma.StudentOrderByWithRelationInput =
    query.sortBy && query.sortOrder
      ? { [query.sortBy as string]: query.sortOrder === "asc" ? "asc" : "desc" }
      : { createdAt: "desc" };
  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: orderByConditions,
      include: {
        class: true,
      },
    }),
    prisma.student.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: students,
  };
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await prisma.student.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      class: true,
    },
  });
  return result;
};

const StudentService = {
  createStudent,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};

export default StudentService;
