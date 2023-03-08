import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcryptjs";
import { ICreateUser, IUpdateUser } from "../../interfaces/Users";

class UserService {
  static async createUsersService({
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
  }: ICreateUser): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.find();

    findUser.map((user) => {
      if (user.email === email) {
        throw new AppError(400, "Email is already been used");
      } else if (user.cpf === cpf) {
        throw new AppError(400, "Cpf is already registered");
      } else if (user.cell === cell) {
        throw new AppError(400, "Cellphone number is already registered");
      }
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = userRepository.create({
      name,
      email,
      description,
      password: hashedPassword,
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

    await userRepository.save(newUser);

    const userResponse = await userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .select("user.id")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.description")
      .addSelect("user.cpf")
      .addSelect("user.cell")
      .addSelect("user.birthDate")
      .addSelect("user.accountType")
      .addSelect("user.cep")
      .addSelect("user.state")
      .addSelect("user.city")
      .addSelect("user.street")
      .addSelect("user.number")
      .addSelect("user.complement")
      .addSelect("user.is_active")
      .getMany();

    return userResponse;
  }

  static async listUsersService(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const userResponse = await userRepository
      .createQueryBuilder("user")
      .select("user.id")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.description")
      .addSelect("user.cell")
      .addSelect("user.accountType")
      .addSelect("user.is_active")
      .leftJoinAndSelect("user.announcements", "announce")
      .getMany();

    return userResponse;
  }

  static async retrieveUserService(id: string): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    const userResponse = await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .select("user.id")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.description")
      .addSelect("user.cell")
      .addSelect("user.accountType")
      .leftJoinAndSelect("user.announcements", "announcements")
      .getMany();

    return userResponse;
  }

  static async updateUserService(id: string, data: IUpdateUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.find();

    const user = findUser.find((user) => user.id === id);
    if (!user) {
      throw new AppError(404, "User not found!");
    }

    let pwdMatch = false;
    if (data.password) {
      pwdMatch = await bcrypt.compare(data.password, user.password);
    }

    if (pwdMatch) {
      throw new AppError(400, "Password already in use!");
    }

    let newPassword = "";
    if (data.password) {
      newPassword = await bcrypt.hash(data.password, 12);
      data.password = newPassword;
    }

    findUser.map((user) => {
      if (user.name === data.name) {
        throw new AppError(400, `Name: ${data.name}, already in use!`);
      } else if (user.email === data.email) {
        throw new AppError(400, `Email: ${data.email}, already in use!`);
      } else if (user.cpf === data.cpf) {
        throw new AppError(400, `Cpf already in use!`);
      } else if (user.cell === data.cell) {
        throw new AppError(400, `Cell number already in use!`);
      } else if (user.birthDate === data.birthdate) {
        throw new AppError(400, `Birthdate already in use!`);
      } else if (user.cep === data.cep) {
        throw new AppError(400, `Cep already in use!`);
      } else if (user.state === data.state) {
        throw new AppError(400, `State already in use!`);
      } else if (user.city === data.city) {
        throw new AppError(400, `City already in use!`);
      } else if (user.street === data.street) {
        throw new AppError(400, `Street already in use!`);
      } else if (user.number === data.number) {
        throw new AppError(400, `Number already in use!`);
      } else if (user.complement === data.complement) {
        throw new AppError(400, `Complement already in use!`);
      } else if (user.is_active === data.is_active) {
        throw new AppError(400, `User status already is ${user.is_active}!`);
      }
    });

    return userRepository.save({
      ...user,
      ...data,
    });
  }

  static async deleteUserService(id: string): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    await userRepository.delete({ id: id });

    return true;
  }
}
export default UserService;
