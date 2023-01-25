const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Message", messageSchema);
