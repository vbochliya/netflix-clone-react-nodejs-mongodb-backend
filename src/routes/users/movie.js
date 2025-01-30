const express = require("express");
const router = express.Router();
const Movie = require("../../models/movie");

// GET /movie/:id
// Fetch a movie by its ID, populate directors and actors
router.get("/:id", async (req, res) => {
  if (req.params.id) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("directors")
        .populate("actors");

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json(movie);
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Movie id is required" });
  }
});

module.exports = router;
