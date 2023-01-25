const express = require("express");
const {
  createUser,
  signinUser,
  currentUser,
  logout,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/signin-user", signinUser);
router.get("/current-user", auth, currentUser);
router.get("/logout-user", auth, logout);

module.exports = router;
