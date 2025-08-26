import { Class } from "@prisma/client";
import prisma from "../../utils/prisma";

const craeteClassIntoDb = async (payload: Class) => {
  const result = await prisma.class.create({
    data: payload,
  });

  return result;
};

export const ClassService = {
  craeteClassIntoDb,
};

export default ClassService;
