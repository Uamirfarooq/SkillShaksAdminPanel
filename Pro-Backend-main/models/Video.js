const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    video_url: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    week: {
      type: Number,
      required: true,
      min: 1,
      max: 52,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
