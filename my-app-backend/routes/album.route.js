var express = require("express");
var router = express();
var controller = require("../controllers/album.controller");

router.get("/albums", controller.getAlbums);
router.get("/album/:id", controller.getAlbumById);
module.exports = router;
