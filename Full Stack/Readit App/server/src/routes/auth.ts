import { Router } from "express";
import { checkAuthStatus } from "../middleware/auth";
import { checkUserStatus } from "../middleware/user";
import { getCurrentUser, login, logout, register } from "../resolvers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", checkUserStatus, checkAuthStatus, getCurrentUser);
router.get("/logout", checkUserStatus, checkAuthStatus, logout);

export default router;
