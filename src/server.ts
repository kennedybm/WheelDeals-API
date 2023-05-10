import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log("App runing");
  });
};

init();
