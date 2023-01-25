import { Request, Response } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import Sub from "../entities/Sub";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, subName } = req.body;

  const user = res.locals.user;

  if (title.trim() === "")
    return res.status(400).json({ title: "Title must not be empty." });

  try {
    const subDoc = await Sub.findOneOrFail({ name: subName });

    const newPost = new Post({ title, body, sub: subDoc, user });

    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const currentPage: number = (req.query.page || 0) as number;
  const postsPerPage: number = (req.query.count || 8) as number;

  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
      relations: ["comments", "sub", "votes"],
      skip: currentPage * postsPerPage,
      take: postsPerPage,
    });

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user));
    }

    if (!posts) {
      throw new Error("Posts not found!");
    }

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail(
      { identifier: identifier, slug: slug },
      { relations: ["comments", "votes", "sub"] }
    );

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

export const latestPosts = async (req: Request, res: Response) => {
  try {
    const subs = await (
      await Post.find({ order: { createdAt: "DESC" } })
    ).slice(0, 4);

    return res.json(subs);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPostComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail({
      identifier: identifier,
      slug: slug,
    });

    const comments = await Comment.find({
      where: { post },
      order: { createdAt: "DESC" },
      relations: ["votes"],
    });

    if (res.locals.user) {
      comments.forEach((comment) => comment.setUserVote(res.locals.user));
    }

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const postComment = async (req: Request, res: Response) => {
  const { body } = req.body;
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const newComent = await new Comment({ body, user: res.locals.user, post });

    await newComent.save();

    return res.json(newComent);
  } catch (error) {
    return res.status(404).json({ error: "Post not found" });
  }
};
