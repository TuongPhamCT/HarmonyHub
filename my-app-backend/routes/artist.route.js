var express = require("express");
var router = express();
var controller = require("../controllers/artist.controller");

router.get("/artist/:id", controller.getArtistById);

module.exports = router;
