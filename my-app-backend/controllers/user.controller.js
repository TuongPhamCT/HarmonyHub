const sequelize = require("../configs/sequelize");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail_sender.util");
require("dotenv").config();

//login
const { CREATED } = require("../core/success.response");
const { UserAccessService } = require("../services/user.service");

module.exports.register = async function (req, res) {
  const { username, email, password } = req.body;

  // Check if the user already exists by email
  try {
    user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
  //create user
  try {
    user = await User.create({ username, email, password });
  } catch (error) {
    return res.status(400).json({ message: "data incorect format", error });
  }

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
    let response = await sendMail(token, email);
    console.log(response);
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
      //active user account
      const email = decoded.data.email;
      user = User.update({ active: true }, { where: { email } });
      res.send("Email verifified successfully");
    }
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const metadata = await UserAccessService.login(req.body);
    return res.status(200).json({
      message: "Login OK!",
      metadata,
      options: {
        limit: 10,
      }
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

