import { Request, Response } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import User from "../entities/User";
import Vote from "../entities/Vote";

export const createVote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  const voteValues = [-1, 0, 1];

  if (!voteValues.includes(value)) {
    return res.status(400).json({ error: "Value must be -1, 0 or 1" });
  }

  try {
    const user: User = res.locals.user;
    let post = await Post.findOneOrFail({ identifier, slug });

    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (commentIdentifier) {
      comment = await Comment.findOneOrFail({ identifier: commentIdentifier });
      vote = await Vote.findOne({ user, comment });
    } else {
      vote = await Vote.findOne({ user, post });
    }

    if (!vote && value === 0) {
      return res.status(400).json({ error: "Vote not found" });
    } else if (!vote) {
      vote = await new Vote({ user, value });

      if (comment) vote.comment = comment;
      else vote.post = post;
      await vote.save();
    } else if (value === 0) {
      await vote.remove();
    } else if (vote.value !== value) {
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOne(
      { identifier, slug },
      { relations: ["comments", "comments.votes", "sub", "votes"] }
    );

    post.setUserVote(user);
    post.comments.forEach((c) => c.setUserVote(user));

    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const latestSubs = async (req: Request, res: Response) => {
  try {
    const subs = await (
      await Sub.find({ order: { createdAt: "DESC" } })
    ).slice(0, 5);

    return res.json(subs);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// const topSubcripes = async (req: Request, res: Response) => {}(_: Request, res: Response) => {
//   try {

//     const imageUrlExp = `COALESCE('${process.env.APP_URL}/images/' || s."imageUrn" , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')`
//     const subs = await getConnection()
//       .createQueryBuilder()
//       .select(
//         `s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`
//       )
//       .from(Sub, 's')
//       .leftJoin(Post, 'p', `s.name = p."subName"`)
//       .groupBy('s.title, s.name, "imageUrl"')
//       .orderBy(`"postCount"`, 'DESC')
//       .limit(5)
//       .execute()

//     return res.json(subs)
//   } catch (err) {
//     return res.status(500).json({ error: 'Something went wrong' })
//   }
// }
