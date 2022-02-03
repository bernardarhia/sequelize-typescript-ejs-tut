import { Router } from "express";
import UserController from "../controllers/User";
const userRouter = Router();

// Sign user up
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
export default userRouter;
