const mongoose = require('mongoose')

const riskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Closed"] },
  probability: { type: Number, min: 1, max: 5 },
  impact: { type: Number, min: 1, max: 5 },
  category: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
})

riskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Risk = mongoose.model('Risk', riskSchema)

module.exports = Risk