import { useState } from 'react'

const StudentInfoModal = ({ isOpen, onClose, solicitud, onAprobar, onRechazar, onSolicitarInfo }) => {
  const [accion, setAccion] = useState(null)
  const [motivo, setMotivo] = useState('')
  const [error, setError] = useState('')
  const [mostrarHorario, setMostrarHorario] = useState(false)

  // Horario de ejemplo del estudiante (en producción vendría del backend)
  const horarioEstudiante = [
    { dia: 'Lunes', bloques: [
      { hora: '7:00-9:00 AM', materia: 'CALV - Cálculo Vectorial', salon: 'ED-301', profesor: 'Dr. Juan Pérez' },
      { hora: '2:00-4:00 PM', materia: 'DOSW - Diseño OO', salon: 'ED-205', profesor: 'Ing. Carlos Martínez' }
    ]},
    { dia: 'Martes', bloques: [
      { hora: '10:00-12:00 PM', materia: 'IPRO - Intro. Programación', salon: 'ED-104', profesor: 'Dra. Ana García' }
    ]},
    { dia: 'Miércoles', bloques: [
      { hora: '7:00-9:00 AM', materia: 'CALV - Cálculo Vectorial', salon: 'ED-301', profesor: 'Dr. Juan Pérez' },
      { hora: '2:00-4:00 PM', materia: 'FIEM - Física de Electromagnetismo', salon: 'ED-205', profesor: 'Ing. Carlos Martínez' }
    ]},
    { dia: 'Jueves', bloques: [
      { hora: '10:00-12:00 PM', materia: 'IPRO - Intro. Programación', salon: 'ED-104', profesor: 'Dra. Ana García' }
    ]},
    { dia: 'Viernes', bloques: [
      { hora: '8:00-10:00 AM', materia: 'MABA - Matemática Básica', salon: 'ED-402', profesor: 'Dr. Roberto Silva' }
    ]}
  ]

  if (!isOpen || !solicitud) return null

  const handleAprobar = () => {
    setAccion('aprobar')
    setMotivo('')
    setError('')
  }

  const handleRechazar = () => {
    setAccion('rechazar')
    setMotivo('')
    setError('')
  }

  const handleSolicitarInfo = () => {
    setAccion('solicitar-info')
    setMotivo('')
    setError('')
  }

  const handleConfirmar = () => {
    if (accion === 'rechazar' && (!motivo || motivo.trim().length < 10)) {
      setError('Debes escribir un motivo de al menos 10 caracteres')
      return
    }

    if (accion === 'solicitar-info' && (!motivo || motivo.trim().length < 10)) {
      setError('Debes especificar qué información necesitas (mínimo 10 caracteres)')
      return
    }

    if (accion === 'aprobar') {
      onAprobar(solicitud.id, motivo || 'Solicitud aprobada')
    } else if (accion === 'rechazar') {
      onRechazar(solicitud.id, motivo)
    } else if (accion === 'solicitar-info') {
      if (onSolicitarInfo) {
        onSolicitarInfo(solicitud.id, motivo)
      }
    }

    setAccion(null)
    setMotivo('')
    setError('')
    setMostrarHorario(false)
    onClose()
  }

  const handleCancelarAccion = () => {
    setAccion(null)
    setMotivo('')
    setError('')
  }

  const handleToggleHorario = () => {
    setMostrarHorario(!mostrarHorario)
  }

  const prioridadColor = (prioridad) => {
    if (prioridad === 'Media') return 'bg-yellow-500'
    if (prioridad === 'Baja') return 'bg-green-500'
    return 'bg-red-500'
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={accion ? undefined : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gray-200 px-6 py-4 flex justify-between items-center sticky top-0">
            <h2 className="text-xl font-bold">Detalle de Solicitud</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Información del Estudiante */}
            <div>
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <h3 className="text-lg font-bold">Información del Estudiante</h3>
                <button
                  onClick={handleToggleHorario}
                  className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {mostrarHorario ? '📅 Ocultar Horario' : '📅 Ver Horario'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Nombre:</p>
                  <p className="font-semibold">{solicitud.nombre}</p>
                </div>
                <div>
                  <p className="text-gray-600">Código:</p>
                  <p className="font-semibold">{solicitud.codigo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Carrera:</p>
                  <p className="font-semibold">{solicitud.carrera}</p>
                </div>
                <div>
                  <p className="text-gray-600">Semestre:</p>
                  <p className="font-semibold">{solicitud.semestre}</p>
                </div>
              </div>

              {/* Horario del Estudiante */}
              {mostrarHorario && (
                <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-sm mb-3 text-blue-900">📅 Horario Actual del Estudiante</h4>
                  <div className="space-y-3">
                    {horarioEstudiante.map((dia) => (
                      <div key={dia.dia} className="bg-white rounded p-3 border border-blue-100">
                        <p className="font-semibold text-sm text-blue-800 mb-2">{dia.dia}</p>
                        <div className="space-y-2">
                          {dia.bloques.map((bloque, idx) => (
                            <div key={idx} className="text-xs pl-3 border-l-2 border-blue-300">
                              <p className="font-semibold text-gray-800">{bloque.hora}</p>
                              <p className="text-gray-700">{bloque.materia}</p>
                              <p className="text-gray-500">{bloque.salon} - {bloque.profesor}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    💡 Verifica que el horario solicitado no genere conflictos
                  </p>
                </div>
              )}
            </div>

            {/* Información de la Solicitud */}
            <div>
              <h3 className="text-lg font-bold mb-3 border-b pb-2">Información de la Solicitud</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Tipo:</p>
                  <p className="font-semibold">{solicitud.tipo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha:</p>
                  <p className="font-semibold">{new Date(solicitud.fecha).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Prioridad:</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${prioridadColor(solicitud.prioridad)}`}></div>
                    <p className="font-semibold">{solicitud.prioridad}</p>
                  </div>
                </div>
              </div>

              {/* Detalles del cambio */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4">
                <p className="font-semibold mb-2">{solicitud.titulo}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {solicitud.grupoActual !== '-' && (
                    <div>
                      <p className="text-gray-600">Grupo Actual:</p>
                      <p className="font-semibold text-red-600">{solicitud.grupoActual}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">{solicitud.grupoActual !== '-' ? 'Grupo Destino:' : 'Grupo a Inscribir:'}</p>
                    <p className="font-semibold text-green-600">{solicitud.grupoDestino}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Justificación del estudiante */}
            {solicitud.observacion && (
              <div>
                <h3 className="text-lg font-bold mb-3 border-b pb-2">Justificación del Estudiante</h3>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <p className="text-sm text-gray-700">{solicitud.observacion}</p>
                </div>
              </div>
            )}

            {/* Sección de Acción */}
            {!accion ? (
              <div>
                <h3 className="text-lg font-bold mb-3 border-b pb-2">Acción</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleAprobar}
                    className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={handleRechazar}
                    className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  >
                    ✗ Rechazar
                  </button>
                  <button
                    onClick={handleSolicitarInfo}
                    className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                  >
                    ❓ Solicitar Info
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-3 border-b pb-2">
                  {accion === 'aprobar' ? '✓ Aprobar Solicitud' 
                    : accion === 'rechazar' ? '✗ Rechazar Solicitud'
                    : '❓ Solicitar Información Adicional'}
                </h3>
                
                <div className={`p-4 rounded-lg border-2 ${
                  accion === 'aprobar' ? 'bg-green-50 border-green-300' 
                    : accion === 'rechazar' ? 'bg-red-50 border-red-300'
                    : 'bg-yellow-50 border-yellow-300'
                }`}>
                  <label className="block text-sm font-semibold mb-2">
                    {accion === 'aprobar' ? 'Comentario (opcional):' 
                      : accion === 'rechazar' ? 'Motivo del rechazo (obligatorio):'
                      : 'Información que necesitas (obligatorio):'}
                  </label>
                  <textarea
                    value={motivo}
                    onChange={(e) => {
                      setMotivo(e.target.value)
                      setError('')
                    }}
                    placeholder={
                      accion === 'aprobar' 
                        ? 'Ej: Aprobada. Grupo con disponibilidad.'
                        : accion === 'rechazar'
                        ? 'Ej: Grupo sin cupos disponibles. Por favor selecciona otro grupo.'
                        : 'Ej: Por favor adjunta certificado médico que justifique el cambio de horario.'
                    }
                    className={`w-full border-2 rounded p-3 text-sm resize-none ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="4"
                  />
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{motivo.length}/500 caracteres</p>
                  
                  {accion === 'solicitar-info' && (
                    <div className="mt-3 bg-yellow-100 border border-yellow-300 rounded p-3 text-xs">
                      <p className="font-semibold text-yellow-800 mb-1">📌 Nota:</p>
                      <p className="text-yellow-700">
                        Se notificará al estudiante que debe proporcionar información adicional. 
                        La solicitud permanecerá en estado "pendiente" hasta recibir la información.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleCancelarAccion}
                    className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmar}
                    className={`flex-1 py-2 rounded-lg transition-colors font-semibold text-white ${
                      accion === 'aprobar' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : accion === 'rechazar'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }`}
                  >
                    Confirmar {accion === 'aprobar' ? 'Aprobación' 
                      : accion === 'rechazar' ? 'Rechazo'
                      : 'Solicitud'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!accion && (
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end sticky bottom-0">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StudentInfoModal