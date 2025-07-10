import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PublicRoute = () => {
  const { token } = useAuth()
  return token ? <Navigate to="/home" replace /> : <Outlet />
}

export default PublicRoute
