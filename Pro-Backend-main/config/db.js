const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// const connection = mongoose.connection;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Datatbase connected succesfully");
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
  }
};



// connection.once('open', async () => {
//   try {
//     await connection.collection('courses').dropIndex('course_name_1');
//     console.log('Index dropped successfully');
//   } catch (error) {
//     console.error('Error dropping index:', error);
//   } finally {
//     connection.close();
//   }
// });

module.exports = connectDB;
