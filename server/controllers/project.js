const projectRouter = require('express').Router()
const Project = require('../models/Project')
const middleware = require("../utils/middleware")

// Create a new project
projectRouter.post('/', async (req, res) => {

  try {
    const body = req.body
    const user = req.user

    const project = new Project({
      name: body.name,
      description: body.description,
      user: user._id
    })
    const savedProject = await project.save()
    user.projects.push(savedProject._id)
    await user.save()
    res.status(201).json(savedProject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all the projects created by a particular user

projectRouter.get('/', async (req, res) => {

  try {
    const userID = req.user.id

    const projects = await Project.find({ user: userID })
      .populate('risks')
      .populate('assumptions')
      .populate('issues')
      .populate('dependencies');

    const projectCard = projects.map(project => ({
      id: project._id,
      name: project.name,
      description: project.description,
      riskCount: project.risks.length,
      assumptionsCount: project.assumptions.length,
      issuesCount: project.issues.length,
      dependenciesCount: project.dependencies.length
    }));
    res.json(projectCard)
  } catch (error) {
    console.error('Failed to fetch projects:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Update a project

projectRouter.put('/:id', async (req, res) => {
  const body = req.body
  const project = {
    name: body.name,
    description: body.description
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, project, { new: true })
  res.status(200).json(updatedProject);
})


// Delete a project

projectRouter.delete('/:id', async (req, res) => {
  try {
    const body = req.body
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: 'invalid user' })
    }

    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(401).json({ error: "project not found" })
    }

    if (project.user.toString() !== user.id.toString()) {
      return res.status(403).json({ error: 'not authorized to delete this project' })
    }

    await Project.findByIdAndDelete(req.params.id)
    res.status(204).end()

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


module.exports = projectRouter
