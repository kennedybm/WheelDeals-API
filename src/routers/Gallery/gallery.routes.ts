import { Router } from "express";
import GalleryController from "../../controllers/Gallery/gallery.controllers";
import VerifyToken from "../../middlewares/authentication/verifyToken.middleware";
import verifyGalleryOwner from "../../middlewares/authentication/verifyGalleryOwner.middleware";

const galleryRoutes = Router();

//create gallery
galleryRoutes.post(
  "/:announceId",
  VerifyToken,
  GalleryController.createGalleryController
);

//list all
galleryRoutes.get("", GalleryController.listGalleryController);

//retrieve by id
galleryRoutes.get("/:galleryId", GalleryController.retrieveGalleryController);

//update by id
galleryRoutes.patch(
  "/:galleryId",
  verifyGalleryOwner,
  GalleryController.updateGalleryController
);

//delete
galleryRoutes.delete(
  "/:galleryId/:url",
  verifyGalleryOwner,
  GalleryController.deleteGalleryController
);

export default galleryRoutes;
