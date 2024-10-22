// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// const token = jwt.sign(
//   {
//     data: "Token Data",
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: "10m" }
// );

// const mailConfigurations = {
//   // It should be a string of sender/server email
//   from: process.env.EMAIL_USER,

//   to: "megumikatoubuhbuh@gmail.com",

//   // Subject of Email
//   subject: "Email Verification",

//   // This would be the text of email body
//   text: `Hi! There, You have recently visited
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:5000/verify/${token}
//            Thanks`,
// };

// const sendMail = async (transporter, mailConfigurations) => {
//   try {
//     await transporter.sendMail(mailConfigurations);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.log("Error sending email: ", error);
//   }
// };

// module.exports = { sendMail, mailConfigurations, transporter };
