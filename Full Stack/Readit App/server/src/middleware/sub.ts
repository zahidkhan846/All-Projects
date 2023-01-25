import { Response, Request, NextFunction } from "express";
import Sub from "../entities/Sub";
import User from "../entities/User";

export const checkSubOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;
  const { name } = req.params;
  try {
    const sub = await Sub.findOneOrFail({ where: { name: name } });

    if (sub.username !== user.username) {
      res.status(403).json({ error: "Something went wrong" });
    }
    res.locals.sub = sub;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
