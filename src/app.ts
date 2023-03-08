import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import announcementsRoute from "./routers/announcements";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middlewares";
import usersRoute from "./routers/user";
import sessionRoute from "./routers/session";
import commentRoute from "./routers/comment";
import bidsRoute from "./routers/bids";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/users", usersRoute);
app.use("/login", sessionRoute);
app.use("/announcements", announcementsRoute);
app.use("/bids", bidsRoute);
app.use("/comments", commentRoute);

app.use(handleAppErrorMiddleware);

app.listen(process.env.PORT || 3001, () => {
  console.log("App runing");
});
export default app;
