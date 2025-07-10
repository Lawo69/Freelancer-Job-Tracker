import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
