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
    const { base, valid } = createSessionServiceMock;
    const { id, email, is_active } = await userRepo.save({ ...base });

    const result = await SessionsService.createSessionService(valid);
    console.log(result);
    expect(result).toStrictEqual(expect.any(Object));
  });
});
