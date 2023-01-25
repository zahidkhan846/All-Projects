import { Router } from "express";
import { checkAuthStatus } from "../middleware/auth";
import { fileUpload } from "../middleware/file";
import { checkSubOwner } from "../middleware/sub";
import { checkUserStatus } from "../middleware/user";
import {
  createSub,
  getSub,
  searchSub,
  uploadImage,
  getAllSubs,
} from "../resolvers/sub";

const router = Router();

router.get("/get-subs", getAllSubs);
router.post("/create-sub", checkUserStatus, checkAuthStatus, createSub);
router.get("/:name", checkUserStatus, getSub);
router.get("/search/:name", searchSub);
router.post(
  "/:name/image",
  checkUserStatus,
  checkAuthStatus,
  checkSubOwner,
  fileUpload.single("file"),
  uploadImage
);

export default router;
