import axios from '../utils/axios'

export const fetchProjects = async (filters = {}) => {
  const res = await axios.get('/projects', { params: filters })
  return res.data
}

export const createProject = async (projectData) => {
  const res = await axios.post('/projects', projectData)
  return res.data
}

export const updateProject = async (id, updatedData) => {
  const res = await axios.put(`/projects/${id}`, updatedData)
  return res.data
}

export const deleteProject = async (id) => {
  const res = await axios.delete(`/projects/${id}`)
  return res.data
}
