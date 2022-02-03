import { UserInterface } from "./../db/interfaces/User";
import { Response, Request } from "express";
import User from "../models/Users";
import { PasswordHash } from "../services/passwordHash";

export default class UserClass implements UserInterface {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    // if email exists
    if (!email || !password) {
      return res.status(500).json({
        error: true,
        success: false,
        message: "Empty email or password",
      });
    }

    // Check if user already exists
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      return res.status(500).json({
        error: true,
        success: false,
        message: "User exists",
      });
    }

    try {
      const hashedPassword = await PasswordHash.toHash(password);
      const registerUser = await User.create({
        email,
        password: hashedPassword,
      });
      if (registerUser) {
        res.cookie("token", registerUser.id, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.status(201).json({
          error: true,
          success: false,
          message: registerUser,
        });
      }
    } catch (error) {
      res.status(500).send("An error occurred");
    }
  }
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // if email exists
    if (!email || !password) {
      return res.status(500).json({
        error: true,
        success: false,
        message: "Empty email or password",
      });
    }

    try {
      // Check if user already exists
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(500).json({
          error: true,
          success: false,
          message: "Wrong  email/password combination",
        });
      }

      res.cookie("token", user.id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: process.env.NODE_ENV === "production",
      });
      return res.status(201).json({
        error: true,
        success: false,
        message: user,
      });
    } catch (error) {
      return res.status(500).send("An error occurred");
    }
  }
}
