// routes/watchlistRoute.js
const express = require("express");
const router = express.Router();
const Movie = require("../../models/movie");
const User = require("../../models/User");

// Add a movie to watchlist
// POST /watchlist/add
router.post("/add", async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    // Verify user and movie
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Add movie to watchlist if not already there
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: "Movie added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove a movie from watchlist
// DELETE /watchlist/remove
router.delete("/remove", async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    // Verify user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if movie is in the watchlist
    const index = user.watchlist.indexOf(movieId);
    if (index === -1) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    // Remove movie from watchlist
    user.watchlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Movie removed from watchlist", watchlist: user.watchlist });
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's watchlist
// GET /watchlist/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user
    const user = await User.findById(userId).populate("watchlist", "title description");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // watchlist is an array of Movie IDs, so we might want to populate it for details
    res.json({ watchlist: user.watchlist });
  } catch (error) {
    console.error("Error fetching user watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
