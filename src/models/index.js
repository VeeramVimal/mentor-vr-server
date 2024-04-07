const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const db = {};
db.Mongoose = Mongoose;

db.User = require("./user.model");
db.subjectMaster = require("./subjectMaster.model");
db.SubjectMapping = require("./subjectMapping.model")

module.exports = db
