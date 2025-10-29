import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileDropdown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  // Obtener usuario del localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  const handleLogout = () => {
    // Mostrar confirmación
    const confirmar = window.confirm('¿Estás seguro de que deseas cerrar sesión?')
    
    if (confirmar) {
      // Limpiar localStorage
      localStorage.removeItem('user')
      
      // Cerrar el dropdown
      setIsOpen(false)
      
      // Redirigir al login
      navigate('/login')
    }
  }

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-200 transition-colors flex items-center justify-center"
        aria-label="Profile"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer click afuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-20">
            {/* User Info */}
            {user && (
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">{user.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1 capitalize">
                  {user.role === 'student' ? 'Estudiante' : 
                   user.role === 'dean' ? 'Decano' : 
                   'Administrador'}
                </p>
              </div>
            )}

            {/* Menu Options */}
            <button
              onClick={() => {
                setIsOpen(false)
                // Aquí puedes navegar a perfil si existe la página
                alert('Funcionalidad de Mi Perfil - Por implementar')
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span className="text-sm">Mi Perfil</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false)
                // Aquí puedes navegar a configuración si existe la página
                alert('Funcionalidad de Configuración - Por implementar')
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
              <span className="text-sm">Configuración</span>
            </button>

            <div className="border-t border-gray-200 my-1"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileDropdown