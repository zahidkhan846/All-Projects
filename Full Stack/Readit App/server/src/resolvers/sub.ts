import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import fs from "fs";

import Post from "../entities/Post";
import Sub from "../entities/Sub";
import User from "../entities/User";

export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty.";
    if (isEmpty(title)) errors.title = "Title must not be empty.";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub already exists";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    try {
      const newSub = await new Sub({ name, title, description, user });

      await newSub.save();

      return res.json(newSub);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const { type } = req.body;
  const sub: Sub = res.locals.sub;

  try {
    if (type !== "image" && type !== "banner") {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ err: "Invalid image type" });
    }

    let oldImageUrn: string = "";
    if (type === "image") {
      oldImageUrn = sub.imageUrn || "";
      sub.imageUrn = req.file.filename;
    } else if (type === "banner") {
      oldImageUrn = sub.bannerUrn || "";
      sub.bannerUrn = req.file.filename;
    }

    if (oldImageUrn !== "") {
      fs.unlinkSync("public\\images\\" + oldImageUrn);
    }

    await sub.save();

    return res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong while uploading image" });
  }
};

export const getAllSubs = async (req: Request, res: Response) => {
  try {
    const subs = await Sub.find({
      order: { createdAt: "DESC" },
    });
    return res.json(subs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSub = async (req: Request, res: Response) => {
  const { name } = req.params;

  const user = res.locals.user;

  try {
    const sub = await Sub.findOneOrFail({ name });

    const posts = await Post.find({
      where: { sub },
      order: { createdAt: "DESC" },
      relations: ["comments", "votes"],
    });

    sub.posts = posts;
    if (user) {
      sub.posts.forEach((post) => post.setUserVote(user));
    }
    return res.json(sub);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Something went wrong" });
  }
};

export const searchSub = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    if (isEmpty(name)) {
      return res.status(400).json({ error: "Name is empty" });
    }
    const subs = await getRepository(Sub)
      .createQueryBuilder()
      .where("LOWER(name) LIKE :name", {
        name: `${name.toLowerCase().trim()}%`,
      })
      .getMany();
    return res.json(subs);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Something went wrong" });
  }
};
