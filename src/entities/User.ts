import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./Announcement";
import { Comment } from "./Comment";
import { Bid } from "./Bid";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 12, unique: true })
  cell: string;

  @Column({ type: "date" })
  birthDate: Date;

  @Column({ length: 15 })
  accountType: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;

  @Column({ type: "integer" })
  number: number;

  @Column({ length: 20, nullable: true })
  complement: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];
}
