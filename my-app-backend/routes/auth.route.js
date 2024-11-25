var express = require("express");
var router = express();
var controller = require("../controllers/auth.controller");

router.post("/register", controller.register);
router.get("/verify/:token", controller.verify);

//User login api
router.post("/login", controller.login);

module.exports = router;
