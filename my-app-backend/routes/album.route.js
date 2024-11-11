var express = require("express");
var router = express();
var controller = require("../controllers/album.controller");

router.get("/albums", controller.getAlbums);

module.exports = router;
