const express = require("express");
const router = express.Router();

const movieRoute = require("./movie");
const getmoviepacketRoute = require("./getmoviepacket");
const watchlistRoute = require("./watchlist");
const reviewRoute = require("./review");
// const profileRoute = require("./profile");
// const subscriptionRoute = require("./subscription");
// const actorRoute = require("./actor");
// const directorRoute = require("./director");


router.use("/movie", movieRoute);//get movie by id
router.use("/getmoviepacket", getmoviepacketRoute);//get packets of movie
router.use("/watchlist", watchlistRoute);//wathlist of user-get watchlist,add to watchlist,delete watchlist
router.use("/review", reviewRoute);//review of movie-get review,add review,delete review,update review
// router.use("/profile", profileRoute);
// router.use("/subscription", subscriptionRoute);
// router.use("/actor", actorRoute);
// router.use("/director", directorRoute);


module.exports = router;