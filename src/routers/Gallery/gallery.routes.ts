import { Router } from "express";
import GalleryController from "../../controllers/Gallery/gallery.controllers";
import VerifyToken from "../../middlewares/authentication/verifyToken.middleware";

const galleryRoutes = Router();

//create gallery
galleryRoutes.post("", VerifyToken);

export default galleryRoutes;
