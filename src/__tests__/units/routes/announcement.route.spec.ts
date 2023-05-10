import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { Announcement } from "../../../entities/Announcement";
import { User } from "../../../entities/User";
import { announcementRouteMock } from "../../mocks";
import SessionsService from "../../../services/Sessions/Sessions.service";
import { createSessionServiceMock } from "../../mocks/index";

describe("Unit test, Anouncement", () => {
  let announceRepo: Repository<Announcement>;
  let userRepo: Repository<User>;
  let connection: DataSource;
  let newAnnouncement = announcementRouteMock;
  let token = "";
  let userID = "";

  beforeAll(async () => {
    const { valid, base } = createSessionServiceMock;

    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        announceRepo = res.getRepository(Announcement);
        userRepo = res.getRepository(User);
      })
      .catch((err) => console.error("Error during Data Source initialization", err));

    await userRepo.save({ ...base });
    const result = await SessionsService.createSessionService(valid);
    token = result.token;
    userID = result.userId;
  });

  beforeEach(async () => {
    await announceRepo.remove(await announceRepo.find());
  });

  afterAll(async () => await connection.destroy());

  it("Shoul be able to create an Announcement", async () => {
    const response = await request(app)
      .post("/announcements")
      .set("Authorization", `Bearer ${token}`)
      .send(newAnnouncement.base);

    expect(response.body).toHaveProperty("id");
    expect(response.body.announceType).toEqual("Leilão");
  });
});
