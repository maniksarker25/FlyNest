import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { studentValidations } from "./student.validation";
import { studentController } from "./student.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(studentValidations.createStudentValidationSchema),
  studentController.createStudent
);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.TEACHER),
  studentController.getAllStudents
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT),
  studentController.getSingleStudent
);

export const studentRoutes = router;
