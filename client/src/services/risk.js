import axios from 'axios'
const baseUrl = 'http://localhost:3000/api'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  // console.log("Token set:", token)
}

// Get all risks

const getAll = async (projectId) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(`${baseUrl}/projects/${projectId}/risks`, config)
  // console.log(res.data)
  return res.data
}

// create a new Risk 
const createRisk = async (projectId, newRisk) => {
  const config = {
    headers: { Authorization: token },
  }
  // console.log(config)
  const res = await axios.post(`${baseUrl}/projects/${projectId}/risks`, newRisk, config)
  console.log('Created risk response:', res);
  return res.data
}

const updateRisk = async (riskId, projectId, updatedRisk) => {
  const config = {
    headers: { Authorization: token },
  }

  if (!updatedRisk) {
    throw new Error("No updated risk data provided");
  }

  const res = await axios.put(`${baseUrl}/projects/${projectId}/risks/${riskId}`, updatedRisk, config)
  return res.data
}

const deleteRisk = async (projectId, riskId) => {
  // if (!riskId) {
  //   throw new Error("Risk ID is missing.");
  // }

  // console.log("Making DELETE request for riskId:", riskId);
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/projects/${projectId}/risks/${riskId}`, config)
  return res.data

}

export default { getAll, createRisk, updateRisk, deleteRisk, setToken }