import React, { useState } from 'react'
import LoginImage from "/assets/img/login-image.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/auth'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const { login: loginContext } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(email, password)
      const { token, user } = res.data
      loginContext(token, user)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-primary">
      <div className="flex flex-col md:flex-row w-full max-w-7xl shadow-xl rounded-2xl overflow-hidden bg-secondary text-white">
        
        {/* Left side image section */}
        <div className="hidden md:flex basis-1/2 relative max-h-[500px]">
          <div className="relative w-full h-[500px]">
            <img
              src={LoginImage}
              alt="register"
              className="w-full h-full object-cover opacity-80 rounded-l-2xl"
            />
            <div className="absolute top-4 left-4">
              <span className="text-white font-bold text-xl leading-6">
                Freelancer<br />Job<br />Tracker
              </span>
            </div>
            <div className="absolute bottom-6 left-6 text-lg font-light">
              Manage Pressure,<br /> Create a Card.
            </div>
          </div>
        </div>
            
        {/* Right side form section */}
        <div className="flex justify-center items-center w-full md:w-1/2 px-6 py-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">Log in to your account</h2>
            <p className="text-sm text-gray-400 mb-6">
              Create new account?{" "}
              <Link to="/register" className="text-indigo-400 hover:underline">
                Register
              </Link>
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                required
              />
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-2.5 text-gray-400 cursor-pointer"
                >
                  {show ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
