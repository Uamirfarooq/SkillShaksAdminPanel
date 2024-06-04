const express = require("express");
const { login, logout } = require("../controllers/adminController");
const router = express.Router();

router.post("/adminlogin", login);
router.post("/logout", logout);

module.exports = router;
