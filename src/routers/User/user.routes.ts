import { Router } from "express";
import UserController from "../../controllers/Users/Users.controller";
import VerifyAccountOwner from "../../middlewares/Authentication/verifyAccountOwner.middleware";
import VerifyToken from "../../middlewares/Authentication/verifyToken.middleware";
import { schemaValidation } from "../../middlewares/Schema/schemaValidation.middleware";
import { userSchema } from "../../schemas/user.schema";

const usersRoute = Router();

//create user
usersRoute.post("", schemaValidation(userSchema), UserController.createUserController);

//list all
usersRoute.get("", UserController.listUserController);

//retrieve by id
usersRoute.get("/:id", UserController.retrieveUserController);

//update by id
usersRoute.patch("/:id", VerifyAccountOwner, UserController.updateUserController);

//delete by id
usersRoute.delete("/:id", VerifyToken, VerifyAccountOwner, UserController.deleteUserController);

export default usersRoute;
