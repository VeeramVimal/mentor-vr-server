const { errorResponse, successResponse } = require("../helpers");
const { subjectMaster } = require("../models/index");
const { subjectServices } = require("../services/index");

/**
 * Create a department_name 
 */
const createSubject = async (req, res) => {
    try {
        const subject = await subjectServices.createSubjectServices(req.body);
        return successResponse(req, res, { subject })

    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}
/**
 * @description Get all subject details
 * @param {empty} 
 * @returns {Promise<User>} ArrayOfObject
 */
const getAllSubject = async (req, res) => {
    try {
        const subject = await subjectMaster.find()
        return successResponse(req, res, subject)
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

/**
 * @description Get all subjectMapping details
 * @param {empty} 
 * @returns {Promise<User>} ArrayOfObject
 */
const getAllSubjectMapping = async (req, res) => {
    try {
        const subjectMapping = await subjectServices.getSubjectMappingServices(req.body)
        return successResponse(req, res, subjectMapping)
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}
module.exports = {
    createSubject,
    getAllSubject,
    getAllSubjectMapping
}