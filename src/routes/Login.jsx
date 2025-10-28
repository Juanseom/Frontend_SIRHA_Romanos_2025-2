import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoSirha from '../assets/logos/sirha.png'
import fondoUniversidad from '../assets/images/fondoUniversidad.png'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Usuarios de ejemplo (en producción vendrían del backend)
  const usuarios = {
    // Estudiante
    'estudiante@escuelaing.edu.co': {
      password: 'estudiante123',
      role: 'student',
      nombre: 'Juan Sebastián Ortega'
    },
    'maria.quintero@escuelaing.edu.co': {
      password: 'estudiante123',
      role: 'student',
      nombre: 'María Belén Quintero'
    },
    // Decano
    'decano@escuelaing.edu.co': {
      password: 'decano123',
      role: 'dean',
      nombre: 'Dr. Carlos Pérez'
    },
    'dean.sistemas@escuelaing.edu.co': {
      password: 'decano123',
      role: 'dean',
      nombre: 'Dra. Ana Torres'
    },
    // Admin
    'admin@escuelaing.edu.co': {
      password: 'admin123',
      role: 'admin',
      nombre: 'Administrador SIRHA'
    },
    'admin.sistemas@escuelaing.edu.co': {
      password: 'admin123',
      role: 'admin',
      nombre: 'Admin Sistemas'
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Limpiar error al escribir
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800))

    // Validar credenciales
    const usuario = usuarios[formData.email]
    
    if (!usuario) {
      setError('Usuario no encontrado')
      setLoading(false)
      return
    }

    if (usuario.password !== formData.password) {
      setError('Contraseña incorrecta')
      setLoading(false)
      return
    }

    // Login exitoso - guardar en localStorage
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      role: usuario.role,
      nombre: usuario.nombre
    }))

    // Redirigir según el rol
    if (usuario.role === 'student') {
      navigate('/student-home')
    } else if (usuario.role === 'dean') {
      navigate('/dean-home')
    } else if (usuario.role === 'admin') {
      navigate('/admin-home')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" 
         style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fondoUniversidad})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg inline-block px-8 py-6 mb-4 shadow-lg">
            <img 
              src={logoSirha} 
              alt="SIRHA Logo" 
              className="h-20 w-auto mx-auto"
            />
          </div>
          <p className="text-white text-lg font-semibold drop-shadow-lg">Bienvenido</p>
          <p className="text-white text-sm drop-shadow-lg">Ingresa a tu cuenta académica</p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Institucional
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@escuelaing.edu.co"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#b50e11] transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#b50e11] transition-colors"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b50e11] hover:bg-[#8a0a0d] text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Recuperar contraseña */}
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-[#b50e11] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* Información de usuarios de prueba */}
        <div className="mt-6 bg-white/90 backdrop-blur border border-blue-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-blue-900 mb-2">🔐 Usuarios de prueba:</p>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Estudiante:</strong> estudiante@escuelaing.edu.co / estudiante123</p>
            <p><strong>Decano:</strong> decano@escuelaing.edu.co / decano123</p>
            <p><strong>Admin:</strong> admin@escuelaing.edu.co / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login