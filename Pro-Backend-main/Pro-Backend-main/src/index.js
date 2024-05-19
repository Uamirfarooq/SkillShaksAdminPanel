import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import DB_connect from "./db/index.js";
import app from "./app.js";


DB_connect().then(() => {

    app.listen(process.env.PORT, () => {
      console.log(`your App is Runnig At PORT  ${process.env.PORT}`);
    });
  })
  .catch((err) => {});

