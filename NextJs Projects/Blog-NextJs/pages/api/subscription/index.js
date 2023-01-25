import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "Invalid email.",
    });
    return;
  }

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
  } catch (err) {
    client.close();
    res.status(500).json({
      message: "Could not connect to database.",
    });
    return;
  }

  const db = client.db();

  try {
    await db.collection("subscribers").insertOne({ email: email });
  } catch (error) {
    client.close();
    res.status(422).json({
      message: "Unable to subscribe.",
    });
    return;
  }

  client.close();

  res.status(200).json({
    message: "Successfully Subcribed!",
  });
};
