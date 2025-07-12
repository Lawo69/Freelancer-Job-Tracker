import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const AddProjectForm = ({ onSubmit, onClose, initialData = {} }) => {
  const [form, setForm] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    status: 'Pending',
    deadline: '',
    notes: '',
    ...initialData,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  console.log("Form Submitted:", form) // 🪵 Debug log
  try {
    await onSubmit(form)
    console.log("Project Updated or Added Successfully")
    if (onClose) onClose()
  } catch (error) {
    console.error("Submit Error:", error) // 🛑 Catch if onSubmit throws
  }
}


  return (
    <div className="relative max-w-xl mx-auto p-3 bg-secondary rounded-lg shadow text-white">
      <h2 className="text-2xl font-bold mb-6">
        {initialData?._id ? 'Edit Project' : 'Add New Project'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="clientEmail"
          placeholder="Client Email"
          type="email"
          value={form.clientEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="notes"
          placeholder="Project Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 font-semibold cursor-pointer"
        >
          Save Project
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 font-semibold cursor-pointer ml-5"
        >
          Close
        </button>
      </form>
    </div>
  )
}

export default AddProjectForm
