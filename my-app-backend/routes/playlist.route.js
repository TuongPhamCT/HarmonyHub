const express = require("express");
const router = express();
const controller = require("../controllers/playlist.controller");
const { verifyToken } = require("../middleware/authjwt.middleware");

router.get("/my-playlists", [verifyToken], controller.getAllPlaylistsOfUser);
router.get("/playlists", controller.getAllPlaylists);
router.get("/playlist/:id", [verifyToken], controller.getPlaylistById);
router.get("/playlist/:id/songs", [verifyToken], controller.getSongsInPlaylist);
router.post("/playlist", [verifyToken], controller.createPlaylist);
router.delete("/playlist/:id", [verifyToken], controller.deletePlaylistById);
router.post(
  "/playlist/:id/song/:songId",
  [verifyToken],
  controller.addSongToPlaylist
);
router.get("/playlist/:id/image", controller.getPlaylistImageById);
router.delete(
  "/playlist/:id/song",
  [verifyToken],
  controller.removeSongFromPlaylist
);
module.exports = router;
router.patch("/playlist/:id", [verifyToken], controller.updatePlaylistById);
