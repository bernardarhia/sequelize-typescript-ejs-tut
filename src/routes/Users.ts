import { Router } from "express";
import UserClass from "../controllers/User";
import Users from "../models/Users";
const userRouter = Router();

// Sign user up
userRouter.post("/register", UserClass.register);
userRouter.post("/login", UserClass.login);
export default userRouter;
