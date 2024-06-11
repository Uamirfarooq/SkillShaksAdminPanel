// const Video = require("../models/Video");
// const Course = require("../models/Course");
// const fs = require("fs");
// const { uploadFile, deleteFile } = require("../services/s3Services");
// const createError = require("../utils/error");

// const addVideo = async (req, res, next) => {
//   const { id: course_id } = req.params;
//   const { title, description, week } = req.body;
//   const video = req.files.video ? req.files.video[0] : null;
//   const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;

//   try {
//     // Check if course_id is provided
//     if (!course_id) {
//       return next(createError(400, "Course ID is required"));
//     }

//     // Check if the course with the given course_id exists
//     const course = await Course.findById(course_id);
//     if (!course) {
//       return next(createError(404, "Course not found"));
//     }

//     // Check if video and thumbnail are provided
//     if (!video || !thumbnail) {
//       return next(createError(400, "Video and Thumbnail are required"));
//     }

//     // Upload video to S3
//     const videoUpload = await uploadFile(video, process.env.AWS_BUCKET_VIDEOS);
//     const thumbnailUpload = await uploadFile(
//       thumbnail,
//       process.env.AWS_BUCKET_THUMBNAILS
//     );

//     // Delete the video file from local storage
//     fs.unlinkSync(video.path);
//     fs.unlinkSync(thumbnail.path);

//     // Create new video object
//     const newVideo = new Video({
//       title,
//       description,
//       course_id,
//       week,
//       video_url: videoUpload.Location,
//       thumbnail_url: thumbnailUpload.Location,
//     });

//     await newVideo.save();

//     // Add the video ID to the course's video_ids array
//     course.video_ids.push(newVideo._id);
//     await course.save();

//     res.status(201).json({ success: true, data: newVideo });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({ success: false, errors });
//     }
//     next(createError(500, "Error uploading video"));
//   }
// };

// // Get All videos Controller

// const getVideos = async (req, res, next) => {
//   const { id: course_id } = req.params;

//   try {
//     // Check if course_id is provided
//     if (!course_id) {
//       return next(createError(400, "Course ID is required"));
//     }

//     // Check if the course with the given course_id exists
//     const course = await Course.findById(course_id).populate("video_ids");
//     if (!course) {
//       return next(createError(404, "Course not found"));
//     }

//     res.status(200).json({ success: true, data: course.video_ids });
//   } catch (error) {
//     next(createError(500, "Error fetching videos"));
//   }
// };

// // Update video Controller

// const updateVideo = async (req, res, next) => {
//   const { id: video_id } = req.params;
//   const { title, description, week } = req.body;

//   try {
//     // Check if video_id is provided
//     if (!video_id) {
//       return next(createError(400, "Video ID is required"));
//     }

//     // Check if the video with the given video_id exists
//     const video = await Video.findById(video_id);
//     if (!video) {
//       return next(createError(404, "Video not found"));
//     }

//     // Update video details
//     video.title = title || video.title;
//     video.description = description || video.description;
//     video.week = week || video.week;

//     await video.save();

//     res.status(200).json({ success: true, data: video });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({ success: false, errors });
//     }
//     next(createError(500, "Error updating video"));
//   }
// };

// // Delete Video Controller

// const deleteVideo = async (req, res, next) => {
//   const { id: video_id } = req.params;

//   try {
//     // Check if video_id is provided
//     if (!video_id) {
//       return next(createError(400, "Video ID is required"));
//     }

//     // Check if the video with the given video_id exists
//     const videoToDelete = await Video.findById(video_id);
//     if (!videoToDelete) {
//       return next(createError(404, "Video not found"));
//     }

//     // Delete video from AWS S3
//     await deleteFile(videoToDelete.video_url);
//     await deleteFile(videoToDelete.thumbnail_url);

//     // Find and remove the video ID from its associated course
//     const course = await Course.findById(videoToDelete.course_id);
//     if (course) {
//       course.video_ids = course.video_ids.filter(
//         (id) => id.toString() !== video_id
//       );
//       await course.save();
//     }

//     // Finally, delete the video document
//     await Video.findByIdAndDelete(video_id);

//     res
//       .status(200)
//       .json({ success: true, message: "Video deleted successfully" });
//   } catch (error) {
//     next(createError(500, "Error deleting video"));
//   }
// };

// module.exports = { addVideo, updateVideo, getVideos, deleteVideo };


// const Video = require("../models/Video");
const Video = require("../models/Video");
const Course = require("../models/Course");
const fs = require("fs");
const { uploadFile, deleteFile } = require("../services/s3Services");
const createError = require("../utils/error");

// Add Video Controller
const addVideo = async (req, res, next) => {
  const { id: course_id } = req.params;
  const { title, description, week } = req.body;
  const video = req.files.video ? req.files.video[0] : null;
  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;

  console.log("Received request body:", req.body);
  console.log("Received files:", req.files);

  try {
    if (!course_id) {
      return next(createError(400, "Course ID is required"));
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return next(createError(404, "Course not found"));
    }

    if (!video || !thumbnail) {
      return next(createError(400, "Video and Thumbnail are required"));
    }

    const videoUpload = await uploadFile(video, process.env.AWS_BUCKET_VIDEOS);
    const thumbnailUpload = await uploadFile(thumbnail, process.env.AWS_BUCKET_THUMBNAILS);

    fs.unlinkSync(video.path);
    fs.unlinkSync(thumbnail.path);

    const newVideo = new Video({
      title,
      description,
      course_id,
      week,
      video_url: videoUpload.Location,
      thumbnail_url: thumbnailUpload.Location,
    });

    await newVideo.save();

    course.video_ids.push(newVideo._id);
    await course.save();

    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    console.error("Error adding video:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next(createError(500, "Error uploading video"));
  }
};

// Get All Videos Controller
const getVideos = async (req, res, next) => {
  const { id: course_id } = req.params;

  try {
    if (!course_id) {
      return next(createError(400, "Course ID is required"));
    }

    const course = await Course.findById(course_id).populate("video_ids");
    if (!course) {
      return next(createError(404, "Course not found"));
    }

    res.status(200).json({ success: true, data: course.video_ids });
  } catch (error) {
    next(createError(500, "Error fetching videos"));
  }
};

// Update Video Controller
const updateVideo = async (req, res, next) => {
  const { id: video_id } = req.params;
  const { title, description, week } = req.body;

  try {
    if (!video_id) {
      return next(createError(400, "Video ID is required"));
    }

    const video = await Video.findById(video_id);
    if (!video) {
      return next(createError(404, "Video not found"));
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.week = week || video.week;

    await video.save();

    res.status(200).json({ success: true, data: video });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next(createError(500, "Error updating video"));
  }
};

// Delete Video Controller
const deleteVideo = async (req, res, next) => {
  const { id: video_id } = req.params;

  try {
    if (!video_id) {
      return next(createError(400, "Video ID is required"));
    }

    const videoToDelete = await Video.findById(video_id);
    if (!videoToDelete) {
      return next(createError(404, "Video not found"));
    }

    await deleteFile(videoToDelete.video_url);
    await deleteFile(videoToDelete.thumbnail_url);

    const course = await Course.findById(videoToDelete.course_id);
    if (course) {
      course.video_ids = course.video_ids.filter(id => id.toString() !== video_id);
      await course.save();
    }

    await Video.findByIdAndDelete(video_id);

    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    next(createError(500, "Error deleting video"));
  }
};

module.exports = { addVideo, getVideos, updateVideo, deleteVideo };
