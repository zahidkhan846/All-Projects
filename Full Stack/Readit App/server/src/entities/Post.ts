import { Exclude, Expose } from "class-transformer";
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity as TypeOrmEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { generateId } from "../../utils/id";
import { generateSlug } from "../../utils/slug";
import Comment from "./Comment";

import Entity from "./Entity";
import Sub from "./Sub";
import User from "./User";
import Vote from "./Vote";

@TypeOrmEntity("posts")
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Column()
  @Index()
  identifier: string;

  @Column()
  title: string;

  @Column()
  @Index()
  slug: string;

  @Column({ type: "text", nullable: true })
  body: string;

  @Column()
  subName: string;

  // @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column()
  username: string;

  @Expose() get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`;
  }
  @Expose() get commentCount(): number {
    return this.comments?.length;
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = generateId(7);
    this.slug = generateSlug(this.title, "_");
  }

  protected userVote: number;
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }
}
