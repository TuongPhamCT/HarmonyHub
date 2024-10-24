const nodemailer = require("nodemailer");

require("dotenv").config();

//transporter (no need to change)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const mailConfigurations = (token, targetEmail) => {
  return {
    // It should be a string of sender/server email
    from: process.env.EMAIL_USER,

    // It should be a string of receiver email
    to: targetEmail,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
             our website and entered your email.
             Please follow the given link to verify your email
             http://localhost:5000/verify/${token} 
             Thanks`,
  };
};

const sendMail = async (token, targetEmail) => {
  try {
    let response = await transporter.sendMail(
      mailConfigurations(token, targetEmail)
    );
    return response;
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

module.exports = { sendMail };
