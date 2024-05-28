import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const DB_connect = async () => {
  try {
    await mongoose
      .connect(`${process.env.DB_URL}/${DB_NAME}`)
      .then((responce) => {
        console.log("MongoDB connected Successfully", responce.connection.host);
      })
      .catch((err) => {
        console.log("Database Error in connection function: ", err);
      });
  } catch (error) {
    console.error("Database Connection Error", error);
  }
};

export default DB_connect;
