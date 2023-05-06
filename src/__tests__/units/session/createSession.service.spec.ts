import "dotenv/config";
import { JwtPayload, decode } from "jsonwebtoken";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { User } from "../../../entities/User";
import { AppError } from "../../../errors/AppError";
import { createSessionServiceMock } from "../../mocks";
import SessionsService from "../../../services/Sessions/Sessions.service";

describe("Unit test, createSessionService functionalites", () => {
  let userRepo: Repository<User>;
  let connection: DataSource;

  beforeAll(async () => {
    process.env.SECRET_KEY = createSessionServiceMock.secretKey;
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        userRepo = res.getRepository(User);
      })
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    await userRepo.remove(await userRepo.find());
  });

  afterAll(async () => await connection.destroy());

  it("Should be able to create a token - Has a valid payload", async () => {
    const { base, valid, invalidEmail } = createSessionServiceMock;
    const { id, email, is_active } = await userRepo.save({ ...base });

    const result = await SessionsService.createSessionService(valid);
    expect(result).toStrictEqual(expect.any(Object));
  });

  it("Should be able to throw error - Invalid Email", async () => {
    const { invalidEmail } = createSessionServiceMock;

    try {
      await SessionsService.createSessionService(invalidEmail);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("message", "Email or password invalid!");
    }
  });

  it("Should be able to throw error - Invalid Password", async () => {
    const { invalidPassword } = createSessionServiceMock;

    try {
      await SessionsService.createSessionService(invalidPassword);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("message", "Email or password invalid!");
    }
  });
});
