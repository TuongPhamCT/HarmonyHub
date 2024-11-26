const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  const user = User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });

  if (user.role === "admin") {
    next();
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
