const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  risks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Risk' }],
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  assumptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assumption' }],
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dependency' }]
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project