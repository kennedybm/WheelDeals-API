import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Announcement } from "./Announcement";
import { User } from "./User";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  announcement: Announcement;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
