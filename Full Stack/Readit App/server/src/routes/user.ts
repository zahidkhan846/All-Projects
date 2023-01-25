import { Router } from "express";
import { checkAuthStatus } from "../middleware/auth";
import { checkUserStatus } from "../middleware/user";
import { getUserCreatedData, postUserImage, upload } from "../resolvers/user";

const router = Router();

router.get("/:username", checkUserStatus, getUserCreatedData);
router.post(
  "/:username/image",
  checkUserStatus,
  checkAuthStatus,
  upload.single("userImage"),
  postUserImage
);

export default router;
