const Mongoose = require('mongoose');
const schema = Mongoose.Schema
const model = Mongoose.model
const ObjectId = Mongoose.Schema.Types.ObjectId

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, '../../.env')})

module.exports = {
    schema,
    ObjectId,
    model,
    HOST_URL: process.env.APP_HOST_URL,
    PORT: process.env.APP_PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS
    },
    EMAIL:{
        smtp: {
            services: 'Godaddy',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secureConnection: true,
            auth: {
                user: process.env.SMTP_USERNAME, // generated ethereal user
                pass: process.env.SMTP_PASSWORD // generated ethereal password
            },
        },
        from: process.env.EMAIL_FROM
    }
}
