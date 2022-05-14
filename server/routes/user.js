import { Router } from "express";
import userController from "../controllers/user.js";

const userRoutes = Router();
//Sign up
userRoutes.get("/", userController.user);

export default userRoutes;
