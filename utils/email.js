const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

sgMail.setApiKey(config.sendgridApiKey);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: config.emailUser,
    subject,
    text,
    html,
  };
  return sgMail.send(msg);
};

module.exports = { sendEmail };
