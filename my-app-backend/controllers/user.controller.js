const sequelize = require("../configs/sequelize");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail_sender.util");
require("dotenv").config();

module.exports.register = function (req, res) {
  const { username, email, password } = req.body;
  // Check if the user already

  //check if email is exist

  //generate jwt token
  const token = jwt.sign(
    {
      data: { email },
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  //send email
  try {
    sendMail(token, email);

    //response
    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification link.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.verify = function (req, res) {
  const { token } = req.params;

  // Verifying the JWT token
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      res.send(
        "Email verification failed,possibly the link is invalid or expired"
      );
    } else {
      res.send("Email verifified successfully");
    }
  });
};
