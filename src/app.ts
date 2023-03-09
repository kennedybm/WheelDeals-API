import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import announcementsRoute from "./routers/Announcement/announcements.routes";
import handleAppErrorMiddleware from "./middlewares/Errors/handleAppError.middlewares";
import usersRoute from "./routers/User/user.routes";
import sessionRoute from "./routers/Session/session.routes";
import commentRoute from "./routers/Comment/comment.routes";
import bidsRoute from "./routers/Bid/bids.routes";

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
