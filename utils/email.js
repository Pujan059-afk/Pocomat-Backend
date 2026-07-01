const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
  connectionTimeout: 10000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Pocomat Admin" <${config.emailUser}>`,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
