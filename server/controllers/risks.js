const riskRouter = require('express').Router()
const Risk = require("../models/Risks")
const Project = require("../models/Project")
const middleware = require("../utils/middleware")
// Get all risks for a particular project
riskRouter.get("/projects/:projectId/risks", middleware.userExtractor, async (req, res) => {
  try {
    const { projectId } = req.params
    const risks = await Risk.find({ projects: projectId })
    res.json(risks)
  }
  catch (err) {
    res.status(500).json({ error: "Failed to fetch the risks" })
  }
})

// Post a new risk
riskRouter.post("/projects/:projectId/risks", middleware.userExtractor, middleware.checkProjectOwner, async (req, res) => {
  try {
    const { projectId } = req.params
    const { title, description, status, probability, impact, category } = req.body

    const newRisk = new Risk({
      title,
      description,
      status,
      probability,
      impact,
      category,
      projects: [projectId]
    })
    const savedRisk = await newRisk.save()
    await Project.findByIdAndUpdate(projectId, {
      $push: { risks: savedRisk._id }
    })
  }
  catch (error) {
    res.status(500).json({ error: "Failed to add a new risk" })
  }
})

// Update a risk
riskRouter.put("/risks/:riskId", middleware.userExtractor, middleware.checkProjectOwner, async (req, res) => {
  try {
    const { riskId } = req.params
    const updateData = req.body

    const updateRisk = await Risk.findByIdAndUpdate(riskId, updateData, { new: true })
    res.json({ updateRisk })
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update the risk" })
  }
})

riskRouter.delete("risks/:riskId", middleware.userExtractor, middleware.checkProjectOwner, async (req, res) => {
  try {
    const { riskId } = req.params

    const deleteRisk = await Risk.findByIdAndDelete(riskId)

    await Project.updateMany(
      { risks: riskId },
      { $pull: { risks: riskId } }
    )
    res.json({ message: 'Risk deleted', id: deleteRisk._id })
  }
  catch (error) {
    res.status(500).json({ error: 'Fail to delete a risk' })
  }
})

module.exports = riskRouter