import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { trim } from "./middleware/trim";
import { options } from "../utils/options";

import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import subRoutes from "./routes/sub";
import miscRoutes from "./routes/misc";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());
app.use(cors(options));
app.use(express.static("public/images"));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/sub", subRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, async () => {
  console.log("Server running on:" + process.env.PORT);
  try {
    await createConnection();
    console.log("DB Connected!");
  } catch (error) {
    console.log(error);
  }
});
