import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/projects'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Get all risks

const getAll = async (projectId) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(`${baseUrl}/projects/${projectId}`, config)
  return res.data
}

// create a new Risk 
const createRisk = async (projectId, newRisk) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const res = await axios.post(`${baseUrl}/projects/${projectId}`, newRisk, config)
  return res.data
}

const updateRisk = async (projectId, updatedRisk) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/risks/${projectId}`, updatedRisk, config)
  return res.data
}

const deleteRisk = async (projectId) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/risks/${projectId}`, config)
  return res.data

}

export default { getAll, createRisk, updateRisk, deleteRisk, setToken }