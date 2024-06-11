const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const videoRoutes = require("./routes/videoRoutes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middlewares configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // specify your frontend URL
  credentials: true, // enable set cookie
};

app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth", courseRoutes);
app.use("/api/v1/auth", videoRoutes);

// ERROR HANDLING MIDDLEWARE

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res
    .status(errStatus)
    .json({ success: false, status: errStatus, message: errMessage }); // stack: err.stack
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
