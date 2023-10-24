import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";
import { Replies } from "./replies";
import { Likes } from "./likes";

@Entity({ name: "threads" })
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.threads, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: Users;

  @OneToMany(() => Replies, (reply) => reply.thread, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  replies: Replies[];

  @OneToMany(() => Likes, (like) => like.thread)
  likes: Likes[];
}
