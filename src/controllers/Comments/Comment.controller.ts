import { Request, Response } from "express";
import CommentService from "../../services/Comments/Comments.service";

class CommentController {
  static async createCommentController(req: Request, res: Response) {
    const userId = req.body.user.id;
    const { announceId } = req.params;
    const { message } = req.body;

    const newComment = await CommentService.createCommentsService(
      userId,
      announceId,
      { message }
    );

    return res.status(201).json(newComment);
  }
}

export default CommentController;
