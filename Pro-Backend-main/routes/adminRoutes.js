const express = require("express");
const { login } = require("../controllers/adminController");
const router = express.Router();

router.post("/adminlogin", login);
// router.post('/refresh', refresh);
// router.post('/logout', logout);

module.exports = router;
