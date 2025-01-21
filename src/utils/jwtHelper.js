const jwt = require("jsonwebtoken");

// Generate a new JWT token
const generateToken = (payload, secret, expiresIn = "1h") => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

// Verify an existing JWT token
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Token verification failed");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
