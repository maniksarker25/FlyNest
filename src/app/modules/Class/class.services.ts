import { Class } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const craeteClassIntoDb = async (payload: Class) => {
  const result = await prisma.class.create({
    data: payload,
  });

  return result;
};

const enrollAStudentToClass = async (classId: string, studentId: string) => {
  const [classData, studentData] = await Promise.all([
    prisma.class.findUnique({
      where: { id: classId },
    }),
    prisma.student.findUnique({
      where: { id: studentId },
    }),
  ]);

  if (!classData) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  if (!studentData) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  const result = await prisma.student.update({
    where: { id: studentId },
    data: {
      classId: classId,
    },
  });

  return result;
};

export const ClassService = {
  craeteClassIntoDb,
  enrollAStudentToClass,
};

export default ClassService;
