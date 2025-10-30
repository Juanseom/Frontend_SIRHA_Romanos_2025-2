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
    },
    // Profesor
    'profesor@escuelaing.edu.co': {
      password: 'profesor123',
      role: 'profesor',
      nombre: 'Prof. Roberto Martínez'
    },
    'docente.sistemas@escuelaing.edu.co': {
      password: 'profesor123',
      role: 'profesor',
      nombre: 'Prof. Laura Gómez'
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
    } else if (usuario.role === 'profesor') {
      navigate('/profesor-home')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4" 
         style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fondoUniversidad})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="w-full max-w-md">
        {/* Todo en un solo recuadro */}
        <div className="bg-white/85 backdrop-blur-sm rounded-xl shadow-2xl px-8 pb-8 pt-2">
          {/* Logo */}
          <div className="text-center mb-1 pb-1">
            <img 
              src={logoSirha} 
              alt="SIRHA Logo" 
              className="h-32 w-auto mx-auto"
            />
          </div>

          {/* Cabecera de bienvenida */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Bienvenido</h1>
            <p className="text-gray-600 text-sm">Ingresa a tu cuenta académica</p>
          </div>
          
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

        {/* Footer */}
        <div className="mt-6">
          {/* Soporte técnico */}
          <div className="bg-white/90 backdrop-blur rounded-lg p-4 mb-3 text-center">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">¿Problemas para ingresar?</span>
            </p>
            <p className="text-xs text-gray-600 mb-2">
              Para soporte técnico, comunícate con:
            </p>
            <a 
              href="mailto:soporte@escuelaing.edu.co" 
              className="text-sm text-[#b50e11] hover:underline font-medium"
            >
              soporte@escuelaing.edu.co
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-white drop-shadow-lg">
              © 2025 Escuela Colombiana de Ingeniería Julio Garavito
            </p>
            <p className="text-xs text-white/80 drop-shadow-lg mt-1">
              Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login