import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { User } from "@prisma/client";
import { TLoginUser } from "./user.interface";
import config from "../../config";
import { jwtHelper } from "../../helpers/jwtHelper";
import AppError from "../../error/appError";
import httpStatus from "http-status";
const registerUserIntoDB = async (payload: User) => {
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
      data: payload,
    });
    const profileData = {
      userId: createUser?.id,
      bio: "",
      profileImage: "",
      profession: "",
      address: "",
      education: "",
      phone: "",
      email: "",
    };
    await transactionClient.userProfile.create({
      data: profileData,
    });
    return createUser;
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
  return {
    token: accessToken,
  };
};

export const userService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
