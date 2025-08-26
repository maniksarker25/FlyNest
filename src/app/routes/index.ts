import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { studentRoutes } from "../modules/Student/student.routes";
import { classRoutes } from "../modules/Class/class.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/classes",
    route: classRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
