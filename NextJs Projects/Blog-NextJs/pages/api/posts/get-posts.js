import { dbConnect, getDocuments } from "../../../utils/database";

export default async (req, res) => {
  if (req.method !== "GET") {
    return;
  }

  let client;

  try {
    client = await dbConnect();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Somthing went wrong while connecting database." });
    return;
  }

  try {
    const docs = await getDocuments(client, "posts", { _id: -1 });
    res.status(201).json({ posts: docs });
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: "Somthing went wrong while fetching data." });
  }

  client.close();
};
