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
    // console.log("req.user:", req.user)
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
    res.status(201).json(savedRisk)
  }
  catch (error) {
    // console.error("Error creating risk:", error)
    res.status(500).json({ error: error.message || "Failed to add a new risk" })
  }
})

// Update a risk
riskRouter.put("/risks/:riskId", middleware.userExtractor, middleware.checkProjectOwner, async (req, res) => {
  try {
    const { riskId } = req.params
    const updateData = req.body

    const updateRisk = await Risk.findByIdAndUpdate(riskId, updateData, { new: true })
    res.json(updateRisk)
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update the risk" })
  }
})

riskRouter.delete("/projects/:projectId/risks/:riskId", middleware.userExtractor, middleware.checkProjectOwner, async (req, res) => {
  try {
    const { projectId, riskId } = req.params;
    // console.log("Deleting risk:", projectId, riskId);
    // console.log("Received DELETE request for riskId:", req.params.riskId);
    // console.log("Received riskId:", riskId);

    if (!riskId) {
      return res.status(400).json({ error: "Missing riskId" });
    }

    const project = await Project.findById(projectId);
    // console.log("Project risks:", project.risks);

    // Check if the risk exists before attempting to delete
    const risk = await Risk.findById(riskId);
    if (!risk) {
      return res.status(404).json({ error: "Risk not found" });
    }
    // console.log("Risk found:", risk);

    // Proceed with deletion
    const deleteRisk = await Risk.findByIdAndDelete(riskId);

    // Remove the risk reference from projects
    await Project.updateMany(
      { risks: riskId },
      { $pull: { risks: riskId } }
    );

    res.json({ message: 'Risk deleted', id: deleteRisk._id });
  } catch (error) {
    // console.error("Error deleting risk:", error);
    res.status(500).json({ message: 'Error deleting risk', error: error.message });
  }
});


module.exports = riskRouter