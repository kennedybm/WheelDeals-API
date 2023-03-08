import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./Announcement";

@Entity("Galery")
export class Galery {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.galery)
  announcement: Announcement;
}
