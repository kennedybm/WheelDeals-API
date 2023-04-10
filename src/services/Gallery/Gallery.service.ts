import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Gallery } from "../../entities/Gallery";
import { Announcement } from "../../entities/Announcement";
import { ICreateGallery, IUpdateGallery } from "../../interfaces/Gallery";

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
      throw new AppError(403, "This action is only allowed to the announcement owner");
    }

    const foundGallery = findAnnounce.gallery.map((item) => item.url);

    if (foundGallery.length > 0) {
      throw new AppError(400, "Gallery already created, now can only be update it!");
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

  static async listGalleryService(): Promise<Gallery[]> {
    const gallerys = await this.galleryRepository.find();

    return gallerys;
  }

  static async retrieveGalleryService(galleryId: string): Promise<Gallery | Object> {
    const findGallery = await this.galleryRepository.findOne({
      relations: {
        announcement: true,
      },
      where: {
        id: galleryId,
      },
    });

    if (!findGallery) {
      throw new AppError(404, "Gallery not found!");
    }

    let response = {
      id: findGallery.id,
      url: findGallery.url,
      announcement: {
        id: findGallery.announcement.id,
      },
    };

    return response;
  }

  static async updateGalleryService(galleryId: string, { urlData }: IUpdateGallery) {
    const findGallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
    });

    if (!findGallery) {
      throw new AppError(404, "Gallery not found!");
    }

    if (urlData.length === 0) {
      throw new AppError(400, "Url cannot be empty!");
    }

    const findRegister = findGallery.url.find((content: string): string | undefined => {
      return urlData.find((data: string) => content === data);
    });

    if (findRegister) {
      throw new AppError(400, "One ore more url's alredy registered!");
    }

    findGallery.url.push(...urlData);

    return await this.galleryRepository.save({
      ...findGallery,
    });
  }

  static async deleteGalleryService(galleryId: string, url: string) {
    if (!url) {
      throw new AppError(400, "Url missing!");
    }

    const findGallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
    });

    if (!findGallery) {
      throw new AppError(404, "Gallery not found!");
    }

    const foundIndex = findGallery.url.findIndex((content: string) => {
      return content === url;
    });

    if (foundIndex !== -1) {
      findGallery.url.splice(foundIndex, 1);
    } else if (foundIndex == -1) {
      throw new AppError(404, "Url not found!");
    }

    return await this.galleryRepository.save({
      ...findGallery,
    });
  }
}
export default GalleryServices;
