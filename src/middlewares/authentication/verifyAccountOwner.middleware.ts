import "dotenv/config";
import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/User";

const VerifyAccountOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userManager = AppDataSource.getRepository(User);

  const foundUser = await userManager.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!foundUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const userId = foundUser?.id;

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
};

export default VerifyAccountOwner;
