const { schema, model , ObjectId } = require("../config/config");
const subjectMasterSchema = new schema({
    subjectName: {
        type: String,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'users'
    }, 
    updatedBy: {
        type: ObjectId,
        ref: 'users'
    }
}, { 
    collation: { locale: 'en_US', strength: 1 },
    timestamps: true
 });
 module.exports = SubjectMaster = model('subject_masters', subjectMasterSchema)