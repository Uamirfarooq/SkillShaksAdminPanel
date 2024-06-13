const express = require("express");
const {
  register,
  login,
  logout,
  refresh,
} = require("../controllers/authController");

const verifyAdmin = require("../middleware/auth");
const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/login", login);
router.post("/admin/refresh-token", refresh);
router.post("/admin/logout", verifyAdmin, logout);

module.exports = router;
