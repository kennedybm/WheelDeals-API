import { Router } from "express";
import AnnouncementController from "../controllers/Announcements/Announcements.controller";
import VerifyAnnouncementOwner from "../middlewares/authentication/verifyAnnouncementOwner.middleware";
import VerifyToken from "../middlewares/authentication/verifyToken.middleware";

const announcementsRoute = Router();

announcementsRoute.post(
  "/",
  VerifyToken,
  AnnouncementController.createAnnouncementController
);

announcementsRoute.get("", AnnouncementController.listAnnouncementController);

announcementsRoute.get(
  "/:id",
  AnnouncementController.retrieveAnnouncementController
);

announcementsRoute.patch(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.updateAnnouncementController
);

announcementsRoute.delete(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.deleteAnnouncementController
);

export default announcementsRoute;
