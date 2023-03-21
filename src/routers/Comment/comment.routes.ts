import { Router } from "express";
import CommentController from "../../controllers/Comments/Comment.controller";
import VerifyToken from "../../middlewares/Authentication/verifyToken.middleware";
import verifyCommentOwnerMiddleware from "../../middlewares/Authentication/verifyCommentOwner.middleware";

const commentRoute = Router();

//create comment
commentRoute.post("/:announceId", VerifyToken, CommentController.createCommentController);

//list all comments
commentRoute.get("", CommentController.listCommentController);

//retrieve by id
commentRoute.get("/:announceId", CommentController.retrieveCommentController);

//update by id
commentRoute.patch(
  "/:commentId",
  verifyCommentOwnerMiddleware,
  CommentController.updateCommentController
);

//delete by id
commentRoute.delete(
  "/:commentId",
  verifyCommentOwnerMiddleware,
  CommentController.deleteCommentController
);

export default commentRoute;
