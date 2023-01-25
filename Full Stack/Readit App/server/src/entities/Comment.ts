import { Exclude, Expose } from "class-transformer";
import {
  BeforeInsert,
  Column,
  Entity as TypeOrmEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { generateId } from "../../utils/id";

import Entity from "./Entity";
import Post from "./Post";
import User from "./User";
import Vote from "./Vote";

@TypeOrmEntity("comments")
export default class Comment extends Entity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Column({ unique: true })
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = generateId(8);
  }

  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }
}
