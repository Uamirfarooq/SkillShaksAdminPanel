const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies.accessToken;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  let token = authHeader.split(" ")[1]; // Extract the token part from "Bearer <token>"
  console.log({ Token: token });

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Remove any extraneous quotes from the token
  token = token.replace(/['"]+/g, "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.admin = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;


