import multer from "multer";
import { generateId } from "../../utils/id";
import path from "path";

export const fileUpload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: (req, file, callback) => {
      const fileName = generateId(14);
      callback(null, fileName + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not an image."));
    }
  },
});
