var express = require("express");
var router = express();
var controller = require("../controllers/album.controller");
const { verifyToken } = require("../middleware/authjwt.middleware");

router.get("/albums", controller.getAlbums);
router.get("/album/:id", controller.getAlbumById);

router.get("/my-albums", [verifyToken], controller.getAllAlbumsOfUser);
// router.get("/album/:id/songs", [verifyToken], controller.getSongsInPlaylist);
// router.post("/album", [verifyToken], controller.createPlaylist);
// router.delete("/album/:id", [verifyToken], controller.deletePlaylistById);
// router.post("/album/:id/song", [verifyToken], controller.addSongToPlaylist);
// router.delete(
//   "/album/:id/song",
//   [verifyToken],
//   controller.removeSongFromPlaylist
// );
// router.patch("/album/:id", [verifyToken], controller.updatePlaylistById);
module.exports = router;
