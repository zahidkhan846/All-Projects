const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/message");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1203183",
  key: "9d78fbf334d7c5481dde",
  secret: "ba50c45c67daae6a3e7a",
  cluster: "ap2",
  useTLS: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/get-messages", async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages) {
      throw new Error("Something went wrong while fetching the messages.");
    }
    res.status(200).json({ messages: messages });
    return;
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
});

app.post("/add-message", async (req, res) => {
  const { text, createdBy } = req.body;
  const message = new Message({
    text: text,
    createdBy: createdBy,
    createdOn: new Date().toISOString(),
  });

  try {
    const addedMessage = await message.save();
    if (!addedMessage) {
      throw new Error("Something went wrong while sending the message.");
    }
    await Message.findByIdAndUpdate(addedMessage._id, {
      status: true,
    });

    const stream = Message.watch();

    stream.on("change", (data) => {
      console.log(data);
      if (!data) {
        throw new Error("Something went wrong while updating message status.");
      }
      if (data.operationType === "insert") {
        const message = data.fullDocument;
        pusher.trigger("messages", "inserted", message);
      }
    });

    res
      .status(200)
      .json({ message: "Sent Successfully!", addedMessage: addedMessage });
    return;
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
});

app.listen(8080, async (req, res) => {
  console.log("listning on http://localhost:8080");
  try {
    const result = await mongoose.connect(
      "mongodb+srv://zahidkhan846:6zcZdktNPH4TcXUY@cluster0.y1z1b.mongodb.net/whats-app-clone?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    if (!result) {
      throw new Error("Something went wrong while connecting database.");
    }

    console.log("DB connection completed!");
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
});
