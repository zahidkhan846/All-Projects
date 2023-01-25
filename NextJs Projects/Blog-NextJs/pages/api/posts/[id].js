import { ObjectId } from "bson";
import { getSession } from "next-auth/client";
import { dbConnect, getSingleDocument } from "../../../utils/database";

export default async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id;
    let client;

    try {
      client = await dbConnect();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Somthing went wrong while connecting database." });
      return;
    }

    let singleDoc;
    try {
      singleDoc = await getSingleDocument(client, "posts", id);
      res.status(201).json({ post: singleDoc });
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ message: "Somthing went wrong while fetching data." });
    }

    client.close();
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({
        message: "Not authenticated!",
      });
      return;
    }

    const currUser = session.user.email;

    const id = req.query.id;

    const client = await dbConnect();

    const db = client.db();

    const postsCollection = db.collection("posts");

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      res.status(404).json({
        message: "Could not find post!",
      });
      client.close();
      return;
    }

    if (post.userEmail !== currUser) {
      res.status(403).json({
        message: "User not authorized!",
      });
      client.close();
      return;
    }

    const deletePost = await postsCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).json({ message: "Success" });
  }

  if (req.method === "PATCH") {
    const {
      editedTitle,
      editedAuthor,
      editedContent,
      editedCode,
      editedTags,
      editedIsFeatured,
      createdAt,
      updatedAt,
      editedImageUrl,
    } = req.body;

    if (
      !editedTitle ||
      editedTitle.trim() === "" ||
      editedTitle.length < 10 ||
      !editedAuthor ||
      editedAuthor.trim() === "" ||
      !editedContent ||
      editedContent.trim() === "" ||
      editedContent.length < 50 ||
      editedTags.length < 1
    ) {
      res.status(422).json({
        message: "Invalid Input!",
      });
      return;
    }

    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({
        message: "Not authenticated!",
      });
      return;
    }

    const userEmail = session.user.email;

    const editedSlug = `${editedTitle
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")}`;

    const editedPost = {
      title: editedTitle,
      editedAuthor: editedAuthor,
      content: editedContent,
      code: editedCode,
      tags: editedTags,
      isFeatured: editedIsFeatured,
      createdAt: createdAt,
      updatedAt: updatedAt,
      imageUrl: editedImageUrl,
      slug: editedSlug,
      userEmail: userEmail,
    };

    const id = req.query.id;

    const client = await dbConnect();

    const db = client.db();

    const postsCollection = db.collection("posts");

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      res.status(404).json({
        message: "Could not find post!",
      });
      client.close();
      return;
    }

    if (post.userEmail !== userEmail) {
      res.status(403).json({
        message: "User not authorized!",
      });
      client.close();
      return;
    }
    try {
      const updatedPost = await postsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: editedPost }
      );
      res.status(200).json({
        message: "Document Updated!",
        post: updatedPost,
      });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Unable to update." });
      return;
    }

    client.close();
  }
  return;
};
