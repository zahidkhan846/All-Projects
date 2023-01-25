const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Array,
    default: "user",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "POST",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
