import { Router } from "express";
import UserController from "../controllers/Users/Users.controller";
import VerifyAccountOwner from "../middlewares/authentication/verifyAccountOwner.middleware";
import VerifyToken from "../middlewares/authentication/verifyToken.middleware";

const usersRoute = Router();

usersRoute.get("", UserController.listUserController);
usersRoute.post("", UserController.createUserController);
usersRoute.get("/:id", UserController.retrieveUserController);
usersRoute.patch(
  "/:id",
  VerifyAccountOwner,
  UserController.updateUserController
);
usersRoute.delete(
  "/:id",
  VerifyToken,
  VerifyAccountOwner,
  UserController.deleteUserController
);

export default usersRoute;
