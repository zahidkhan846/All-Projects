import { Router } from "express";
import { checkAuthStatus } from "../middleware/auth";
import { checkUserStatus } from "../middleware/user";
import {
  createPost,
  getAllPosts,
  getPostComment,
  getSinglePost,
  latestPosts,
  postComment,
} from "../resolvers/post";

const router = Router();

router.post("/create-post", checkUserStatus, checkAuthStatus, createPost);

router.get("/get-posts", checkUserStatus, getAllPosts);
router.get("/latest-posts", latestPosts);

router.get("/get-post/:identifier/:slug", checkUserStatus, getSinglePost);

router.post(
  "/get-post/:identifier/:slug/post-comment",
  checkUserStatus,
  checkAuthStatus,
  postComment
);

router.get(
  "/get-post/:identifier/:slug/post-comment",
  checkUserStatus,
  getPostComment
);

router.get("/");

export default router;
