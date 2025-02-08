var express = require("express");
var router = express();
var controller = require("../controllers/auth.controller");
const multer = require("multer");
const { verify } = require("jsonwebtoken");

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

router.post("/register", controller.register);
router.get("/verify/:token", controller.verify);

//User login api
router.post("/login", controller.login);

router.post(
  "/user/image",
  [verifyToken],
  upload.fields([{ name: "image", maxCount: 1 }]),
  controller.addUserImage
);

module.exports = router;
