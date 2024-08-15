const Joi = require("joi");
const path = require("path");
const dotenv = require("dotenv");
const Mongoose = require('mongoose');
const schema = Mongoose.Schema
const model = Mongoose.model
const ObjectId = Mongoose.Schema.Types.ObjectId

dotenv.config({ path: path.join(__dirname, '../../.env')})

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(8000),
    MONGODB_STR_URL: Joi.string().required().description("JWT secret key"),
    WEB_APP_URL: Joi.string().required().description("Front end URL"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(1)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  schema,
  ObjectId,
  model,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  HOST_URL: envVars.MONGODB_STR_URL,
  client_url: envVars.WEB_APP_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      services: "Godaddy",
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secureConnection: true, // TLS requires secureConnection to be false
      auth: {
        user: envVars.SMTP_USERNAME, // generated ethereal user
        pass: envVars.SMTP_PASSWORD, // generated ethereal password
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
