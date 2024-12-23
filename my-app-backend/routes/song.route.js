var express = require("express");
var router = express();
var controller = require("../controllers/song.controller");
const multer = require("multer");

// Configure multer storage with custom filename
var songFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/songs/");
  },
  filename: function (req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ".mp3");
  },
});

// Configure multer storage with custom filename
var songImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/song_image/");
  },
  filename: function (req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "file") {
        cb(null, "public/songs/");
      } else if (file.fieldname === "image") {
        cb(null, "public/song_images/");
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

router.post(
  "/song",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  controller.createSong
);
// router.get("/songs", controller.getAllSongs);
router.get("/song/:id", controller.getSongById);
router.get("/song/:id/play", controller.playSongById);

module.exports = router;
