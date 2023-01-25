import { MongoClient } from "mongodb";
import { encryptString } from "../../../utils/auth";

export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { userName, email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !userName ||
    userName.trim() === "" ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Invalid input (password should be atlesast 5 characters.",
    });
    return;
  }
  const encryptedPassword = await encryptString(password);

  const newUser = {
    userName: userName,
    email: email,
    password: encryptedPassword,
  };

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
  } catch (error) {
    res.status(500).json({
      message: "Could not connect to the database.",
    });
    return;
  }

  const db = client.db();

  const isUserExist = await db.collection("users").findOne({ email: email });

  if (isUserExist) {
    client.close();
    return res.status(422).json({
      message: "User already exists, Please try another email!",
    });
  }

  try {
    const result = await db.collection("users").insertOne(newUser);
    newUser._id = result.insertedId;
  } catch (err) {
    client.close();
    res.status(500).json({
      message: "Creating user failed!",
    });
    return;
  }

  client.close();

  res.status(201).json({
    message: "User Created!",
    user: newUser,
  });
};
