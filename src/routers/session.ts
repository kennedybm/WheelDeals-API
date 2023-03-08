import { Router } from "express";
import SessionController from "../controllers/Sessions/sessions.controllers";

const sessionRoute = Router();

sessionRoute.post("", SessionController.createSession);

export default sessionRoute;
