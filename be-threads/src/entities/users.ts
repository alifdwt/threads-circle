import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Threads } from "./threads";
import { Replies } from "./replies";
import { Likes } from "./likes";
import { Following } from "./following";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  profile_picture: string;

  @Column()
  profile_description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Threads, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Threads[];

  @OneToMany(() => Replies, (reply) => reply.user)
  replies: Replies[];

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];

  @OneToMany(() => Following, (following) => following.follower)
  following: Following[];

  @OneToMany(() => Following, (following) => following.following)
  followers: Following[];
}
