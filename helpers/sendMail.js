const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: 'sasha95@gmail.com' };
  await sgMail
    .send(email)
    .then(() => console.log('Message sent'))
    .catch(() => console.log("The message wasn't sent"));
  return true;
};

module.exports = sendMail;
