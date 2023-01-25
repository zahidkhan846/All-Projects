import { NextFunction, Request, Response } from "express";
import User from "../entities/User";

export const checkAuthStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser: User | undefined = res.locals.user;
    if (!currentUser) throw new Error("Unauthenticated!");

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
