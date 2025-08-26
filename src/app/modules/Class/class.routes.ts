import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ClassController from "./class.controller";
import { classValidation } from "./class.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(classValidation.createClassValidationSchema),
  ClassController.createClass
);

router.post(
  "/:id/enroll",
  auth(UserRole.ADMIN, UserRole.TEACHER),
  ClassController.enrollAStudentToClass
);
router.get(
  "/:id/students",
  auth(UserRole.ADMIN, UserRole.TEACHER),
  ClassController.getStudentOfAClass
);
export const classRoutes = router;
