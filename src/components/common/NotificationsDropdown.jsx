import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotificationsDropdown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  // Obtener usuario del localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userRole = user?.role || 'student'

  // Notificaciones según el rol
  const notificacionesPorRol = {
    student: [
      {
        id: 1,
        tipo: 'solicitud',
        titulo: 'Solicitud Aprobada',
        mensaje: 'Tu solicitud de cambio de grupo para Cálculo II ha sido aprobada.',
        fecha: '2025-01-28 10:30 AM',
        leida: false,
        icono: '✅',
        color: 'bg-green-50 border-green-200'
      },
      {
        id: 2,
        tipo: 'recordatorio',
        titulo: 'Recordatorio de Inscripción',
        mensaje: 'El periodo de inscripción para el semestre 2025-2 cierra en 3 días.',
        fecha: '2025-01-28 09:15 AM',
        leida: false,
        icono: '⏰',
        color: 'bg-yellow-50 border-yellow-200'
      },
      {
        id: 3,
        tipo: 'solicitud',
        titulo: 'Solicitud Rechazada',
        mensaje: 'Tu solicitud de inscripción para Física III fue rechazada. Motivo: Grupo lleno.',
        fecha: '2025-01-27 04:20 PM',
        leida: true,
        icono: '❌',
        color: 'bg-red-50 border-red-200'
      },
      {
        id: 4,
        tipo: 'informacion',
        titulo: 'Nueva Información',
        mensaje: 'Se ha publicado el calendario académico para el próximo semestre.',
        fecha: '2025-01-27 02:45 PM',
        leida: true,
        icono: 'ℹ️',
        color: 'bg-blue-50 border-blue-200'
      },
      {
        id: 5,
        tipo: 'solicitud',
        titulo: 'Solicitud en Proceso',
        mensaje: 'Tu solicitud de bajar asignatura está siendo revisada por el decano.',
        fecha: '2025-01-26 11:00 AM',
        leida: true,
        icono: '⏳',
        color: 'bg-blue-50 border-blue-200'
      }
    ],
    dean: [
      {
        id: 1,
        tipo: 'solicitud',
        titulo: 'Nueva Solicitud Pendiente',
        mensaje: 'El estudiante Juan Ortega ha solicitado bajar la asignatura de Física III.',
        fecha: '2025-01-28 11:45 AM',
        leida: false,
        icono: '📝',
        color: 'bg-yellow-50 border-yellow-200'
      },
      {
        id: 2,
        tipo: 'solicitud',
        titulo: '5 Solicitudes por Revisar',
        mensaje: 'Tienes 5 solicitudes de cambio de grupo pendientes de aprobación.',
        fecha: '2025-01-28 09:00 AM',
        leida: false,
        icono: '📋',
        color: 'bg-yellow-50 border-yellow-200'
      },
      {
        id: 3,
        tipo: 'urgente',
        titulo: 'Solicitud Urgente',
        mensaje: 'Solicitud de inscripción extemporánea requiere aprobación inmediata.',
        fecha: '2025-01-28 08:30 AM',
        leida: false,
        icono: '🚨',
        color: 'bg-red-50 border-red-200'
      },
      {
        id: 4,
        tipo: 'recordatorio',
        titulo: 'Recordatorio: Cierre de Periodo',
        mensaje: 'El periodo de aprobación de solicitudes cierra en 2 días.',
        fecha: '2025-01-27 03:00 PM',
        leida: true,
        icono: '⏰',
        color: 'bg-blue-50 border-blue-200'
      },
      {
        id: 5,
        tipo: 'informacion',
        titulo: 'Reporte Semanal',
        mensaje: 'Esta semana se procesaron 47 solicitudes: 35 aprobadas, 12 rechazadas.',
        fecha: '2025-01-27 10:00 AM',
        leida: true,
        icono: '📊',
        color: 'bg-blue-50 border-blue-200'
      }
    ],
    admin: [
      {
        id: 1,
        tipo: 'sistema',
        titulo: 'Actualización del Sistema',
        mensaje: 'Se ha programado mantenimiento del sistema para el 30 de enero a las 2:00 AM.',
        fecha: '2025-01-28 12:00 PM',
        leida: false,
        icono: '⚙️',
        color: 'bg-purple-50 border-purple-200'
      },
      {
        id: 2,
        tipo: 'alerta',
        titulo: 'Alto Volumen de Solicitudes',
        mensaje: 'Se han recibido 150 solicitudes en las últimas 24 horas. Considerar aumentar capacidad.',
        fecha: '2025-01-28 10:15 AM',
        leida: false,
        icono: '⚠️',
        color: 'bg-yellow-50 border-yellow-200'
      },
      {
        id: 3,
        tipo: 'usuario',
        titulo: 'Nuevo Usuario Registrado',
        mensaje: 'Se ha registrado un nuevo decano: Dr. Roberto Martínez - Ingeniería Industrial.',
        fecha: '2025-01-28 09:30 AM',
        leida: false,
        icono: '👤',
        color: 'bg-green-50 border-green-200'
      },
      {
        id: 4,
        tipo: 'reporte',
        titulo: 'Reporte Mensual Generado',
        mensaje: 'El reporte de actividad de enero está disponible para revisión.',
        fecha: '2025-01-27 05:00 PM',
        leida: true,
        icono: '📈',
        color: 'bg-blue-50 border-blue-200'
      },
      {
        id: 5,
        tipo: 'error',
        titulo: 'Error en Sincronización',
        mensaje: 'La sincronización con el sistema académico falló. Verificar conexión.',
        fecha: '2025-01-27 02:30 PM',
        leida: true,
        icono: '❗',
        color: 'bg-red-50 border-red-200'
      }
    ],
    profesor: [
      {
        id: 1,
        tipo: 'solicitud',
        titulo: 'Nueva Solicitud Pendiente',
        mensaje: 'El estudiante Juan Ortega ha solicitado bajar la asignatura de DOSW.',
        fecha: '2025-01-28 11:45 AM',
        leida: false,
        icono: '📝',
        color: 'bg-yellow-50 border-yellow-200'
      },
    ]
  }

  // Obtener notificaciones según el rol
  const notificaciones = notificacionesPorRol[userRole] || []

  // Contar notificaciones no leídas
  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length

  const marcarComoLeida = (id) => {
    // llamada al backend
    console.log('Marcar notificación como leída:', id)
  }

  const marcarTodasComoLeidas = () => {
    // llamada al backend
    console.log('Marcar todas como leídas')
    setIsOpen(false)
  }

  const verTodasLasNotificaciones = () => {
    setIsOpen(false)
    if (userRole === 'student') {
      navigate('/student/notificaciones')
    } else if (userRole === 'dean') {
      navigate('/dean/notificaciones')
    } else if (userRole === 'admin') {
      navigate('/admin/notificaciones')
    }
  }

  return (
    <div className="relative">
      {/* Notifications Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-200 transition-colors relative flex items-center justify-center"
        aria-label="Notifications"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
        
        {/* Badge de notificaciones no leídas */}
        {notificacionesNoLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {notificacionesNoLeidas}
          </span>
        )}
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
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-20 max-h-[500px] overflow-hidden flex flex-col">
            {/* Header del dropdown */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Notificaciones</h3>
                {notificacionesNoLeidas > 0 && (
                  <span className="bg-[#b50e11] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {notificacionesNoLeidas} nuevas
                  </span>
                )}
              </div>
            </div>

            {/* Lista de notificaciones */}
            <div className="overflow-y-auto flex-1">
              {notificaciones.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notificaciones.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => marcarComoLeida(notif.id)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notif.leida ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icono */}
                        <div className="text-2xl mt-1 flex-shrink-0">
                          {notif.icono}
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-semibold text-gray-800 ${!notif.leida ? 'font-bold' : ''}`}>
                              {notif.titulo}
                            </p>
                            {!notif.leida && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notif.mensaje}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.fecha}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <div className="text-4xl mb-2">🔔</div>
                  <p className="text-gray-500 text-sm">No tienes notificaciones</p>
                </div>
              )}
            </div>

            {/* Footer con acciones */}
            {notificaciones.length > 0 && notificacionesNoLeidas > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={marcarTodasComoLeidas}
                  className="w-full text-sm text-[#b50e11] hover:bg-red-50 font-medium py-2 px-3 rounded-lg transition-colors"
                >
                  Marcar todas como leídas
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationsDropdown