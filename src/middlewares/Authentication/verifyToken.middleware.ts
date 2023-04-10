import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function VerifyToken(req: Request, res: Response, next: NextFunction) {
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
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      req.body.user = {
        id: decoded.id,
        email: decoded.email,
      };

      if (!decoded.isActive) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      next();
    }
  );
}

export default VerifyToken;
