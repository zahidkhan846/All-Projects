const User = require("../model/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate use input
    const errors = {};
    if (!validator.isEmail(email)) errors.email = "Plaese enter valid email.";
    if (!validator.isLength(password, { min: 5 }))
      errors.password = "Password must be atleast 5 characters long.";

    //  Validate user data

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) errors.email = "Email already taken.";

    if (Object.keys(errors).length > 0) {
      return res
        .status(400)
        .json({ message: "Failed to create user.", error: errors });
    }

    const encryptedPassword = await bcrypt.hash(password, 6);

    //  Create new user
    const newUser = new User({
      email,
      password: encryptedPassword,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ message: "Successful", email: newUser.email });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = {};

    if (!validator.isEmail(email)) {
      errors.email = "Plaese enter valid email.";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Password must not be empty.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(401).json({ error: errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(404).json({ error: errors });
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) {
      errors.password = "Password did not match.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(401).json({ error: errors });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res
      .status(200)
      .json({ message: "Sucessfully logged in", user: user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.currentUser = (req, res) => {
  console.log(res.locals.user);
  return res.json({ user: res.locals.user });
};

exports.logout = (req, res) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ message: "Sucessfully logged out" });
};
