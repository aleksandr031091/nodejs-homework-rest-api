const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.LOGIN_EMAIL,
    pass: process.env.PASWORD_EMAIL,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: process.env.LOGIN_EMAIL };
    const result = await transporter.sendMail(email);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
