const { schema, model, ObjectId } = require("../config/config")
const subjectMappingSchema = new schema({
    userId: {
        type: ObjectId,
        ref: 'users'
    },
    subjectId: [{
        subjectId: {
            type: ObjectId, 
            ref: 'subject_masters'
        }
    }]
}, {
    collation: { locale: 'en_US', strength: 1 },
    timestamps: true
})
module.exports = SubjectMapping = model("subject_mappings", subjectMappingSchema)