const express = require("express");
const router = express.Router();

// router.post("/", addNewMovieController);
router.post("/", (req, res) => {
  // Add new movie logic here
  res.send("New movie added!");
});

// router.post("/:id", updateMovieController);
router.post("/:id", (req, res) => {
  // Update movie logic here
  res.send(`Movie with ID ${req.params.id} updated!`);
});

// router.delete("/:id", deleteMovieController);
router.delete("/:id", (req, res) => {
  // Delete movie logic here
  res.send(`Movie with ID ${req.params.id} deleted!`);
});

// router.get("/:id", getSingleMovieController);
router.get("/:id", (req, res) => {
  // Get single movie logic here
  res.send(`Movie with ID ${req.params.id} fetched!`);
});

// Test route to confirm it's working
router.get("/test", (req, res) => {
  res.json({ message: "Welcome to the test movie admin!" });
});

module.exports = router;
