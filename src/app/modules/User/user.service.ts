import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { User, UserStatus } from "@prisma/client";
import { TLoginUser } from "./user.interface";
import config from "../../config";
import { jwtHelper } from "../../helpers/jwtHelper";
import AppError from "../../error/appError";
import httpStatus from "http-status";
const registerUserIntoDB = async (
  payload: User & { age: number; password: string; confirmPassword: string }
) => {
  const { password, confirmPassword, ...userData } = payload;
  if (password !== confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password and confirm password doesn't match"
    );
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  payload.password = hashedPassword;

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

// login user into db
const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  const jwtPayload = {
    id: user.id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwtHelper.generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const userService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
