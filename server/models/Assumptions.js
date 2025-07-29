const mongoose = require('mongoose')

const assumptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Closed"] },
  priority: { type: String, enum: ["Low", "Medium", "High", "Critical"] },
  category: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
})

assumptionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Assumption = mongoose.model('Assumption', assumptionSchema)

module.exports = Assumption