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
  "/admin/addcourse",
  auth,
  upload.fields([{ name: "coverImage" }, { name: "avatar" }]),
  addCourse
);

// Route to get a specific course by ID
router.get("/admin/getcourse/:id", auth, getCourse);

// Route to get all courses
router.get("/admin/getcourse", auth, getAllCourses);

// Route to update a course by ID
router.put(
  "/courses/:id",
  auth,
  upload.fields([{ name: "coverImage" }, { name: "avatar" }]),
  updateCourse
);

// Route to delete a course by ID
router.delete("/delete-course/:id",  deleteCourse);

module.exports = router;
