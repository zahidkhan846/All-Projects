import { MongoClient } from "mongodb";

export const dbConnect = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    return client;
  } catch (error) {
    res.status(500).json({
      message: "Could not connect to the database.",
    });
    return;
  }
};
