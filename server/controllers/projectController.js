import Project from '../models/projectModel.js'

// Create project
export const createProject = async (req, res) => {
  const { title, clientName, clientEmail, status, deadline, notes } = req.body

  const project = await Project.create({
    user: req.user._id,
    title,
    clientName,
    clientEmail,
    status,
    deadline,
    notes,
  })

  res.status(201).json(project)
}

// Get all projects
export const getProjects = async (req, res) => {
  const { status, deadline } = req.query
  const query = { user: req.user._id }

  if (status) query.status = status
  if (deadline) query.deadline = { $lte: new Date(deadline) }

  const projects = await Project.find(query).sort({ createdAt: -1 })
  res.json(projects)
}

// Update project
export const updateProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id })
  if (!project) return res.status(404).json({ message: 'Project not found' })

  Object.assign(project, req.body)
  const updated = await project.save()
  res.json(updated)
}

// Delete project
export const deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  })
  if (!project) return res.status(404).json({ message: 'Project not found' })
  res.json({ message: 'Project deleted' })
}
