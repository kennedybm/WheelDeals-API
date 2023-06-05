import AppDataSource from "../../../../data-source";
import app from "../../../../app";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../../entities/User";
import UserService from "../../../../services/Users/Users.service";
import { userRouteMock } from "../../../mocks";

describe("Unit test, User Service", () => {
  let userRepo: Repository<User>;
  let connection: DataSource;
  const { serviceMock } = userRouteMock;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        userRepo = res.getRepository(User);
      })
      .catch((err) => console.error("Error during Data Source initialization", err));
  });

  beforeEach(async () => {
    await userRepo.remove(await userRepo.find());
  });

  afterAll(async () => await connection.destroy());

  it("Success - should be able to create an user", async () => {
    const response = await UserService.createUsersService(serviceMock);

    console.log(response);

    response.map((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("email");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("cpf");
      expect(item).toHaveProperty("cell");
      expect(item).toHaveProperty("birthDate");
      expect(item).toHaveProperty("accountType");
      expect(item).toHaveProperty("cep");
      expect(item).toHaveProperty("state");
      expect(item).toHaveProperty("city");
      expect(item).toHaveProperty("street");
      expect(item).toHaveProperty("number");
      expect(item).toHaveProperty("complement");
      expect(item).toHaveProperty("is_active");
      expect(item).not.toHaveProperty("password");
    });
  });
});
