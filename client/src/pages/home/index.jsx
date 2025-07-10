import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-400 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 transition duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default HomePage
