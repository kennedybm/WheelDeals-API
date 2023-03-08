import { Router } from "express";
import CommentController from "../controllers/Comments/Comment.controller";
import VerifyToken from "../middlewares/authentication/verifyToken.middleware";

const commentRoute = Router();

commentRoute.post(
  "/:id",
  VerifyToken,
  CommentController.createCommentController
);

export default commentRoute;
