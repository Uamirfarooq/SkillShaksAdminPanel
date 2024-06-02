const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const videoRoutes = require("./routes/videoRoutes");
const dotenv = require("dotenv");
dotenv.config();
const { createPredefinedAdmin } = require("./controllers/adminController");
const PORT = process.env.PORT || 5000;

// Middlewares configuration
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", // specify your frontend URL
  credentials: true, // enable set cookie
};

app.use(cors(corsOptions));

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/video", videoRoutes);

app.listen(PORT, async () => {
  await connectDB();
  await createPredefinedAdmin();
  console.log(`Server is running on PORT ${PORT}`);
});
