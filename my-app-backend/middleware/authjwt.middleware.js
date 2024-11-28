const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.substring(7, token.length);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userEmail = decoded.data.email;

    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    req.userId = user.id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
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
