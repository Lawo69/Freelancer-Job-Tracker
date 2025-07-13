# 🧑‍💻 Freelancer Job Tracker

A full-stack job and project tracking app built for freelancers to manage clients, deadlines, and notes efficiently — with secure user authentication and protected routes.

## 🚀 Features

- 🔐 Register & Login with JWT Auth
- 🧾 Track and manage freelance jobs/projects
- 📅 Show deadlines and client info
- ✏️ Full Project CRUD functionality
- ⚡ Protected frontend and backend routes
- 📦 MongoDB cloud database
- 📱 Fully responsive UI with React + Tailwind

## 🛠️ Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Toastify

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📁 Project Structure

freelancer-job-tracker/
├── client/ # React frontend
├── server/ # Express backend
├── .env # env file
├── README.md


## ⚙️ Setup Instructions

### 1. 📦 Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Git installed


### 2. 🔧 Backend Setup

<pre> <code>
bash cd server
npm install
</code> </pre>
Create a .env file:

Create a .env file
<pre> <code>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
</code> </pre>

Then start the backend:

<pre> <code>
npm run dev
</code> </pre>
API will run at: http://localhost:5000/api

### 4. 💻 Frontend Setup

<pre> <code>
cd ../client 
npm install 
npm run dev
</code> </pre>
Frontend will run at: http://localhost:5173

✅ How to Use
- Register a new user
- Login to get JWT and access dashboard
- Create, edit, or delete projects
- Logout and try accessing protected routes — they’re blocked!
