const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to add a new course
router.post(
  "/addcourse",
  auth,
  upload.fields([{ name: "courseImage" }, { name: "authorImage" }]),
  addCourse
);

// Route to get a specific course by ID
router.get("/courses/:id", auth, getCourse);

// Route to get all courses
router.get("/courses", auth, getAllCourses);

// Route to update a course by ID
router.put(
  "/courses/:id",
  auth,
  upload.fields([{ name: "courseImage" }, { name: "authorImage" }]),
  updateCourse
);

// Route to delete a course by ID
router.delete("/courses/:id", auth, deleteCourse);

module.exports = router;
