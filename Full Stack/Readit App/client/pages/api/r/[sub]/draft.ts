import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const buildPostsPath = () => {
  return path.join(process.cwd(), "public", "db", "draft.json");
};

const extractPosts = (filePath: string) => {
  const fileData: any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

export default async (req, res) => {
  if (req.method === "POST") {
    const { subName, body, title, username } = req.body;

    try {
      const newPost = {
        postId: uuidv4(),
        subName: subName,
        boby: body,
        title: title,
        username: username,
      };

      // store data locally
      const filePath = buildPostsPath();
      const data = extractPosts(filePath);
      data.push(newPost);
      fs.writeFileSync(filePath, JSON.stringify(data));
      return res.status(201).json({ message: "Success", post: newPost });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "GET") {
    try {
      const filePath = buildPostsPath();
      const data = extractPosts(filePath);
      return res.status(201).json({ message: "Success", posts: data });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  return;
};
