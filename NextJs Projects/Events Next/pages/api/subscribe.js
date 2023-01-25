import { dbConnect, useDatabase } from "../../middleware/database";

export default async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid User Input!" });
    }

    let client;

    try {
      client = await dbConnect();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong while connecting database." });
    }

    try {
      await useDatabase(client, "subscriber", {
        email: email,
      });
      client.close();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong while inserting data." });
    }

    return res.status(201).json({ message: "Success!", email });
  }
};
