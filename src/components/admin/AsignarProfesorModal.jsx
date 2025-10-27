import { useState } from 'react'

const AsignarProfesorModal = ({ isOpen, onClose, grupo, onAsignar }) => {
  const [materiaAsignar, setMateriaAsignar] = useState('')
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('')

  // Lista de profesores disponibles (vendría del backend)
  const profesores = [
    'ANDRÉS MARTÍN QUINTERO',
    'MARÍA LÓPEZ GARCÍA',
    'CARLOS PÉREZ RODRÍGUEZ',
    'ANA TORRES GONZÁLEZ',
    'ROBERTO SÁNCHEZ VARGAS'
  ]

  if (!isOpen || !grupo) return null

  const handleAsignar = () => {
    if (profesorSeleccionado) {
      onAsignar(profesorSeleccionado)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Asignar Profesor</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Información del grupo */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Clase:</span>
                <span className="ml-2">{grupo.clase}</span>
              </div>
              <div>
                <span className="font-semibold">Sección:</span>
                <span className="ml-2">{grupo.seccion}</span>
              </div>
              <div>
                <span className="font-semibold">Días y Horas:</span>
                <span className="ml-2">{grupo.diasHoras}</span>
              </div>
              <div>
                <span className="font-semibold">Aula:</span>
                <span className="ml-2">{grupo.aula}</span>
              </div>
            </div>
          </div>

          {/* Selección de materia */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Materia a asignar:</label>
            <input
              type="text"
              value={materiaAsignar}
              onChange={(e) => setMateriaAsignar(e.target.value)}
              placeholder="Ej: PSICOLOGÍA SOCIAL"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Selección de profesor */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Nombre profesor:</label>
            <select
              value={profesorSeleccionado}
              onChange={(e) => setProfesorSeleccionado(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="">Seleccionar profesor...</option>
              {profesores.map((profesor, index) => (
                <option key={index} value={profesor}>
                  {profesor}
                </option>
              ))}
            </select>
          </div>

          {/* Información actual */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-semibold">Profesor actual:</span> {grupo.instructor}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            disabled={!profesorSeleccionado}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  )
}

export default AsignarProfesorModal