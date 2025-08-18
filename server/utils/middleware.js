const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Project = require("../models/Project")
const logger = require('./logger')
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

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

// To check Project Ownership before the user create any risk, assumptions, issues, dependencies

const checkProjectOwner = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId)

    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorised for this project" })
    }
    req.project = project
    next()
  }
  catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })

}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  next(error);
};
module.exports = { tokenExtractor, userExtractor, requestLogger, unknownEndpoint, errorHandler, checkProjectOwner }