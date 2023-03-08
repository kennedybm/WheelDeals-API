import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Bid } from "../../entities/Bid";
import { Announcement } from "../../entities/Announcement";
import { User } from "../../entities/User";
import { ICreateBid, IUpdateBid } from "../../interfaces/Bids";
import { date, string } from "yup";

class BidService {
  static bidRepository = AppDataSource.getRepository(Bid);
  static userRepository = AppDataSource.getRepository(User);
  static announceRepository = AppDataSource.getRepository(Announcement);

  static async createBidService(
    userId: string,
    { value, announceId }: ICreateBid
  ): Promise<Bid | Object> {
    if (!announceId) {
      throw new AppError(400, "Announce ID is missing!");
    }

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new AppError(404, "User not found!");
    }

    const findAnnounce = await this.announceRepository.findOne({
      where: { id: announceId },
    });
    if (!findAnnounce) {
      throw new AppError(404, "Announce not found!");
    }

    const findUsersBids = await this.announceRepository
      .createQueryBuilder("announce")
      .where("announce.id = :id", { id: announceId })
      .leftJoinAndSelect("announce.bids", "bid")
      .leftJoinAndSelect("bid.user", "user")
      .where("user.id = :id", { id: userId })
      .getOne();

    if (findUsersBids != null) {
      throw new AppError(400, "Only permited one bid per announce!");
    }

    const newBid = this.bidRepository.create({
      value,
      user: findUser,
      announcement: findAnnounce,
    });

    await this.bidRepository.save(newBid);

    let responseObj = {};

    const joinResponse = await this.bidRepository
      .createQueryBuilder("bid")
      .where("bid.id = :id", { id: newBid.id })
      .leftJoinAndSelect("bid.announcement", "announce")
      .getOne();

    responseObj = {
      id: joinResponse?.id,
      value: joinResponse?.value,
      createdAt: joinResponse?.createdAt,
      announce: {
        id: joinResponse?.announcement.id,
      },
    };

    return responseObj;
  }

  static async listAllBidsService(): Promise<Bid[]> {
    const bids = await this.bidRepository.find();

    return bids;
  }

  static async retrieveBidService(bidId: string): Promise<Bid | Object> {
    const verifyBid = await this.bidRepository.findOne({
      where: { id: bidId },
    });
    if (!verifyBid) {
      throw new AppError(404, "Bid not found!");
    }

    const retrievedBid = await this.bidRepository
      .createQueryBuilder("bid")
      .where("bid.id = :id", { id: bidId })
      .leftJoinAndSelect("bid.announcement", "annonunce")
      .getOne();

    let response = {
      id: retrievedBid?.id,
      value: retrievedBid?.value,
      createdAt: retrievedBid?.createdAt,
      announce: {
        id: retrievedBid?.announcement.id,
      },
    };

    return response;
  }

  static async updatedBidService(
    bidId: string,
    { value }: IUpdateBid
  ): Promise<Bid | boolean> {
    const verifyBid = await this.bidRepository.findOne({
      where: { id: bidId },
    });
    if (!verifyBid) {
      throw new AppError(404, "Bid not found!");
    }

    if (verifyBid.value == value) {
      throw new AppError(400, `Bid already registerd with: ${verifyBid.value}`);
    }

    const currentDate = new Intl.DateTimeFormat("pt-BR").format(new Date());
    const createdAt = new Intl.DateTimeFormat("pt-BR").format(
      verifyBid.createdAt
    );

    if (currentDate.split("/")[0] <= createdAt.split("/")[0]) {
      throw new AppError(
        400,
        "Bid cannot be updated on the same day that was created!"
      );
    }

    return await this.bidRepository.save({
      ...verifyBid,
      value,
    });
  }

  static async deleteBidService(bidId: string): Promise<boolean> {
    const verifyBid = await this.bidRepository.findOne({
      where: { id: bidId },
    });

    if (!verifyBid) {
      throw new AppError(404, "Bid not found!");
    }

    await this.bidRepository.delete({ id: bidId });

    return true;
  }
}
export default BidService;
