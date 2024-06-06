const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Predefined admin credentials
const predefinedAdmin = {
  email: "tayyab@gmail.com",
  password: "tayyab007", // Make sure to hash this password before saving
};

// Function to create predefined admin if not exists
const createPredefinedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: predefinedAdmin.email,
    });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(predefinedAdmin.password, salt);
      const newAdmin = new Admin({
        email: predefinedAdmin.email,
        password: hashedPassword,
      });
      console.log(newAdmin);
      await newAdmin.save();

      console.log("Predefined admin created.");
    } else {
      console.log("Predefined admin already exists.");
    }
  } catch (error) {
    console.error("Error creating predefined admin:", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found or invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
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

    // return res.status(200).json({
    //   message: "Successfully Login",
    //   data: admin,
    //   accessToken: accessToken,
    //   refreshToken: refreshToken,
    // });

    return res.status(200).json({
      message: "Successfully Login",
      data: { // Make sure this structure matches the frontend expectation
        accessToken,
        refreshToken,
        user: {
          id: admin._id,
          email: admin.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No token, authorization denied" });
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
    res.status(401).json({ message: "Token is not valid" });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = { login, refresh, createPredefinedAdmin, logout };
