const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Closed"] },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"] },
  type: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
})

issueSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Issue = mongoose.model('Issue', issueSchema)

module.exports = Issue