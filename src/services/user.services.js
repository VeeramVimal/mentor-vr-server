// const { User, subjectMaster } = require("../models/index");
const db = require("../models/index");
const User = db.User
const SubjectMapping = db.SubjectMapping
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

const isEmailTaken = async (email) => {
    const checkEmail = await User.findOne({ email: email });
    return !!checkEmail
}
const isPasswordValidate = async(password) => {
    if(!password.match(/^.{8,}/)) throw new Error("Password must contain at least minimum eight in length");
    if(!password.match(/^(?=.*?[A-Z])/)) throw new Error("Password must contain at least one upper case");
    if(!password.match(/^(?=.*\W)/)) throw new Error(" Password must contain at least one special character");
}
/**
 * @description Create a user
 * @param {Object} userBody
 * @returns {Promise<User>} Object
 */
const userRegisterServices = async (userBody) => {
    if (await isEmailTaken(userBody.email)) {
        throw new Error('users already exists with same email')
    }
    if (await isPasswordValidate(userBody.password)){
        throw new Error('Password not support')
    }
    userBody.status = 1;
    userBody.password = await crypto.createHash("md5").update(userBody.password).digest("hex");
    return User.create(userBody).then((user) => {
        return SubjectMapping.create({ userId: user._id, subjectId: user.mentorSubject })
            .then((data) => user)
            .catch((err) => err)
    })
}

/**
 * @description Get user by email
 * @param {string} email
 * @returns {Promise<User>} Object
 */
const getUserByEmail = async (email) => {
    const checkEmail = await User.findOne({ email: email });
    return checkEmail
}
/**
 * @description Get all user details
 * @param {empty} 
 * @returns {Promise<User>} ArrayOfObject
 */
const getAllUserServices = async () => {
    const getDetails = await User.aggregate([
        {
            $lookup: {
                from: 'subject_masters',
                localField: 'mentorSubject.subjectId',
                foreignField: '_id',
                as: 'mentorSubject'
            },
        }
    ])
    return getDetails
}

/**
* @description Get SinglePackage by userId
* @param {ObjectId<string} userId
* @returns {Promise<User>}
*/
const singleUserService = async (userId) => {
    const getSingle = await User.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: 'subject_masters',
                localField: 'mentorSubject.subjectId',
                foreignField: '_id',
                as: 'mentorSubject',
                pipeline: [ { $project: { _id: 1, subjectName: 1 } }]
            }
        }
    ])
    return getSingle
}
const SingleData = async (userId) => {
   const getData = await User.findById({ _id: userId})
   return getData
}

/**
 * @description update user data used in userId
 * @param {ObjectId<string>} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserServices = async(params, userBody) => {
    const getUserDetails = await SingleData(params.userId);
    Object.assign(getUserDetails, userBody);
    await getUserDetails.save();
    return getUserDetails
}

module.exports = {
    userRegisterServices,
    getUserByEmail,
    getAllUserServices,
    singleUserService,
    updateUserServices,
    isEmailTaken
}