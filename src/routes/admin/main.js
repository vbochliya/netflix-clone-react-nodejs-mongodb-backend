const express = require("express");
const router = express.Router();

const movieAdminRoute = require("./movieAdminRoute");

// Everything at /api/admin comes here from File 1
// Then /movies is appended here, so the final path is /api/admin/movies
router.use("/movies", movieAdminRoute);
router.use("/actor", movieAdminRoute);
router.use("/director", movieAdminRoute);

module.exports = router;
