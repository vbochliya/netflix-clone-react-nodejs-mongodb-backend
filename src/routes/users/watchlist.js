const express = require("express");
const router = express.Router();

// router.post("/", addNewwatchlistController);
router.post("/", (req, res) => {
  // Add new watchlist logic here
  res.send("New watchlist added!");
});

// router.post("/:id", updatewatchlistController);
router.post("/:id", (req, res) => {
  // Update watchlist logic here
  res.send(`watchlist with ID ${req.params.id} updated!`);
});

// router.delete("/:id", deletewatchlistController);
router.delete("/:id", (req, res) => {
  // Delete watchlist logic here
  res.send(`watchlist with ID ${req.params.id} deleted!`);
});

// router.get("/:id", getSinglewatchlistController);
router.get("/:id", (req, res) => {
  // Get single watchlist logic here
  res.send(`watchlist with ID ${req.params.id} fetched!`);
});

// Test route to confirm it's working
router.get("/test", (req, res) => {
  res.json({ message: "Welcome to the test watchlist user!" });
});

module.exports = router;
