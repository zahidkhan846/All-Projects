const mongoose = require("mongoose");
const Document = require("./model/document");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const findOrCraeteDocument = async (id) => {
  let data = "";
  if (!id) return;

  const document = await Document.findById(id);
  if (document) {
    return document;
  }
  return await Document.create({ _id: id, data: data });
};

const io = require("socket.io")("3001", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (docId) => {
    const document = await findOrCraeteDocument(docId);
    socket.join(docId);
    socket.emit("set-document", document.data);
    socket.on("send-change", (delta) => {
      socket.broadcast.to(docId).emit("receive-change", delta);
    });

    socket.on("save-document", async (updatedData) => {
      await Document.findByIdAndUpdate(docId, { data: updatedData });
    });
  });
});
