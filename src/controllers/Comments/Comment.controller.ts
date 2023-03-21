import { Request, Response } from "express";
import CommentService from "../../services/Comments/comment.service";

class CommentController {
  static async createCommentController(req: Request, res: Response) {
    const userId = req.body.user.id;
    const { announceId } = req.params;
    const { message } = req.body;

    const newComment = await CommentService.createCommentsService(userId, announceId, { message });

    return res.status(201).json(newComment);
  }

  static async listCommentController(req: Request, res: Response) {
    const comments = await CommentService.listCommentService();

    return res.status(201).json(comments);
  }

  static async retrieveCommentController(req: Request, res: Response) {
    const { commentId } = req.params;

    const comment = await CommentService.retrieveCommentService(commentId);
    console.log(comment);

    return res.status(201).json(comment);
  }

  static async updateCommentController(req: Request, res: Response) {
    const { commentId } = req.params;
    const { message } = req.body;

    const updatedComment = await CommentService.updateCommentService(commentId, { message });

    return res.status(201).json(updatedComment);
  }

  static async deleteCommentController(req: Request, res: Response) {
    const { commentId } = req.params;

    const deletedComment = await CommentService.deleteCommentService(commentId);

    return res.status(201).json({ message: "Deleted with success!" });
  }
}

export default CommentController;
