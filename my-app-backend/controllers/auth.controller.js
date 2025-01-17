const path = require("path");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail_sender.util");
const bcrypt = require("bcrypt");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async function (req, res) {
  const { name, email, password } = req.body;

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

  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    return res.status(500).json({ message: "Error hashing password", error });
  }

  try {
    user = await User.create({ name, email, password: hashedPassword });
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

module.exports.verify = async function (req, res) {
  const { token } = req.params;

  //Verifying the JWT token
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err);

      // Send 'unverified.html' if verification fails
      const filePath = path.join(__dirname, "../public/pages/unverified.html");
      return res.sendFile(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(err.status || 500).end(); // Handle error properly
        }
      });
    } else {
      // JWT decoded successfully; activate the user account
      const email = decoded.data.email;

      try {
        // Ensure the update is awaited and handled properly
        const user = await User.update({ active: true }, { where: { email } });

        // Check if the user was found and updated
        if (user[0] > 0) {
          // Sequelize's update returns an array where the first element is the number of affected rows
          const filePath = path.join(
            __dirname,
            "../public/pages/verified.html"
          );
          return res.sendFile(filePath, (err) => {
            if (err) {
              console.log(err);
              return res.status(err.status || 500).end();
            }
          });
        } else {
          // If no user was found/updated
          console.log("User not found or already active");
          const filePath = path.join(
            __dirname,
            "../public/pages/unverified.html"
          );
          return res.sendFile(filePath, (err) => {
            if (err) {
              console.log(err);
              return res.status(err.status || 500).end();
            }
          });
        }
      } catch (error) {
        console.log("Error updating user:", error);
        return res.status(500).send("Internal Server Error");
      }
    }
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  var passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  //check if user is activated
  if (!user.active) {
    return res.status(401).send({
      message: "User not activated",
    });
  }

  //generate jwt token
  const token = jwt.sign(
    {
      data: { email },
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.status(200).send({
    accessToken: token,
  });
};
