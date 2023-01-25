import { isEmpty, validate } from "class-validator";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../entities/User";
import { errorsMapper } from "../../utils/errorsMap";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    let errors: any = {};

    const isEmailExist = await User.findOne({ email });
    const isUsernameExist = await User.findOne({ username });

    if (isEmailExist) errors.email = "Email already exists.";
    if (isUsernameExist) errors.username = "Username already exists.";

    const newUser = new User({ username, email, password });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    errors = await validate(newUser);
    if (errors.length > 0) {
      return res.status(400).json(errorsMapper(errors));
    }

    await newUser.save();

    return res.json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = "Username must not be empty.";
    if (isEmpty(password)) errors.password = "Password must not be empty.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const currentUser = await User.findOne({ username: username });
    if (!currentUser) {
      return res.status(400).json({ error: "User does not exists." });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Password does not match." });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json(currentUser);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.json(res.locals.user);
};

export const logout = (req: Request, res: Response) => {
  try {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        expires: new Date(0),
        path: "/",
      })
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Somthing went wrong while logging out." });
  }
};
