import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";
import { Bid } from "./Bid";
import { Galery } from "./Galery";

@Entity("Announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 10 })
  announceType: string;

  @Column({ type: "integer" })
  fabricationYear: number;

  @Column({ type: "integer" })
  km: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 10 })
  category: string;

  @Column({ type: "text" })
  announceCover: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.announcements)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Comment[];

  @OneToMany(() => Bid, (bid) => bid.announcement)
  bids: Bid[];

  @OneToMany(() => Galery, (galery) => galery.announcement)
  galery: Galery[];
}
