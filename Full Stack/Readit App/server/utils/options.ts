import dotenv from "dotenv";

dotenv.config();

export const options: any = {
  credentials: true,
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};
