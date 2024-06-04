const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

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
      {
        expiresIn: "5h",
      }
    );

    // Stroing tokens in Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "lax", // Helps mitigate CSRF attacks
    };
    res.cookie("accessToken", accessToken, cookieOptions);

    res.status(200).json({
      message: "Login Successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error logging in" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json("Logout successfully");
};

module.exports = { login, createPredefinedAdmin, logout };
