import { Router } from "express";
import SessionController from "../../controllers/Sessions/sessions.controllers";
import { schemaValidation } from "../../middlewares/Schema/schemaValidation.middleware";
import { sessionSchema } from "../../schemas/session.schema";

const sessionRoute = Router();

sessionRoute.post(
  "",
  schemaValidation(sessionSchema),
  SessionController.createSession
);

export default sessionRoute;
