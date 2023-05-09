import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { Bid } from "../../../entities/Bid";
import { User } from "../../../entities/User";
import { Announcement } from "../../../entities/Announcement";
import { bidRouteMock, createSessionServiceMock, announcementRouteMock } from "../../mocks";
import SessionsService from "../../../services/Sessions/Sessions.service";

describe("Unit test, Gallery", () => {
  let connection: DataSource;
  let bidRepo: Repository<Bid>;
  let userRepo: Repository<User>;
  let announcementRepo: Repository<Announcement>;
  let token = "";
  let announceId = "";
  let userId = "";

  beforeAll(async () => {
    const { valid, base } = createSessionServiceMock;

    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        bidRepo = res.getRepository(Bid);
        userRepo = res.getRepository(User);
        announcementRepo = res.getRepository(Announcement);
      })
      .catch((err) => console.error("Error during Data Source initialization", err));

    const newUser = await userRepo.save({ ...base });
    const newSession = await SessionsService.createSessionService(valid);

    token = newSession.token;
    userId = newSession.userId;

    const newAnnouncement = announcementRepo.create({
      ...announcementRouteMock.base,
      user: newUser,
    });
    await announcementRepo.save(newAnnouncement);

    announceId = newAnnouncement.id;
  });

  beforeEach(async () => {
    await bidRepo.remove(await bidRepo.find());
  });

  afterAll(async () => await connection.destroy());

  it("Shoul be able to create an Gallery", async () => {
    const response = await request(app)
      .post(`/bids/${announceId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(bidRouteMock.base);

    expect(response.body).toHaveProperty("id");
  });

  it("Shoul be able to return status code 201-created", async () => {
    const response = await request(app)
      .post(`/bids/${announceId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(bidRouteMock.base);

    expect(response.statusCode).toEqual(201);
  });
});
