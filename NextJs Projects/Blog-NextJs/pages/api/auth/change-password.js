import { getSession } from "next-auth/client";
import { encryptString, verifyPassword } from "../../../utils/auth";
import { dbConnect } from "../../../utils/database";

export default async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({
    req: req,
  });

  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }

  const { oldPassword, newPassword, userEmail } = req.body;

  const email = session.user.email;

  if (email !== userEmail) {
    res.status(401).json({
      message: "Incorrect Email!",
    });
    return;
  }

  const client = await dbConnect();

  const db = client.db();

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    res.status(404).json({
      message: "Could not find user!",
    });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const isValid = await verifyPassword(oldPassword, currentPassword);

  if (!isValid) {
    res.status(403).json({
      message: "User not authorized!",
    });
    client.close();
    return;
  }

  const encryptedPassword = await encryptString(newPassword);

  const result = await usersCollection.updateOne(
    { email: email },
    { $set: { password: encryptedPassword } }
  );
  client.close();

  res.status(200).json({
    message: "Passowrd Updated!",
  });
};
