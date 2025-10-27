import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Obtener usuario del localStorage
  const userStr = localStorage.getItem('user')
  
  if (!userStr) {
    // No hay usuario logueado - redirigir al login
    return <Navigate to="/login" replace />
  }

  const user = JSON.parse(userStr)

  // Si se especificaron roles permitidos, verificar
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Usuario no tiene el rol adecuado - redirigir a su home
    if (user.role === 'student') {
      return <Navigate to="/student-home" replace />
    } else if (user.role === 'dean') {
      return <Navigate to="/dean-home" replace />
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-home" replace />
    }
    return <Navigate to="/login" replace />
  }

  // Usuario tiene acceso - mostrar el componente
  return children
}

export default ProtectedRoute