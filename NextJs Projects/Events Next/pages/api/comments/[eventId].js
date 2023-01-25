import {
  dbConnect,
  getDocuments,
  useDatabase,
} from "../../../middleware/database";

export default async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await dbConnect();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Somthing went wrong while connecting database." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !email.includes("@") ||
      !email ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input!" });
    }

    const newComment = {
      email,
      name,
      comment,
      eventId,
    };

    try {
      const result = await useDatabase(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Comment Added!", comment: newComment });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Somthing went wrong while commenting!" });
    }
  }

  if (req.method === "GET") {
    try {
      const docs = await getDocuments(client, "comments", { _id: -1 });
      res.status(201).json({ comments: docs });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Somthing went wrong while fetching data." });
    }
  }

  client.close();
};
