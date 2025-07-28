const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User