const mongoose = require('mongoose')

const dependencySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Closed"] },
  type: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
})

dependencySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Dependency = mongoose.model('Dependency', dependencySchema)

module.exports = Dependency