import DB_connect from "./db/index.js";
import app from "./app.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

DB_connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`your App is Runnig At PORT  ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error is in main Index file",err);
  });
