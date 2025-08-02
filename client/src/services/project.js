import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/projects'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Get All projects

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const req = axios.get(baseUrl, config)
  return req.then(res => res.data)
}


// Create a new project

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

// Update a project

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

// Delete a project

const deleteProject = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, create, update, deleteProject, setToken }