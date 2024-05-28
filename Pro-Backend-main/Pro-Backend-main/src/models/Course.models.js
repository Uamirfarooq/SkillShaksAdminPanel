
import  { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  course_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  course_details: {
    type: String,
    trim: true,
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
  },
  video_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: [],
    }
  ],
  category: {
    type: String,
    required: true,
    trim: true,
  },
  course_img: {
    type: String,
    required: true
    
  },
  author_img: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

export const Course = model("Course", courseSchema);
