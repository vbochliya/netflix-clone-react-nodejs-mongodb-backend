const express = require("express");
const router = express.Router();

const movieAdminRoute = require("./watchlist");

// Everything at /api/admin comes here from File 1
// Then /movies is appended here, so the final path is /api/admin/movies
router.use("/watchlist", movieAdminRoute);

module.exports = router;