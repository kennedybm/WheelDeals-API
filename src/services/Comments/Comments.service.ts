import { ObjectEncodingOptions } from "fs";
import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement";
import { Comment } from "../../entities/Comment";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { ICreateComment, IUpdateComment } from "../../interfaces/Comments";

class CommentService {
  static commentRepository = AppDataSource.getRepository(Comment);
  static userRepository = AppDataSource.getRepository(User);
  static announceRepository = AppDataSource.getRepository(Announcement);

  static async createCommentsService(
    userId: string,
    announceId: string,
    { message }: ICreateComment
  ): Promise<Comment | Object> {
    if (!announceId) {
      throw new AppError(400, "Announce ID is missing!");
    }

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new AppError(404, "User not found!");
    }

    const findAnnounce = await this.announceRepository.findOne({
      where: { id: announceId },
    });
    if (!findAnnounce) {
      throw new AppError(404, "Announce not found!");
    }

    const findUserComments = await this.announceRepository
      .createQueryBuilder("announce")
      .where("announce.id = :id", { id: announceId })
      .leftJoinAndSelect("announce.comments", "comments")
      .leftJoinAndSelect("comments.user", "user")
      .where("user.id = :id", { id: userId })
      .getOne();

    if (findUserComments != null) {
      throw new AppError(400, "Only permited one comment per announce!");
    }

    const newComment = this.commentRepository.create({
      message,
      user: findUser,
      announcement: findAnnounce,
    });

    await this.commentRepository.save(newComment);

    const joinResponse = await this.commentRepository
      .createQueryBuilder("comment")
      .where("comment.id = :id", { id: newComment.id })
      .leftJoinAndSelect("comment.announcement", "announce")
      .leftJoinAndSelect("comment.user", "user")
      .getOne();

    let responseObj = {
      id: joinResponse?.id,
      message: joinResponse?.message,
      createdAt: joinResponse?.createdAt,
      user: {
        id: joinResponse?.user.id,
        name: joinResponse?.user.name,
        email: joinResponse?.user.email,
      },
      announce: {
        id: joinResponse?.announcement.id,
      },
    };

    return responseObj;
  }

  static async listCommentService(): Promise<Comment[]> {
    const comments = await this.commentRepository.find();

    return comments;
  }

  static async retrieveCommentService(
    commentId: string
  ): Promise<Comment | Object> {
    const findComment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
      relations: {
        user: true,
        announcement: true,
      },
    });

    if (!findComment) {
      throw new AppError(404, "Comment not found!");
    }

    let commentResponse = {
      id: findComment.id,
      message: findComment.message,
      createdAt: findComment.createdAt,
      user: {
        id: findComment.user.id,
        name: findComment.user.name,
        email: findComment.user.email,
      },
      announce: {
        id: findComment.announcement.id,
      },
    };
    console.log(findComment);
    console.log(commentResponse);

    return commentResponse;
  }

  static async updateCommentService(
    commentId: string,
    { message }: IUpdateComment
  ): Promise<Comment> {
    if (message === "") {
      throw new AppError(406, "Message field cannot be empyt!");
    }

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!findComment) {
      throw new AppError(404, "Comment not found!");
    }

    return await this.commentRepository.save({
      ...findComment,
      message,
    });
  }

  static async deleteCommentService(commentId: string): Promise<boolean> {
    const findComment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!findComment) {
      throw new AppError(404, "Comment not found!");
    }

    await this.commentRepository.delete({ id: commentId });

    return true;
  }
}
export default CommentService;
