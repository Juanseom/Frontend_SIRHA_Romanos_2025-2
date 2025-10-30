import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('user')
    
    navigate('/login', { replace: true })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Cerrando sesión...</p>
    </div>
  )
}

export default Logout