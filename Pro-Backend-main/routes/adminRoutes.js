const express = require("express");
const { login, logout, refresh } = require("../controllers/adminController");
const router = express.Router();

router.post("/adminlogin", login);
router.post("/refresh-token", refresh);
router.post("/logout", logout);

module.exports = router;
