import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/sign-up",
  validateRequest(userValidation.registerUserValidationSchema),
  userController.registerUser
);

router.post("/login", userController.loginUser);

export const userRoutes = router;
