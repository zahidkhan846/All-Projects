const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const { clearImage } = require("../middleware/deleteImage");

module.exports = {
  // CREATEING NEW USER

  createUser: async ({ userInput }, req) => {
    const errors = [];

    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Invalid email!" });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({
        message: "Invalid password. (Atleast 5 charcters required)",
      });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      const error = new Error("User already exists, Try different email!");
      throw error;
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },

  // LOGGIN USER IN

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found!");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password Mismatch!");
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      "jwtsecretprivatekey",
      { expiresIn: "1h" }
    );
    return {
      token: token,
      userId: user._id.toString(),
    };
  },

  createPost: async ({ postInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("User isn't authenticated!");
      error.code = 401;
      throw error;
    }

    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid!" });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid!" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("Invalid User");
      error.code = 401;
      throw error;
    }

    const post = Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      author: user,
    });

    const createdPost = await post.save();

    user.posts.push(createdPost);
    await user.save();

    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },

  posts: async (args, req) => {
    if (!req.isAuth) {
      const error = new Error("User isn't authenticated!");
      error.code = 401;
      throw error;
    }

    const posts = await Post.find().sort({ createdAt: -1 }).populate("author");
    return {
      posts: posts.map((post) => {
        return {
          ...post._doc,
          _id: post._id.toString(),
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        };
      }),
    };
  },

  post: async ({ id }, req) => {
    if (!req.isAuth) {
      const error = new Error("User isn't authenticated!");
      error.code = 401;
      throw error;
    }

    const post = await Post.findById(id).populate("author");

    if (!post) {
      const error = new Error("No post found!");
      error.code = 401;
      throw error;
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  },

  updatePost: async ({ id, postInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("User isn't authenticated!");
      error.code = 401;
      throw error;
    }

    const post = await Post.findById(id).populate("author");

    if (!post) {
      const error = new Error("No post found!");
      error.code = 401;
      throw error;
    }

    if (post.author._id.toString() !== req.userId.toString()) {
      const error = new Error("User isn't authorized!");
      error.code = 403;
      throw error;
    }

    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid!" });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid!" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    post.title = postInput.title;
    post.content = postInput.content;
    if (postInput.imageUrl !== "undefined") {
      post.imageUrl = postInput.imageUrl;
    }
    const updatedPost = await post.save();

    return {
      ...updatedPost._doc,
      _id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  },
  deletePost: async ({ id }, req) => {
    if (!req.isAuth) {
      const error = new Error("User isn't authenticated!");
      error.code = 401;
      throw error;
    }

    const post = await Post.findById(id).populate("author");

    if (!post) {
      const error = new Error("No post found!");
      error.code = 401;
      throw error;
    }

    if (post.author._id.toString() !== req.userId.toString()) {
      const error = new Error("User isn't authorized!");
      error.code = 403;
      throw error;
    }

    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(id);
    const user = await User.findById(req.userId);
    user.posts.pull(id);
    await user.save();
    return true;
  },
};
