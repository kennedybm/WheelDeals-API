import { Router } from "express";
import GalleryController from "../../controllers/Gallery/gallery.controllers";
import VerifyToken from "../../middlewares/authentication/verifyToken.middleware";

const galleryRoutes = Router();

//create gallery
galleryRoutes.post(
  "/:announceId",
  VerifyToken,
  GalleryController.createGalleryController
);

export default galleryRoutes;
