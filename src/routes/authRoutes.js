const express = require("express");
const { signup, login } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", authenticate, (req, res) => {
  res.json({ message: "Welcome to the homepage!" });
});

module.exports = router;
