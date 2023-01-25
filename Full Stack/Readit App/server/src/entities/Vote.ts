import {
  Column,
  Entity as TypeOrmEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Comment from "./Comment";

import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

@TypeOrmEntity("votes")
export default class Vote extends Entity {
  constructor(sub: Partial<Vote>) {
    super();
    Object.assign(this, sub);
  }

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
