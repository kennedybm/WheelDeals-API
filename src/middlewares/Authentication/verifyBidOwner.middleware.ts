import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { Bid } from "../../entities/Bid";
import AppDataSource from "../../data-source";

const verifyBidOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bidRepository = AppDataSource.getRepository(Bid);

  const foundBidUser = await bidRepository.findOne({
    relations: {
      user: true,
    },
    where: {
      id: req.params.bidId,
    },
  });

  if (!foundBidUser) {
    throw new AppError(404, "Bid not found!");
  }

  const userId = foundBidUser?.user.id;

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
      }
      next();
    }
  );
};
export default verifyBidOwnerMiddleware;
