const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const createError = require("../utils/error");

// Admin Registeration Controller

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return next(createError(400, "Email and password are required."));
    }

    const isAdminExists = await Admin.findOne({ email: email });
    if (isAdminExists) {
      return next(createError(409, "Email already exists"));
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      email,
      password: hashPassword,
    });
    await newAdmin.save();
    return res
      .status(201)
      .json({ success: true, message: "Admin registered Successfully" });
  } catch (error) {
    next(createError(500, "Error while registering as a Admin"));
  }
};

// Admin Login Controller
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return next(createError(404, "Admin not found or invalid email"));
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return next(createError(404, "Invalid Password"));
    }

    const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "lax", // Helps mitigate CSRF attacks
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "Successfully Login",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: admin._id,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    next(createError(500, "Error logging in"));
  }
};

const refresh = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(createError(401, "No token, authorization denied"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { adminId: decoded.adminId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ message: "Access token refreshed" });
  } catch (error) {
    next(createError(401, "Token is not valid"));
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(createError(500, "Error logging out"));
  }
};

module.exports = { register, login, refresh, logout };
