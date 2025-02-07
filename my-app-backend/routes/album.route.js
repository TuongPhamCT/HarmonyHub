var express = require("express");
var router = express();
var controller = require("../controllers/album.controller");
const { verifyToken } = require("../middleware/authjwt.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/album_images/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

router.get("/albums", controller.getAlbums);
router.get("/album/:id", controller.getAlbumById);

router.get("/my-albums", [verifyToken], controller.getAllAlbumsOfUser);
router.post(
  "/album",
  [verifyToken],
  upload.fields([{ name: "image", maxCount: 1 }]),
  controller.createAlbum
);

router.delete("/album/:id", [verifyToken], controller.deleteAlbumById);

router.post("/album/:id/song", [verifyToken], controller.addSongToAlbum);
router.delete("/album/:id/song", [verifyToken], controller.removeSongFromAlbum);
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
