import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Gallery } from "../../entities/Gallery";
import { Announcement } from "../../entities/Announcement";

class GalleryServices {
  static galleryRepository = AppDataSource.getRepository(Gallery);
  static announcementRepository = AppDataSource.getRepository(Announcement);

  static async createGalleryService() {}
}
export default GalleryServices;
