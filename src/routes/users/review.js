// routes/reviewRoute.js
const express = require("express");
const router = express.Router();
const Review = require("../../models/review");
const Movie = require("../../models/movie");
const User = require("../../models/User");

// Create a review
// POST /review
router.post("/", async (req, res) => {
  try {
    const { userId, movieId, rating, comment } = req.body;

    // 1) Validate user and movie exist (optional, but good practice)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // 2) Create a new review

    const newReview = new Review({
      user: userId,
      movie: movieId,
      rating:{
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
      },
      comment: {
        type: String,
        required: true,
        trim: true,
        min: [8, "Comment must be at least 8 character"],
        max: [500, "Comment must be at most 500 character"],
      },
    });

    await newReview.save();

    res.status(201).json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a review by ID
// GET /review/:reviewId
router.get("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId)
      .populate("user", "username email")
      .populate("movie", "title");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a review
// PUT /review/:reviewId
router.put("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a review
// DELETE /review/:reviewId
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all reviews for a movie
// GET /review/movie/:movieId
router.get("/movie/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId })
      .populate("user", "username email")
      .populate("movie", "title");

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
