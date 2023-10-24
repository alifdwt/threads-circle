import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";
import { Threads } from "./threads";

@Entity({ name: "likes" })
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.likes)
  user: Users;

  @ManyToOne(() => Threads, (thread) => thread.likes)
  thread: Threads;
}
