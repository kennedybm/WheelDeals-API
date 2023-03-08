import { Request, Response } from "express";
import AnnouncementService from "../../services/Announcements/Announcements.service";

class AnnouncementController {
  static async createAnnouncementController(req: Request, res: Response) {
    const id = req.body.user.id;
    const {
      title,
      announceType,
      description,
      km,
      fabricationYear,
      price,
      announceCover,
      category,
    } = req.body;

    const newAnnouncement =
      await AnnouncementService.createAnnouncementsService({
        title,
        announceType,
        description,
        km,
        fabricationYear,
        price,
        announceCover,
        category,
        id,
      });

    return res.status(201).json(newAnnouncement);
  }

  static async listAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.listAnnouncementsService();
    return res.status(200).json(announcements);
  }

  static async retrieveAnnouncementController(req: Request, res: Response) {
    const { id } = req.params;

    const udaptedAnnouncement =
      await AnnouncementService.retrieveAnnouncementService(id);

    return res.status(200).json(udaptedAnnouncement);
  }

  static async updateAnnouncementController(req: Request, res: Response) {
    const { id } = req.params;

    const updatedAnnouncement =
      await AnnouncementService.updateAnnouncementService(id, req.body);

    return res.status(200).json({ message: "Updated with success!" });
  }

  static async deleteAnnouncementController(req: Request, res: Response) {
    await AnnouncementService.deleteAnnouncementService(req.params.id);

    return res
      .status(200)
      .json({ message: "Announcement deleted with success!" });
  }
}

export default AnnouncementController;
