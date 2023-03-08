import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILoginUser } from "../../interfaces/Sessions";

class SessionsService {
  static async createSessionService({ email, password }: ILoginUser) {
    const userRespository = AppDataSource.getRepository(User);

    const user = await userRespository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError(400, "Email or password invalid!");
    }

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) {
      throw new AppError(400, "Email or password invalid!");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isActive: user.is_active,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return { token, userId: user.id };
  }
}

export default SessionsService;
