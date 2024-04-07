const { errorResponse, successResponse } = require('../helpers');
const { userServices, authServices, tokenServices, searchServices } = require("../services/index");
/**
 * Get all user 
 */
const getAllUser = async (req, res) => {
    try {
        const user = await userServices.getAllUserServices();
        return successResponse(req, res, { user });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}
/**
 * Create a user 
 */
const userRegister = async (req, res) => {
    try {
        const user = await userServices.userRegisterServices(req.body)
        return successResponse(req, res, { user })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}
/**
 * user Login functions 
 */
const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authServices.userLogin(email, password);
        const token = await tokenServices.generateAuthToken(user)
        return successResponse(req, res, { user, token })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

// search filter
const searchFilter = async (req, res) => {
    try {
        const searchField = await searchServices.searchFilterService(req.query);
        return successResponse(req, res, { searchField })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

//** search user and subject based field */
const searchFilterDetails = async (req, res) => {
    try {
        const searchFields = await searchServices.searchOverallServices(req.query);
        return successResponse(req, res, searchFields)
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

//** get single user details */
const singleUserData = async (req, res) => {
    try {
        const user = await userServices.singleUserService(req.params.userId);
        return successResponse(req, res, { user })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

//** update user details */
const updateUserData = async (req, res) => {
    try {
        const userData = await userServices.updateUserServices(req.params, req.body);
        return successResponse(req, res, { user: userData })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

//** forget pasusersword */
const forgetPassword = async(req, res) => {
    try {
        const user = await authServices.forgetPasswordService(req.body);
        return successResponse(req, res, { user })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}
//** reset password */
const resetPassword = async(req, res) => {
    try {
        const user = await authServices.resetPasswordServices(req.query, req.body);
        return successResponse(req, res, user)
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}
module.exports = {
    userRegister,
    userLogin,
    searchFilter,
    searchFilterDetails,
    getAllUser,
    singleUserData,
    updateUserData,
    forgetPassword,
    resetPassword
} 