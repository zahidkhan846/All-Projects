const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

const trim = require("./middleware/trim");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(trim);
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected on http://localhost:${process.env.PORT}`);
});
