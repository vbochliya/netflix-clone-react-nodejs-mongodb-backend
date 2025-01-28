const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/test", (req, res) => {
  res.json({ message: "Welcome to the test authuser!" });
});


module.exports = router;
