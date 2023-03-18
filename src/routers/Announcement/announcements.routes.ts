import { Router } from "express";
import AnnouncementController from "../../controllers/Announcements/Announcements.controller";
import VerifyAnnouncementOwner from "../../middlewares/authentication/verifyAnnouncementOwner.middleware";
import VerifyToken from "../../middlewares/authentication/verifyToken.middleware";
import { schemaValidation } from "../../middlewares/Schema/schemaValidation.middleware";
import { announcementSchema } from "../../schemas/announcement.schema";

const announcementsRoute = Router();

//create
announcementsRoute.post(
  "/",
  VerifyToken,
  schemaValidation(announcementSchema),
  AnnouncementController.createAnnouncementController
);

//list all
announcementsRoute.get("", AnnouncementController.listAnnouncementController);

//retrieve by id
announcementsRoute.get("/:id", AnnouncementController.retrieveAnnouncementController);

//update by id
announcementsRoute.patch(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.updateAnnouncementController
);

//delete by id
announcementsRoute.delete(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.deleteAnnouncementController
);

export default announcementsRoute;
