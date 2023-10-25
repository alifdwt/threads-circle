import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Threads } from "./threads";
import { Users } from "./users";

@Entity({ name: "replies" })
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.replies)
  user: Users;

  @ManyToOne(() => Threads, (thread) => thread.replies)
  thread: Threads;
}
