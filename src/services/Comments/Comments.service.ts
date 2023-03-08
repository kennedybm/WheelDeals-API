import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement";
import { Comment } from "../../entities/Comment";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";

class CommentService {
  static async createCommentsService(data: any, id: any) {
    const commentManager = AppDataSource.getRepository(Comment);
    const userManager = AppDataSource.getRepository(User);
    const announcementManager = AppDataSource.getRepository(Announcement);

    const user = await userManager.findOneBy({
      id: data.user.id,
    });

    if (!user) {
      throw new AppError(401, "Invalid Token");
    }

    const announcement = await announcementManager.findOneBy({
      id: id,
    });

    if (!announcement) {
      throw new AppError(401, "Invalid id");
    }

    const comment = new Comment();
    comment.message = data.message;
    comment.announcement = announcement!;
    comment.user = user!;

    await commentManager.save(comment);

    return comment;
  }
}
export default CommentService;
