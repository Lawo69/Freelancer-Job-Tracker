import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/auth', userRoutes)
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => res.send('API is running'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
