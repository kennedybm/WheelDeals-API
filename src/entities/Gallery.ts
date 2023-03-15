import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./Announcement";

@Entity("Gallery")
export class Gallery {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.gallery)
  announcement: Announcement;
}
