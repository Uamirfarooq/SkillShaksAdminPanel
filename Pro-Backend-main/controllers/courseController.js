const Course = require("../models/Course");
const Video = require("../models/Video");
const dotenv = require("dotenv");
dotenv.config();
const { uploadFile, deleteFile } = require("../services/s3Services");

// Define the addCourse controller function
const addCourse = async (req, res) => {
  const { course_name, course_details, author, level, category } = req.body;
  const coverImage = req.files.coverImage[0];
  const avatar = req.files.avatar[0];

  try {
    const courseImageUpload = await uploadFile(
      coverImage,
      process.env.AWS_BUCKET_IMAGES,  // Assuming this is your correct environment variable for cover images bucket
    );
    const authorImageUpload = await uploadFile(
      avatar,
      process.env.AWS_BUCKET_IMAGES // Assuming this is your correct environment variable for avatar images bucket
    );

    const newCourse = new Course({
      course_name,
      course_details,
      author,
      level,
      category,
      coverImage: courseImageUpload.Location,
      avatar: authorImageUpload.Location,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading files" });
  }
};

// Controller function for get one course

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting course" });
  }
};

// Controller funciton for updating the course

const updateCourse = async (req, res) => {
  const { course_name, course_details, author, level, category } = req.body;
  const courseId = req.params.id;

  // console.log('req.files:', req.files); // Debug log for req.files

  const coverImage =
    req.files && req.files.coverImage ? req.files.coverImage[0] : null;
  const avatar =
    req.files && req.files.avatar ? req.files.avatar[0] : null;

  try {
    let updatedCourse = await Course.findById(courseId);
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
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
    }

    // Handle author image update
    if (avatar) {
      await deleteFile(updatedCourse.avatar);
      const avatarUpload = await uploadFile(
        avatar,
        process.env.AWS_BUCKET_IMAGES
      );
      updatedCourse.avatar = avatarUpload.Location;
    }

    await updatedCourse.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating course" });
  }
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(201).json({ data: courses });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Controller function for deleting the course

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const courseToDelete = await Course.findById(courseId);
    if (!courseToDelete) {
      return res.status(404).json({ error: "Course not found" });
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
    res
      .status(200)
      .json({ message: "Course and associated videos deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error deleting course and associated videos" });
  }
};

// Export the addCourse function using the exports object
module.exports = {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
