import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Gallery } from "../../entities/Gallery";

const verifyGalleryOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const galleryRepository = AppDataSource.getRepository(Gallery);

  const foundGallery = await galleryRepository.findOne({
    where: {
      id: req.params.galleryId,
    },
  });

  if (!foundGallery) {
    throw new AppError(404, "Gallery not found!");
  }

  const findUser = await galleryRepository
    .createQueryBuilder("gallery")
    .where("gallery.id = :id", { id: req.params.galleryId })
    .leftJoinAndSelect("gallery.announcement", "announce")
    .leftJoinAndSelect("announce.user", "user")
    .getOne();

  const userId = findUser?.announcement.user.id;

  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Invalid token!");
  }
  const tokenSplit = token.split(" ");

  jwt.verify(
    tokenSplit[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (decoded.id !== userId) {
        throw new AppError(403, "User do not have permission!");
      } else if (decoded.isActive === false) {
        throw new AppError(403, "User do not have permission!");
      }
      next();
    }
  );
};
export default verifyGalleryOwner;
