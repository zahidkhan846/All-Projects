import { IsEmail, Length } from "class-validator";
import {
  Entity as TypeOrmEntity,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import { Exclude, Expose } from "class-transformer";

import Entity from "./Entity";
import Post from "./Post";
import Vote from "./Vote";

@TypeOrmEntity("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Column({ unique: true })
  @Length(3, 255, {
    message: "Username must be longer than or equal to 3 characters",
  })
  username: string;

  @Column({ unique: true })
  @IsEmail(undefined, { message: "Email must be a valid email address" })
  @Length(1, 255, { message: "Email is Empty" })
  email: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Exclude()
  @Column()
  @Length(3, 255, {
    message: "Password must be longer than or equal to 3 characters",
  })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP}/user/${this.imageUrn}`
      : process.env.AVATAR;
  }
}
