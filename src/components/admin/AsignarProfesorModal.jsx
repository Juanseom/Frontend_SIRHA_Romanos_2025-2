import { useState } from 'react'

const AsignarProfesorModal = ({ isOpen, onClose, grupo, onAsignar }) => {
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('')

  // Lista de profesores disponibles (vendría del backend)
  const profesores = [
    'ANDRÉS MARTÍN QUINTERO',
    'MARÍA LÓPEZ GARCÍA',
    'CARLOS PÉREZ RODRÍGUEZ',
    'ANA TORRES GONZÁLEZ',
    'ROBERTO SÁNCHEZ VARGAS',
    'LAURA GÓMEZ MARTÍNEZ',
    'DIEGO MORALES CASTRO',
    'PATRICIA GUTIÉRREZ DÍAZ',
    'FERNANDO ACOSTA RUIZ',
    'SOFÍA RAMÍREZ LÓPEZ',
    'JUAN PABLO CONTRERAS',
    'ELIZABETH CORREA SUÁREZ',
    'NIKOLAS MARTÍNEZ',
    'SANDRA CASALLAS AMAYA',
    'IGNACIO CASTILLO RENDÓN',
    'JUAN SEBASTIÁN ORTEGA',
    'MARÍA BELÉN QUINTERO',
    'CARLOS EDUARDO DÍAZ',
    'ANDREA JIMÉNEZ RUIZ'
  ]

  if (!isOpen || !grupo) return null

  const handleAsignar = () => {
    if (profesorSeleccionado && profesorSeleccionado !== grupo.instructor) {
      onAsignar(profesorSeleccionado)
      setProfesorSeleccionado('')
    }
  }

  const handleClose = () => {
    setProfesorSeleccionado('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Asignar Profesor</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Información del grupo */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-sm mb-3 text-gray-700">Información del Grupo:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Clase:</span>
                <span className="ml-2 font-bold">{grupo.clase}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Sección:</span>
                <span className="ml-2">{grupo.seccion}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Días y Horas:</span>
                <span className="ml-2">{grupo.diasHoras}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Aula:</span>
                <span className="ml-2">{grupo.aula}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Ciclo:</span>
                <span className="ml-2">{grupo.ciclo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Cupos:</span>
                <span className="ml-2">{grupo.cuposOcupados}/{grupo.cuposTotales}</span>
              </div>
            </div>
          </div>

          {/* Profesor actual */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold text-blue-800">👤 Profesor actual:</span>
              <span className="ml-2 text-blue-900 font-medium">{grupo.instructor}</span>
            </p>
          </div>

          {/* Selección de nuevo profesor */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Seleccionar nuevo profesor: <span className="text-red-500">*</span>
            </label>
            <select
              value={profesorSeleccionado}
              onChange={(e) => setProfesorSeleccionado(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Seleccionar profesor --</option>
              {profesores.map((profesor, index) => (
                <option 
                  key={index} 
                  value={profesor}
                  disabled={profesor === grupo.instructor}
                >
                  {profesor} {profesor === grupo.instructor ? '(Actual)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Advertencia si se selecciona el mismo */}
          {profesorSeleccionado === grupo.instructor && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Este profesor ya está asignado a este grupo.
              </p>
            </div>
          )}

          {/* Vista previa del cambio */}
          {profesorSeleccionado && profesorSeleccionado !== grupo.instructor && (
            <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">
                📝 Vista previa del cambio:
              </p>
              <div className="text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="line-through text-red-600">{grupo.instructor}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-green-600">{profesorSeleccionado}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            disabled={!profesorSeleccionado || profesorSeleccionado === grupo.instructor}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            ✓ CONFIRMAR ASIGNACIÓN
          </button>
        </div>
      </div>
    </div>
  )
}

export default AsignarProfesorModal