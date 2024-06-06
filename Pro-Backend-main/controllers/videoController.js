const Video = require("../models/Video");
const Course = require("../models/Course");
const fs = require('fs')
const { uploadFile, deleteFile } = require("../services/s3Services");

const addVideo = async (req, res) => {
  const { id: course_id } = req.params;
  const { title, description, week } = req.body;
  const video = req.files.video[0]
  const thumbnail = req.files.thumbnail[0]

  try {
    // Check if course_id is provided
    if (!course_id) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Check if the course with the given course_id exists
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Upload video to S3
    const videoUpload = await uploadFile(video, process.env.AWS_BUCKET_VIDEOS);
    const thumbnailUpload = await uploadFile(thumbnail, process.env.AWS_BUCKET_THUMBNAILS)

    // Delete the video file from local storage
    fs.unlinkSync(video.path);
    fs.unlinkSync(thumbnail.path)

    // Create new video object
    const newVideo = new Video({
      title,
      description,
      course_id,
      week,
      video_url: videoUpload.Location,
      thumbnail_url: thumbnailUpload.Location
    });

    await newVideo.save();

    // Add the video ID to the course's video_ids array
    course.video_ids.push(newVideo._id);
    await course.save();

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Error uploading video" });
  }
};

module.exports = { addVideo };