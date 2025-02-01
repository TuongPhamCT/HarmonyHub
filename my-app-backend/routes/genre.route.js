var express = require("express");
var router = express();
var controller = require("../controllers/genre.controller");
const { verifyToken, isAdmin } = require("../middleware/authjwt.middleware");

//router.post("/register", controller.register);

router.post("/genre", [verifyToken, isAdmin], controller.create);
router.get("/genres", controller.getGenres);
router.get("/genre/:id", controller.getGenreById);
router.patch("/genre/:id", [verifyToken, isAdmin], controller.updateGenreById);
router.delete("/genre/:id", [verifyToken, isAdmin], controller.deleteGenreById);

module.exports = router;
