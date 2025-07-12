import { useState } from 'react'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projectApi'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAllProjects = async (filters = {}) => {
    try {
      setLoading(true)
      const data = await fetchProjects(filters)
      setProjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addProject = async (project) => {
    try {
      const newProject = await createProject(project)
      setProjects((prev) => [newProject, ...prev])
    } catch (err) {
      setError(err.message)
    }
  }

  const removeProject = async (id) => {
    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const editProject = async (id, data) => {
    try {
      const updated = await updateProject(id, data)
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      )
    } catch (err) {
      setError(err.message)
    }
  }


  return {
    projects,
    loading,
    error,
    getAllProjects,
    addProject,
    removeProject,
    editProject,
  }
}
