const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const io = require("../middleware/socket.io");

exports.addPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(
      "Validation failed incorrect format. (minimum input size should be 5)"
    );
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error(
      "Validation failed incorrect format. (No image found!)"
    );
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
    author: req.userId,
    imageUrl: imageUrl,
  });
  try {
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    const savedUser = await user.save();
    io.getIO().emit("posts", {
      action: "create",
      post: {
        ...post._doc,
        author: { _id: req.userId, userName: user.userName },
      },
    });
    res.status(201).json({
      message: "Post created successfully",
      post: post,
      author: {
        _id: user._id,
        userName: user.userName,
      },
    });
    return savedUser;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateExistingPost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(
      "Validation failed incorrect format. (minimum input size should be 5)"
    );
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error(
      "Validation failed incorrect format. (No image found!)"
    );
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.author.toString() !== req.userId) {
        const error = new Error("Could not find User.");
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Post successfully updated!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "-password")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Successfully fetched all posts",
      posts: posts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSinglePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .populate("author", "-password")
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post fetched",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteSinglePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      //CHECK USEWR IS AUTHENTICATED//

      if (post.author.toString() !== req.userId) {
        const err = new Error("Unauthenticated User");
        err.statusCode = 403;
        throw err;
      }

      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then((result) => {
      console.log(result);
      io.getIO().emit("delete", { post: postId });
      res.status(200).json({ message: "Post Deleted Successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

////HELPER FUNCTION BELOW////HELPER FUNCTION BELOW////HELPER FUNCTION BELOW////HELPER FUNCTION BELOW////

const fs = require("fs");
const path = require("path");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

//PAGINATION LOGIC

// exports.getPosts = (req, res, next) => {
//   const currentPage = req.params.currentPage || 1;
//   const itemsPerPage = 1;
//   let totalItems;
//   Post.find()
//     .countDocuments()
//     .then((postCount) => {
//       totalItems = postCount;
//       return Post.find()
//         .skip((currentPage - 1) * 1)
//         .limit(itemsPerPage);
//     })
//     .then((posts) => {
//       res.status(200).json({
//         message: "Successfully fetched all posts",
//         posts: posts,
//         totalItems: totalItems,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

////HELPER FUNCTION ABOVE////HELPER FUNCTION ABOVE////HELPER FUNCTION ABOVE////HELPER FUNCTION ABOVE////
