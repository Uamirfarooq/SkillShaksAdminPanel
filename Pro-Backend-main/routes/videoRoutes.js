// const express = require("express");
// const multer = require("multer");
// const {
//   addVideo,
//   getVideos,
//   updateVideo,
//   deleteVideo,
// } = require("../controllers/videoController");
// const verifyAdmin = require("../middleware/auth");
// const router = express.Router();

// const upload = multer({ dest: "uploads/" });

// router.post(
//   "/admin/course/add-video/:id",
//   verifyAdmin,
//   upload.fields([{ name: "video" }, { name: "thumbnail" }]),
//   addVideo
// );

// // Route for fetching all videos of a course
// router.get("/admin/courses/:id/videos", verifyAdmin, getVideos);

// // Route for updating a video
// router.put("/admin/courses/videos/:id", verifyAdmin, updateVideo);

// // Route for deleting a video

// router.delete("/admin/courses/videos/:id", verifyAdmin, deleteVideo);

// module.exports = router;


const express = require("express");
const multer = require("multer");
const {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const verifyAdmin = require("../middleware/auth");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/admin/course/add-video/:id",
  verifyAdmin,
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  addVideo
);

// Route for fetching all videos of a course
router.get("/admin/courses/:id/videos", verifyAdmin, getVideos);

// Route for updating a video
router.put("/admin/courses/videos/:id", verifyAdmin, updateVideo);

// Route for deleting a video
router.delete("/admin/courses/videos/:id", verifyAdmin, deleteVideo);

module.exports = router;
