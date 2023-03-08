import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import {
  ICreateAnnouncementData,
  IUpdateAnnouncement,
} from "../../interfaces/Announcements";

class AnnouncementService {
  static announcementRepository = AppDataSource.getRepository(Announcement);
  static userRepository = AppDataSource.getRepository(User);

  static async createAnnouncementsService({
    title,
    announceType,
    description,
    km,
    fabricationYear,
    price,
    announceCover,
    category,
    id,
  }: ICreateAnnouncementData): Promise<Object> {
    const findAnnouncement = await this.announcementRepository.findOneBy({
      announceCover: announceCover,
    });
    if (findAnnouncement) {
      throw new AppError(400, "Announce image is already been used");
    }

    const findUser = await this.userRepository.findOneBy({
      id: id,
    });
    if (!findUser) {
      throw new AppError(404, "User not found!");
    }

    const newAnnouncement = this.announcementRepository.create({
      title,
      announceType,
      description,
      km,
      fabricationYear,
      price,
      announceCover,
      category,
      user: findUser,
    });

    await this.announcementRepository.save(newAnnouncement);

    const join = await this.announcementRepository
      .createQueryBuilder("announcement")
      .where("announcement.announceCover = :announceCover", {
        announceCover: announceCover,
      })
      .leftJoinAndSelect("announcement.user", "user")
      .getOne();

    let announcementResponse = {};

    if (join?.user != null) {
      announcementResponse = {
        id: join.id,
        title: join.title,
        announceType: join.announceType,
        description: join.description,
        km: join.km,
        fabricationYear: join.fabricationYear,
        price: join.price,
        announceCover: join.announceCover,
        category: join.category,
        isActive: join.is_active,
        user: {
          id: join.user.id,
          name: join.user.name,
          email: join.user.email,
          cell: join.user.cell,
          state: join.user.state,
          city: join.user.city,
          isActive: join.user.is_active,
        },
      };
    }

    return announcementResponse;
  }

  static async listAnnouncementsService() {
    const announcements = await this.announcementRepository.find();
    return announcements;
  }

  static async retrieveAnnouncementService(
    id: string
  ): Promise<Announcement | Object> {
    const announcement = await this.announcementRepository.findOne({
      where: { id: id },
    });

    if (!announcement) {
      throw new AppError(404, "Announcement not found");
    }

    let retrieveResponse = {};

    const join = await this.announcementRepository
      .createQueryBuilder("announcement")
      .where("announcement.id = :id", { id: id })
      .leftJoinAndSelect("announcement.user", "user")
      .getOne();

    retrieveResponse = {
      id: join?.id,
      title: join?.title,
      announceType: join?.announceType,
      description: join?.description,
      km: join?.km,
      fabricationYear: join?.fabricationYear,
      price: join?.price,
      announceCover: join?.announceCover,
      category: join?.category,
      isActive: join?.is_active,
      user: {
        id: join?.user.id,
        name: join?.user.name,
        email: join?.user.email,
        cell: join?.user.cell,
        state: join?.user.state,
        city: join?.user.city,
        isActive: join?.user.is_active,
      },
    };

    return retrieveResponse;
  }

  static async updateAnnouncementService(
    id: string,
    data: IUpdateAnnouncement
  ): Promise<Announcement> {
    const findAnnouncement = await this.announcementRepository.find();

    const announcement = findAnnouncement.find(
      (announce) => announce.id === id
    );
    if (!announcement) {
      throw new AppError(404, "Announcement not found!");
    }

    findAnnouncement.map((announce) => {
      if (announce.title === data.title) {
        throw new AppError(400, `Title ${announce.title}, already in use!`);
      } else if (announce.announceType === data.announceType) {
        throw new AppError(400, `${announce.announceType} already in use!`);
      } else if (announce.description === data.description) {
        throw new AppError(400, `Description already in use!`);
      } else if (announce.km === data.km) {
        throw new AppError(400, `${announce.km} already in use!`);
      } else if (announce.fabricationYear === data.fabricationYear) {
        throw new AppError(400, `${announce.fabricationYear} already in use!`);
      } else if (announce.price === data.price) {
        throw new AppError(400, `${announce.price} already in use!`);
      } else if (announce.announceCover === data.announceCover) {
        throw new AppError(400, `Announce Cover already in use!`);
      } else if (announce.category === data.category) {
        throw new AppError(400, `${announce.category} already in use!`);
      } else if (announce.is_active === data.is_active) {
        throw new AppError(
          400,
          `$Status ${announce.is_active} already in use!`
        );
      }
    });

    return await this.announcementRepository.save({
      ...announcement,
      ...data,
    });
  }

  static async deleteAnnouncementService(id: string): Promise<boolean> {
    const announcement = await this.announcementRepository.findOneBy({
      id: id,
    });

    if (!announcement) {
      throw new AppError(404, "Announcement not found!");
    }

    await this.announcementRepository.delete({ id: id });

    return true;
  }
}
export default AnnouncementService;
