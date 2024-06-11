const express = require("express");
const multer = require("multer");
const verifyAdmin = require("../middleware/auth");
const {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { verify } = require("jsonwebtoken");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to add a new course
router.post(
  "/admin/add-course",
  verifyAdmin,
  upload.fields([{ name: "coverImage" }, { name: "avatar" }]),
  addCourse
);

// Route to get a specific course by ID
router.get("/admin/courses/:id", verifyAdmin, getCourse);

// Route to get all courses
router.get("/admin/courses", verifyAdmin, getAllCourses);

// Route to update a course by ID
router.put(
  "/admin/courses/:id",

  verifyAdmin,

  upload.fields([{ name: "coverImage" }, { name: "avatar" }]),
  updateCourse
);

// Route to delete a course by ID
router.delete("/admin/courses/:id", verifyAdmin, deleteCourse);

module.exports = router;
