import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/Comment";

const verifyCommentOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const findCommentOwner = await commentRepository.findOne({
    where: {
      id: req.params.commentId,
    },
    relations: {
      user: true,
    },
  });

  if (!findCommentOwner) {
    throw new AppError(404, "Comment not found!");
  }

  const userId = findCommentOwner.user.id;
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(403, "Invalid Token!");
  }
  const tokenSplit = token.split(" ");

  jwt.verify(
    tokenSplit[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (decoded.id !== userId) {
        throw new AppError(403, "User do not have permission!");
      } else if (decoded.isActive === false) {
        throw new AppError(403, "Use do not have permission!");
      }
      next();
    }
  );
};
export default verifyCommentOwnerMiddleware;
