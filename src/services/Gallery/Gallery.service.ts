import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Gallery } from "../../entities/Gallery";
import { Announcement } from "../../entities/Announcement";
import { ICreateGallery } from "../../interfaces/Gallery";

class GalleryServices {
  static galleryRepository = AppDataSource.getRepository(Gallery);
  static announcementRepository = AppDataSource.getRepository(Announcement);

  static async createGalleryService(
    userID: string,
    announceId: string,
    { url }: ICreateGallery
  ): Promise<Gallery | Object> {
    const findAnnounce = await this.announcementRepository.findOne({
      relations: {
        user: true,
        gallery: true,
      },
      where: { id: announceId },
    });

    if (!findAnnounce) {
      throw new AppError(404, "Announce not found!");
    }

    if (userID !== findAnnounce.user.id) {
      throw new AppError(
        403,
        "This action is only allowed to the announcement owner"
      );
    }

    const foundGallery = findAnnounce.gallery.map((item) => item.url !== null);

    if (foundGallery) {
      throw new AppError(
        400,
        "Gallery already created, now can only be update it!"
      );
    }

    const newGallery = this.galleryRepository.create({
      url,
      announcement: findAnnounce,
    });

    await this.galleryRepository.save(newGallery);

    let response = {
      id: newGallery.id,
      url: newGallery.url,
      announcement: {
        id: newGallery.announcement.id,
      },
      user: {
        id: newGallery.announcement.user.id,
        email: newGallery.announcement.user.email,
      },
    };

    return response;
  }
}
export default GalleryServices;
