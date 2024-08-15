const allRoles = {
    user: ['getMentors'],
    mentor: ['getUsers'],
    admin: ['manageUsers']
}
const roles = Object.keys(allRoles);
// const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles
}