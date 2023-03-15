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
}
export default GalleryController;
