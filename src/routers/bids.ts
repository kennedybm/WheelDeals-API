import { Router } from "express";
import BidController from "../controllers/Bids/Bids.controllers";
import VerifyToken from "../middlewares/authentication/verifyToken.middleware";
import verifyBidOwnerMiddleware from "../middlewares/authentication/verifyBidOwner.middleware";

const bidsRoute = Router();

//create bid
bidsRoute.post("", VerifyToken, BidController.createBidController);

//list All
bidsRoute.get("", BidController.listAllBidController);

//retrieve by id
bidsRoute.get(
  "/:bidId",
  verifyBidOwnerMiddleware,
  BidController.retrieveBidController
);

//update by id
bidsRoute.patch(
  "/:bidId",
  verifyBidOwnerMiddleware,
  BidController.updateBidController
);

//delete by id
bidsRoute.delete(
  "/:bidId",
  verifyBidOwnerMiddleware,
  BidController.deleteBidController
);

export default bidsRoute;
