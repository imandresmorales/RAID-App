import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/projects'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Get All projects

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(baseUrl, config)
  return res.data
}


// Create a new project

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

// Update a project

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return res.data
}

// Delete a project

const deleteProject = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data

}

export default { getAll, create, update, deleteProject, setToken }