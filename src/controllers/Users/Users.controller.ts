import { Request, Response } from "express";
import UserService from "../../services/Users/Users.service";

class UserController {
  static async createUserController(req: Request, res: Response) {
    const {
      name,
      email,
      description,
      password,
      cpf,
      cell,
      birthDate,
      accountType,
      cep,
      state,
      city,
      street,
      number,
      complement,
    } = req.body;

    const newUser = await UserService.createUsersService({
      name,
      email,
      description,
      password,
      cpf,
      cell,
      birthDate,
      accountType,
      cep,
      state,
      city,
      street,
      number,
      complement,
    });

    return res.status(201).json(newUser);
  }

  static async listUserController(req: Request, res: Response) {
    const users = await UserService.listUsersService();
    return res.status(200).json(users);
  }

  static async retrieveUserController(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserService.retrieveUserService(id);

    return res.status(200).json(user);
  }

  static async updateUserController(req: Request, res: Response) {
    const { id } = req.params;

    const updatedUser = await UserService.updateUserService(id, req.body);

    return res.status(200).json({ message: "User updated with sucess" });
  }

  static async deleteUserController(req: Request, res: Response) {
    await UserService.deleteUserService(req.params.id);

    return res.status(200).json({ message: "User deleted with success!" });
  }
}

export default UserController;
