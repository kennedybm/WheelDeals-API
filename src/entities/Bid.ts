import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Announcement } from "./Announcement";

@Entity("Bid")
export class Bid {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bids)
  user: User;

  @ManyToOne(() => Announcement, (announcement) => announcement.bids)
  announcement: Announcement;
}
