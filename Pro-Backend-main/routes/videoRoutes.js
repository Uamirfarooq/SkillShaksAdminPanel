const express = require("express");
const multer = require("multer");
const { addVideo } = require("../controllers/videoController");
const auth = require("../middleware/auth");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/add-video/:id",
  auth,
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  addVideo
);

module.exports = router;
