import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";
import {
  uploadOnCloudinary,
  uploadToS3,
} from "../middleware/cloudinary.middleware.js";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.models.js";
import { Course } from "../models/Course.models.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Admin.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const loginAdmin = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required ");
  }

  const user = await Admin.findOne({
    email,
    // $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "Admin account does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(200, "Admin logged In Successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const AddCourse = asyncHandler(async (req, res) => {
  const { course_name, course_details, author, level, category } = req.body;

  const vari = [course_name, course_details, author, level, category].some(
    (fields) => fields?.trim() === "" || fields?.trim() === undefined
  );
  if (vari) {
    throw new ApiError(400, "All fields are required");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar is required at local path");
  }
  if (!coverImageLocalPath) {
    throw new ApiError(409, "coverImage is required at local path");
  }
  // upload them to cloudinary, avatar
  const avatar = await uploadToS3(avatarLocalPath);
  const coverImage = await uploadToS3(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(409, "avatar is required");
  }
  if (!coverImage) {
    throw new ApiError(409, "coverImage is required");
  }
  // create user object - create entsry in db
  //   course_name, course_details, author, level, category
  const user = await Course.create({
    course_name: course_name,
    course_details: course_details,
    author: author,
    level: level,
    category: category,
    author_img: avatar.Location,
    course_img: coverImage.Location,
  });

  // remove password and refresh token field from response
  const createdCourse = await Course.findOne(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while creating new user");
  }

  res.status(200).json(
    new ApiResponce(201, "Working Succesfully", {
      createdCourse,
    })
  );
});

const GetCourse = asyncHandler(async (req, res) => {
  const courses = await Course.find().exec();


  res.status(200).json(
    new ApiResponce(200, "Data successfully retrived from database", {
      courses
    }))
});

export { loginAdmin, AddCourse, GetCourse };
