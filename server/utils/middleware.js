const jwt = require('jsonwebtoken')
const User = require("../models/User")

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()

}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    request.user = null
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }