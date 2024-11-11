var express = require("express");
var router = express();
var controller = require("../controllers/song.controller");
const multer = require("multer");

// Configure multer storage with custom filename
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/songs/");
  },
  filename: function (req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ".mp3");
  },
});

var upload = multer({ storage: storage });

router.post("/song", upload.single("file"), controller.createSong);
// router.get("/songs", controller.getAllSongs);
// router.get("/song/:id", controller.getSongById);
router.get("/song/:id/play", controller.playSongById);

module.exports = router;
