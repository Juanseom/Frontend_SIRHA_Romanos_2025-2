import { useState } from 'react'

const BuscarGrupoModal = ({ isOpen, onClose }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('')

  if (!isOpen) return null

  const handleBuscar = () => {
    // Aquí iría la lógica de búsqueda con el backend
    console.log('Buscando:', terminoBusqueda)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Buscar Grupo o Materia</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <label className="block text-sm font-semibold mb-2">Código de clase o nombre de materia:</label>
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
            placeholder="Ej: 1624 o PSICOLOGÍA"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg mb-4"
            autoFocus
          />

          <p className="text-sm text-gray-600">
            Ingrese el código de la clase o el nombre de la materia para buscar.
          </p>
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
            onClick={handleBuscar}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuscarGrupoModal