const { User } = require("../models/index");
// const userServices  = require("./user.services");
const crypto = require("crypto");
const { tokenServices, userServices } = require("./index");
const emailServices = require('./email.services')

const getEmailDetails = async (email) => {
    const getData = await User.findOne({ email: email });
    return getData
}
/**
 * @description Login with username and password
 * @param {string} email
 * @param {string} password
 * @return {Promise<User>} Object
 */
const userLogin = async (email, password) => {
    const user = await userServices.getUserByEmail(email);
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    if (user) {
        if (user.password !== reqPass) throw new Error("Incorrect Password")
    } else throw new Error("Incorrect Email Id")
    return user
}
/**
 * @description forget Password using user email
 * @param {string} email
 * @return {Promise<User>} Object
 */
const forgetPasswordService = async (userBody) => {
    const { email, _id } = userBody
    const user = await getEmailDetails(email)
    if (!user) throw new Error('User with this email does not exists.')
    else {
     const token = await tokenServices.generateResetPasswordToken(user);
     await emailServices.sendForgetPassword(token, user)
    }
}
const resetPasswordServices = async(query, userBody) => {
    const { token, email } = query;
    const { newPass } = userBody;
    const userDetails = await userServices.getUserByEmail(email);
    if(userDetails){
        const newPassword = crypto.createHash("md5").update(newPass).digest("hex");
        userDetails.password = newPassword;
        Object.assign(userDetails);
        await userDetails.save();
        return userDetails
    }
}
module.exports = {
    userLogin,
    forgetPasswordService,
    resetPasswordServices
}