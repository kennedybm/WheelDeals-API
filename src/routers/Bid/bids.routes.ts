import { Router } from "express";
import BidController from "../../controllers/Bids/bid.controllers";
import VerifyToken from "../../middlewares/authentication/verifyToken.middleware";
import verifyBidOwnerMiddleware from "../../middlewares/authentication/verifyBidOwner.middleware";
import { schemaValidation } from "../../middlewares/Schema/schemaValidation.middleware";
import { bidSchema } from "../../schemas/bid.schema";

const bidsRoute = Router();

//create bid
bidsRoute.post(
  "/:announceId",
  VerifyToken,
  schemaValidation(bidSchema),
  BidController.createBidController
);

//list All
bidsRoute.get("", BidController.listAllBidController);

//retrieve by id
bidsRoute.get("/:bidId", BidController.retrieveBidController);

//update by id
bidsRoute.patch("/:bidId", verifyBidOwnerMiddleware, BidController.updateBidController);

//delete by id
bidsRoute.delete("/:bidId", verifyBidOwnerMiddleware, BidController.deleteBidController);

export default bidsRoute;
