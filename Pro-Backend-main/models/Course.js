const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    course_details: {
      type: String,
      // required: true,
      // trim: true,
      // minlength: 10,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    video_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        default: [],
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    coverImage: {
      type: String,
      default: "",
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
