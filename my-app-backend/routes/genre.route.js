var express = require("express");
var router = express();
var controller = require("../controllers/genre.controller");
const multer = require("multer");
const { verifyToken, isAdmin } = require("../middleware/authjwt.middleware");

//router.post("/register", controller.register);
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/genre_images/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

router.post(
  "/genre",
  [verifyToken, isAdmin],
  upload.fields([{ name: "image", maxCount: 1 }]),
  controller.create
);
router.get("/genres", controller.getGenres);
router.get("/genre/:id", controller.getGenreById);
router.patch("/genre/:id", [verifyToken, isAdmin], controller.updateGenreById);
router.delete("/genre/:id", [verifyToken, isAdmin], controller.deleteGenreById);

module.exports = router;
