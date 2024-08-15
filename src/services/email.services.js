const nodemailer = require('nodemailer');
const config = require("../config/config");
const logger = require('../config/logger');
const transport = nodemailer.createTransport(config.email.smtp);

if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

// transport
//     .verify()
//     .then(() => console.log('Connect to email server'))
//     .catch((err) => (console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env')))

/**
 * @description Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendMail = async (from, to, subject, text) => {
    const msg = {from: from, to, subject, text}
    await transport.sendMail(msg, function (err, info) {
        if(err) console.log(err);
        else { console.log("Email send: "+info.response);}
    } )
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendForgetPassword = async (token, userData) => {
    const { email, firstName, lastName } = userData
    const subject = "Reset password link";
    const forgetPasswordUrl = `${config.client_url}/user/resetPasswort?token=${token}&email=${email}`;
    // const changeName = await capitalizedFirstLetter(firstName, lastName);
    const changeName = `${firstName} ${lastName}`
    const text = `<p>Dear ${changeName},
    We received a request for a password change on your Goaly.ly account. You can reset your password</p><a href="${forgetPasswordUrl}">here</a>. your new password.`;
    await sendMail(config.email.from, email, subject, text)
}

module.exports = {
    sendForgetPassword
}