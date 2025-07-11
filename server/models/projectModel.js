import mongoose from 'mongoose'

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    clientName: { type: String },
    clientEmail: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    deadline: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
)

const Project = mongoose.model('Project', projectSchema)
export default Project
