import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem('user')
  
  if (!userStr) {
    // No hay usuario logueado - redirigir al login
    return <Navigate to="/login" replace />
  }

  const user = JSON.parse(userStr)

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'student') {
      return <Navigate to="/student-home" replace />
    } else if (user.role === 'dean') {
      return <Navigate to="/dean-home" replace />
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-home" replace />
    }
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute