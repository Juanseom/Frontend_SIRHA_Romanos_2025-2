import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose, role }) => {
  const navigate = useNavigate()

  // Opciones según el rol
  const menuOptions = {
    dean: [
      { label: 'Gestionar Solicitudes', path: '/dean/gestionar-solicitudes' },
      { label: 'Periodos', path: '/dean/periodos' },
      { label: 'Monitorear Grupos', path: '/dean/monitorear-grupos' }
    ],
    student: [
      { label: 'Mis Solicitudes', path: '/student/mis-solicitudes' },
      { label: 'Semáforo Académico', path: '/student/semaforo' },
      { label: 'Mis Horarios', path: '/student/horarios' }
    ],
    admin: [
      { label: 'Gestionar Solicitudes', path: '/admin/gestionar-solicitudes' },
      { label: 'Gestionar Materias', path: '/admin/gestionar-materias' },
      { label: 'Grupos y Materias', path: '/admin/grupos-materias' },
      { label: 'Periodos', path: '/admin/periodos' },
      { label: 'Monitorear Grupos', path: '/admin/monitorear-grupos' },
      { label: 'Estadísticas', path: '/admin/estadisticas' }
    ]
  }

  const options = menuOptions[role] || []

  const handleNavigation = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#3d4f5c] text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header del sidebar con botón cerrar */}
        <div className="flex justify-end p-4 border-b border-gray-600">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Opciones del menú */}
        <nav className="mt-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(option.path)}
              className="w-full text-left px-6 py-4 hover:bg-[#4a5d6b] transition-colors border-b border-gray-600 text-base"
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar