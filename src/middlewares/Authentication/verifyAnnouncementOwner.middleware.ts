import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement";
import "dotenv/config";
import { AppError } from "../../errors/AppError";

async function VerifyAnnouncementOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const announcementManager = AppDataSource.getRepository(Announcement);

  const foundAnnouncement = await announcementManager.findOne({
    relations: {
      user: true,
    },
    where: {
      id: req.params.id,
    },
  });

  if (!foundAnnouncement) {
    throw new AppError(404, "Announcement not found!");
  }

  const userId = foundAnnouncement?.user.id;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const tokenSplit = token.split(" ");

  jwt.verify(
    tokenSplit[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (decoded.id !== userId) {
        return res.status(403).json({
          message: "User do not have permission",
        });
      }

      next();
    }
  );
}

export default VerifyAnnouncementOwner;
