import { Request, Response } from "express";
import GalleryServices from "../../services/Gallery/Gallery.service";

class GalleryController {
  static async createGalleryController(req: Request, res: Response) {
    const userId = req.body.user.id;
    const { announceId } = req.params;
    const { url } = req.body;

    const newGallery = await GalleryServices.createGalleryService(
      userId,
      announceId,
      { url }
    );

    return res.status(201).json(newGallery);
  }

  static async listGalleryController(req: Request, res: Response) {
    const gallerys = await GalleryServices.listGalleryService();

    return res.status(201).json(gallerys);
  }

  static async retrieveGalleryController(req: Request, res: Response) {
    const { galleryId } = req.params;

    const retrievedGallery = await GalleryServices.retrieveGalleryService(
      galleryId
    );

    return res.status(201).json(retrievedGallery);
  }

  static async updateGalleryController(req: Request, res: Response) {
    const { galleryId } = req.params;
    const { urlData } = req.body;

    const updatedGallery = await GalleryServices.updateGalleryService(
      galleryId,
      { urlData }
    );

    return res.status(201).json(updatedGallery);
  }

  static async deleteGalleryController(req: Request, res: Response) {
    const { galleryId } = req.params;
    const { url } = req.params;

    const deletedGallery = await GalleryServices.deleteGalleryService(
      galleryId,
      url
    );

    return res.status(201).json({ message: "Deleted whit success!" });
  }
}
export default GalleryController;
