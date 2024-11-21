var express = require("express");
var router = express();
var controller = require("../controllers/playlist.controller");

router.get("/playlists/:userId", controller.getAllPlaylistsByUserId);
router.get("/playlist/:id", controller.getPlaylistById);
module.exports = router;
