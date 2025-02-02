var express = require("express");
var router = express();
var controller = require("../controllers/artist.controller");

router.get("/artist/:id", controller.getArtistById);
router.get("/artists", controller.getAllArtists);

module.exports = router;
