const { User, SubjectMapping } = require("../models")

/**
 * @description search filter to get the user details
 * @param {Object} query
 *  * @param {Object<String>} keywords
 * @returns {Promise<Object>}
 */
const searchFilterService = async (userQuery) => {
    var query = {};
    if (userQuery.keywords) {
        query.$or = [
            { "firstName": { $regex: userQuery.keywords, $options: 'i' } },
            { "lastName": { $regex: userQuery.keywords, $options: 'i' } },
            { "email": { $regex: userQuery.keywords, $options: 'i' } },
            // { "roleName": { $regex:  userQuery.keywords , $options: 'i'} },
            // { "state": { $regex:  userQuery.keywords , $options: 'i'} },
        ]
    }
    // const searchValue = await User.find(query);
    const searchValue = await User.aggregate([
        {
            $match: {
                roleName: { $in: ['mentor'] },
                $and: [query]
            }
        },
    ])
    return searchValue
}
/**
 * @description search over all fields filter to get the user details
 * @param {Object} query
 *  * @param {Object<string>} userKey
 *  * @param {Object<string>} subjectKey
 * @returns {Promise<Object>}
 */
const searchOverallServices = async (userQueries) => {
    var query = {}
    if (userQueries.userKey) {
        query = { 'users.firstName': { $regex: userQueries.userKey, $options: 'i' } }
    }
    if (userQueries.subjectKey) {
        query = { 'users.mentorSubject': { $elemMatch: { 'subjectName': { $regex: userQueries.subjectKey, $options: 'i' } } } }
    }
    if (userQueries.userKey && userQueries.subjectKey) {
        query.$and = [
            { 'users.mentorSubject': { $elemMatch: { 'subjectName': { $regex: userQueries.subjectKey, $options: 'i'}}}},
            // { $in: [ { 'users.firstName': { $regex: userQueries.userKey, $options: 'i' }}] }
         { 'users.firstName': {$regex: userQueries.userKey, $options: 'i' }}

        ]
    }
    const searchDetails = SubjectMapping.aggregate([
        { $project: { _id: 1, userId: 1, subjectId: 1}},
        {
            $lookup: {
                from: 'users',
                let: { user_id: '$userId' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                    { $project: { __v: 0 } }
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
                as: 'users.mentorSubject'
            }
        },
        {
            $match: {
                $or: [
                    query
                ]
            }
        },
        { $group: {
            _id: '$_id',
           value: { $first: '$users'}
        }},
        { $project: {
            _id: 0,
            'subjectMapId': '$_id',
            'usersDetails': '$value'
        }}

    ])
    return searchDetails
}
module.exports = {
    searchFilterService,
    searchOverallServices
}