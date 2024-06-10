const Course = require("../models/Course");
const Video = require("../models/Video");
const dotenv = require("dotenv");
const fs = require("fs");
const { uploadFile, deleteFile } = require("../services/s3Services");
const createError = require("../utils/error");

dotenv.config();

const addCourse = async (req, res, next) => {
  const { course_name, course_details, author, level, category, price } =
    req.body;
  const coverImage =
    req.files && req.files.coverImage ? req.files.coverImage[0] : null;
  const avatar = req.files && req.files.avatar ? req.files.avatar[0] : null;

  try {
    let coverImageUpload, authorImageUpload;

    if (coverImage) {
      coverImageUpload = await uploadFile(
        coverImage,
        process.env.AWS_BUCKET_IMAGES
      );
      fs.unlinkSync(coverImage.path); // Delete the file from local storage
    }

    if (avatar) {
      authorImageUpload = await uploadFile(
        avatar,
        process.env.AWS_BUCKET_IMAGES
      );
      fs.unlinkSync(avatar.path); // Delete the file from local storage
    }

    const newCourse = new Course({
      course_name,
      course_details,
      author,
      level,
      category,
      price,
      coverImage: coverImageUpload ? coverImageUpload.Location : null,
      avatar: authorImageUpload ? authorImageUpload.Location : null,
    });

    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next(createError(500, "Error uploading files"));
  }
};

const getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return next(createError(404, "Course not found"));
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(createError(500, "Error getting course"));
  }
};

const updateCourse = async (req, res, next) => {
  const { course_name, course_details, author, level, category } = req.body;
  const courseId = req.params.id;

  const coverImage =
    req.files && req.files.coverImage ? req.files.coverImage[0] : null;
  const avatar = req.files && req.files.avatar ? req.files.avatar[0] : null;

  try {
    let updatedCourse = await Course.findById(courseId);
    if (!updatedCourse) {
      return next(createError(404, "Course not found"));
    }

    // Update fields only if they are provided
    if (course_name) updatedCourse.course_name = course_name;
    if (course_details) updatedCourse.course_details = course_details;
    if (author) updatedCourse.author = author;
    if (level) updatedCourse.level = level;
    if (category) updatedCourse.category = category;

    // Handle course image update
    if (coverImage) {
      await deleteFile(updatedCourse.coverImage);
      const coverImageUpload = await uploadFile(
        coverImage,
        process.env.AWS_BUCKET_IMAGES
      );
      updatedCourse.coverImage = coverImageUpload.Location;
      fs.unlinkSync(coverImage.path); // Delete the file from local storage
    }

    // Handle author image update
    if (avatar) {
      await deleteFile(updatedCourse.avatar);
      const avatarUpload = await uploadFile(
        avatar,
        process.env.AWS_BUCKET_IMAGES
      );
      updatedCourse.avatar = avatarUpload.Location;
      fs.unlinkSync(avatar.path); // Delete the file from local storage
    }

    await updatedCourse.save();
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next(createError(500, "Error updating course"));
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(createError(500, "Error fetching courses"));
  }
};

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;

  try {
    const courseToDelete = await Course.findById(courseId);
    if (!courseToDelete) {
      return next(createError(404, "Course not found"));
    }

    // Delete images from AWS S3 before deleting the course
    if (courseToDelete.coverImage) {
      await deleteFile(courseToDelete.coverImage);
    }
    if (courseToDelete.avatar) {
      await deleteFile(courseToDelete.avatar);
    }

    // Find and delete all videos associated with the course
    const videosToDelete = await Video.find({ course_id: courseId });
    for (let video of videosToDelete) {
      if (video.video_url) {
        await deleteFile(video.video_url);
      }
      await Video.findByIdAndDelete(video._id);
    }

    // Finally, delete the course
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({
      success: true,
      message: "Course and associated videos deleted successfully",
    });
  } catch (error) {
    next(createError(500, "Error deleting course and associated videos"));
  }
};

module.exports = {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
