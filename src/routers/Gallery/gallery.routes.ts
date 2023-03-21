import { Router } from "express";
import GalleryController from "../../controllers/Gallery/gallery.controllers";
import VerifyToken from "../../middlewares/Authentication/verifyToken.middleware";
import verifyGalleryOwner from "../../middlewares/Authentication/verifyGalleryOwner.middleware";
import { schemaValidation } from "../../middlewares/Schema/schemaValidation.middleware";
import { gallerySchema } from "../../schemas/gallery.schema";

const galleryRoutes = Router();

//create gallery
galleryRoutes.post(
  "/:announceId",
  VerifyToken,
  schemaValidation(gallerySchema),
  GalleryController.createGalleryController
);

//list all
galleryRoutes.get("", GalleryController.listGalleryController);

//retrieve by id
galleryRoutes.get("/:galleryId", GalleryController.retrieveGalleryController);

//update by id
galleryRoutes.patch("/:galleryId", verifyGalleryOwner, GalleryController.updateGalleryController);

//delete
galleryRoutes.delete(
  "/:galleryId/:url",
  verifyGalleryOwner,
  GalleryController.deleteGalleryController
);

export default galleryRoutes;
