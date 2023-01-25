import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import User from "../entities/User";
import { generateId } from "../../utils/id";
import path from "path";
import fs from "fs";

export const getUserCreatedData = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOneOrFail({
      where: { username },
      select: ["username", "createdAt", "imageUrn"],
    });

    const posts = await Post.find({
      where: { user },
      relations: ["comments", "votes", "sub"],
    });

    const comments = await Comment.find({
      where: { user },
      relations: ["post"],
    });

    if (res.locals.user) {
      posts.forEach((post) => post.setUserVote(res.locals.user));
      comments.forEach((post) => post.setUserVote(res.locals.user));
    }

    let submissitions: any[] = [];

    posts.forEach((post) =>
      submissitions.push({ type: "Post", ...post.toJSON() })
    );
    comments.forEach((comment) =>
      submissitions.push({ type: "Comment", ...comment.toJSON() })
    );

    submissitions.sort((a, b) => {
      if (b.createdAt > a.createdAt) {
        return 1;
      }
      if (b.createdAt < a.createdAt) {
        return -1;
      }
      return 0;
    });
    return res.json({ user, submissitions });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// export const ownProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user: User = res.locals.user;

//   const { username } = req.params;

//   try {
//     const loggedInUser = await User.findOneOrFail({
//       where: { username: username },
//     });

//     if (loggedInUser.username !== user.username) {
//       return res.status(403).json({ error: "Unauthorized" });
//     }
//     res.locals.user = loggedInUser;
//     return next();
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images/user",
    filename: (req, file, callback) => {
      const fileName = generateId(14);
      const extension = path.extname(file.originalname);
      callback(null, fileName + extension);
    },
  }),
  fileFilter: (req, file, callback: FileFilterCallback) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not an image."));
    }
  },
});

export const postUserImage = async (req: Request, res: Response) => {
  const currentUser = res.locals.user;
  try {
    let oldImageUrn = "";
    oldImageUrn = currentUser.imageUrn || "";
    currentUser.imageUrn = req.file.filename;

    if (oldImageUrn !== "") {
      fs.unlinkSync(`public\\images\\user\\${oldImageUrn}`);
    }

    await currentUser.save();
    return res.status(200).json({ user: currentUser });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
