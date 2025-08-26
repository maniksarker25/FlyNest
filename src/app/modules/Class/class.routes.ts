import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ClassController from "./class.controller";
import { classValidation } from "./class.validation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN),
  validateRequest(classValidation.createClassValidationSchema),
  ClassController.createClass
);

export const userRoutes = router;
