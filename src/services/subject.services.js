const { subjectMaster, SubjectMapping } = require("../models/index");

/**
 * @description Create a subject details
 * @param {Object} userBody
 * @returns {Promise<User>} Object
 */
const createSubjectServices = async (userBody) => {
    return subjectMaster.create(userBody).then((user) => {
        return SubjectMapping.create({ userId: user.createdBy, subjectId: user._id })
            .then(() => user).catch((err) => new Error(`something went wrong: ${err}`))
    })
}
/**
 * @description Get all deparmentMaking details
 * @param {empty} 
 * @returns {Promise<User>} ArrayOfObject
 */
const getSubjectMappingServices = async () => {
    const getData = await SubjectMapping.aggregate([
        { $project: { _id: true, userId: true, subjectId: true } },
        {
            $lookup: {
                from: 'users',
                let: { user_id: '$userId' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                    { $project: { __v: 0 }}
                ],
                as: 'users'
            }
        },
        { $unwind: '$users' },
        {
            $lookup: {
                from: 'subject_masters',
                localField: 'subjectId.subjectId',
                foreignField: '_id',
                pipeline: [
                    { $project: { _id: true, subjectName: true}}
                ],
                as: 'users.mentorSubject',
            },
        },
        {
            $group: {
                _id: '$_id',
                value: { $first: '$users' }
            }
        },
        {
            $project: {
                _id: 0,
                'subjectMapId': '$_id',
                'usersDetails': '$value'
            }
        }
    ])
    return getData
}
module.exports = {
    createSubjectServices,
    getSubjectMappingServices
}