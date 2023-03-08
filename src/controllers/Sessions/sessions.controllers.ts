import { Request, Response } from "express";
import SessionsService from "../../services/Sessions/Sessions.service";

class SessionController {
  static async createSession(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginObj = await SessionsService.createSessionService({
      email,
      password,
    });

    return res.status(200).json({ loginObj });
  }
}

export default SessionController;
