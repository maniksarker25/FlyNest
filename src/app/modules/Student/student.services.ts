import { Prisma, Student } from "@prisma/client";
import prisma from "../../utils/prisma";
import { studentSearchAbleFields } from "./student.constant";

const createStudent = async (payload: Student) => {
  const result = await prisma.student.create({
    data: payload,
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
  });
  return result;
};

const StudentService = {
  createStudent,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};

export default StudentService;
