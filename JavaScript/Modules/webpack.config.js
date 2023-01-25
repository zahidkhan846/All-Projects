/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/assets/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
