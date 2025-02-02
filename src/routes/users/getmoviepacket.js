// routes/getMoviePacketRoute.js
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Movie = require("../../models/movie");

// GET /getmoviepacket/:id/:packetNumber
// Streams the requested video file located in /videos/<id>/<packetNumber>.mp4
router.get("/:id/:resolution/:packetNumber", async (req, res) => {
  try {
    const { id,resolution, packetNumber } = req.params;

    // 1. Verify that the Movie exists .
    // const movie = await Movie.findById(id);
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" });
    // }

    // 2. Build the full path to the requested video file in your local file system.
    const videoPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "videos",
      id,
      resolution,
      `${packetNumber}.mp4`
    );
    console.log(videoPath)
    // 3. Check if the file actually exists
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: "Video file not found" });
    }

    // 4. Handle "Range" requests for partial streaming (typical for video).
    const range = req.headers.range;
    const videoSize = fs.statSync(videoPath).size;

    if (!range) {
      // If no range header, send the entire video (not always recommended for large files).
      const headers = {
        "Content-Type": "video/mp4",
        "Content-Length": videoSize,
      };
      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
    } else {
      // Parse the range string, e.g. "bytes=12345-"
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      // If end is not provided, use the last byte of the file
      const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

      // Make sure the range is valid
      if (start >= videoSize || end >= videoSize) {
        // Range not satisfiable
        res.status(416).send({
          message: "Requested range not satisfiable " + start + " - " + end,
        });
        return;
      }

      const chunkSize = end - start + 1;
      const fileStream = fs.createReadStream(videoPath, { start, end });

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      // HTTP status 206 = Partial Content
      res.writeHead(206, headers);
      fileStream.pipe(res);
    }
  } catch (error) {
    console.error("Error fetching movie packet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
