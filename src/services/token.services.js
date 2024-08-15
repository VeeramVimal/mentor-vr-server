const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const config = require("../config/config")
const { tokenTypes } = require("../config/token");

/**
 * @description Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} email
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generatetoken = async (userId, email, firstName, lastName, roleName,  type, expires, secret = config.jwt.secret) => {
 const payload = {
    users: {
        _id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        roleName: roleName,
        createdAt: new Date()
    },
    iat: moment().unix(),
    exp: expires.unix(),
    type,
 }
 return jwt.sign(payload, secret)
}

const generateResetToken = async( email, type, expires, secret = config.jwt.secret) => {
    const payload = {
       sub: email,
       iat: moment().unix(),
       exp: expires.unix(),
       type
    }
    return jwt.sign(payload, secret)
}

/**
 * @description Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthToken = async (user) => {
    const { _id, email, firstName, lastName, roleName} = user
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = await generatetoken(_id, email, firstName, lastName, roleName, tokenTypes.ACCESS, accessTokenExpires);
    // const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    // const refreshToken = await generatetoken(_id, email, tokenTypes.REFERSH, refreshTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
    }
}

const generateResetPasswordToken = async(userBody) => {
    const {email} = userBody
    const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const resetPasswordToken = await generateResetToken(email, tokenTypes.RESET_PASSWORD, expires);
    return resetPasswordToken
}
module.exports = {
    generatetoken,
    generateAuthToken,
    generateResetPasswordToken
}