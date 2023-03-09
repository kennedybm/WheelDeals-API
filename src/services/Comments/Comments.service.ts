import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement";
import { Comment } from "../../entities/Comment";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { ICreateComment } from "../../interfaces/Comments";

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
}
export default CommentService;
