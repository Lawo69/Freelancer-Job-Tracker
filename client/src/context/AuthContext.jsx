import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  const [token, setToken] = useState(storedToken || null)
  const [user, setUser] = useState(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null
    } catch (err) {
      console.error("Invalid user JSON in localStorage:", err)
      localStorage.removeItem('user')
      return null
    }
  })

  const login = (newToken, newUser) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
