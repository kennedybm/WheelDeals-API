import { Request, Response } from "express";
import BidService from "../../services/Bids/Bids.service";

class BidController {
  static async createBidController(req: Request, res: Response) {
    const userId = req.body.user.id;
    const { value, announceId } = req.body;

    const newBid = await BidService.createBidService(userId, {
      value,
      announceId,
    });

    return res.status(201).json(newBid);
  }

  static async listAllBidController(req: Request, res: Response) {
    const bids = await BidService.listAllBidsService();

    return res.status(200).json(bids);
  }

  static async retrieveBidController(req: Request, res: Response) {
    const { bidId } = req.params;

    const retrievedBid = await BidService.retrieveBidService(bidId);

    return res.status(200).json(retrievedBid);
  }

  static async updateBidController(req: Request, res: Response) {
    const { bidId } = req.params;
    const { value } = req.body;

    const updatedBid = await BidService.updatedBidService(bidId, { value });

    return res.status(200).json(updatedBid);
  }

  static async deleteBidController(req: Request, res: Response) {
    const { bidId } = req.params;

    const deletedBid = await BidService.deleteBidService(bidId);

    return res.status(200).json({ message: "Deleted with success!" });
  }
}
export default BidController;
