import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { userRouteMock } from "../../mocks";

describe("Unit test, Users", () => {
  let userRepo: Repository<User>;
  let connection: DataSource;
  const { base } = userRouteMock;

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

  it("Shoul be able to create an User", async () => {
    const response = await request(app).post("/users").send(base);

    expect(response.body.map((user: any) => user.name)).toEqual(["joao"]);
  });

  it("Shoul be able to return status code 201-created", async () => {
    const response = await request(app).post("/users").send(base);

    expect(response.statusCode).toEqual(201);
  });
});
