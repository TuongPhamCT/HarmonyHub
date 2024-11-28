const express = require("express");
const router = express();
const controller = require("../controllers/playlist.controller");
const { verifyToken } = require("../middleware/authjwt.middleware");

router.get("/playlists", [verifyToken], controller.getAllPlaylists);
router.get("/playlist/:id", [verifyToken], controller.getPlaylistById);
router.post("/playlist", [verifyToken], controller.createPlaylist);
module.exports = router;
