const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// GET /api/thumbnails/:thumbnailId
router.get("/:thumbnailId", (req, res) => {
  const { thumbnailId } = req.params;

  const thumbnailPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "thumbnails",
    thumbnailId+".jpeg"
  );

  // Check if the file exists
  fs.access(thumbnailPath, fs.constants.F_OK, (err) => {
    if (err) {
      // The file doesn't exist or cannot be accessed
      return res.status(404).json({ error: "Thumbnail not found" });
    }

    //  Alternatively, use `mime-types` package.
    res.setHeader("Content-Type", "image/jpeg");

    // Create a read stream
    const readStream = fs.createReadStream(thumbnailPath);

    // Error handling for read stream
    readStream.on("error", (error) => {
      console.error("Error reading file:", error);
      return res
        .status(500)
        .send("Server error while streaming the thumbnail.");
    });

    // Pipe the read stream to the response
    readStream.pipe(res);
  });
});

module.exports = router;
