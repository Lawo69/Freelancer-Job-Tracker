import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

import AddProjectForm from '../../components/forms/AddProjectForm'

const HomePage = () => {
  const [editingProject, setEditingProject] = useState(null)
  const [statusFilter, setStatusFilter] = useState('All')

  const { logout } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)

  const {
    projects,
    getAllProjects,
    addProject,
    loading,
    removeProject,
    editProject,
  } = useProjects()

  useEffect(() => {
    getAllProjects()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleAddProject = () => {
    setEditingProject(null)
    setShowForm(!showForm)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDeleteProject = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?")
    if (confirm) {
      await removeProject(id)
    }
  }

  const filteredProjects =
  statusFilter === 'All'
    ? projects
    : projects.filter((p) => p.status === statusFilter)

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-secondary">
        <h1 className="text-lg font-semibold">Freelancer Job Tracker</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddProject}
            className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 font-semibold cursor-pointer"
          >
            {showForm ? 'Close Form' : 'Add Project'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="px-8 mt-6">
        <label htmlFor="statusFilter" className="text-sm font-semibold mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 text-black bg-white rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>


      {/* Project Cards Section */}
      <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">

        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border relative border-gray-300 rounded-2xl p-4 h-48 flex flex-col justify-center hover:border-white transition"
              >
                <h2 className="text-lg font-semibold mb-1 border-b">{project.title}</h2>
                <p className="text-sm text-gray-300">Client: {project.clientName}</p>
                <p className="text-sm text-gray-300">
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm mt-5 ${
                    project.status === 'Pending'
                      ? 'text-red-500'
                      : project.status === 'In Progress'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  Status: {project.status}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="text-indigo-400 hover:text-indigo-600 flex items-center gap-1 text-sm absolute top-5 right-10 cursor-pointer"
                    onClick={() => handleEditProject(project)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm absolute top-5 right-5 cursor-pointer"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        )}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="max-w-xl w-full p-6 bg-secondary rounded-lg shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <AddProjectForm
              onSubmit={async (data) => {
                console.log("onSubmit called with:", data)
                if (editingProject) {
                  await editProject(editingProject._id, data)
                  console.log("editProject finished")
                } else {
                  await addProject(data)
                }
                setShowForm(false)
                setEditingProject(null)
              }}
              onClose={() => {
                setShowForm(false)
                setEditingProject(null)
              }}
              initialData={editingProject}
            />


          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
