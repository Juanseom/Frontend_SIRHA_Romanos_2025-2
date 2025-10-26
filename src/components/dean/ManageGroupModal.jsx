import { useState } from 'react'

const ManageGroupModal = ({ isOpen, onClose, grupo, onSave, onDelete }) => {
  const [cuposTotales, setCuposTotales] = useState(grupo?.cuposTotales || 50)

  if (!isOpen || !grupo) return null

  const cuposDisponibles = cuposTotales - grupo.cuposOcupados

  const handleIncrement = () => {
    setCuposTotales(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (cuposTotales > grupo.cuposOcupados) {
      setCuposTotales(prev => prev - 1)
    }
  }

  const handleConfirm = () => {
    onSave({ ...grupo, cuposTotales })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-8 relative">
        {/* Título */}
        <h2 className="text-xl font-bold mb-4 text-center">Administrar Grupo</h2>
        <div className="w-full h-1 bg-black mb-6"></div>

        {/* Contenido */}
        <div className="bg-gray-200 p-6 rounded mb-6 space-y-2">
          <p><strong>Materia:</strong> {grupo.materia}</p>
          <p><strong>Grupo:</strong> {grupo.numeroGrupo}</p>
          <p><strong>Código del grupo:</strong> {grupo.codigoGrupo}</p>
          
          <p><strong>Cupos ocupados:</strong> {grupo.cuposOcupados} estudiantes</p>
          <p><strong>Cupos disponibles:</strong> {cuposDisponibles} estudiantes</p>
          
          {/* Control de cupos totales */}
          <div className="flex items-center gap-3 mt-4">
            <strong>Cupos totales:</strong>
            <button
              onClick={handleDecrement}
              className="w-8 h-8 border border-gray-400 rounded hover:bg-gray-300"
              disabled={cuposTotales <= grupo.cuposOcupados}
            >
              -
            </button>
            <input
              type="number"
              value={cuposTotales}
              onChange={(e) => {
                const val = parseInt(e.target.value) || grupo.cuposOcupados
                if (val >= grupo.cuposOcupados) {
                  setCuposTotales(val)
                }
              }}
              className="w-16 text-center border border-gray-400 rounded px-2 py-1"
            />
            <button
              onClick={handleIncrement}
              className="w-8 h-8 border border-gray-400 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Botón borrar */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres borrar este grupo?')) {
                onDelete(grupo.id)
                onClose()
              }
            }}
            className="px-8 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors"
          >
            Borrar Grupo
          </button>
        </div>

        {/* Botones inferiores */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-400 rounded hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-8 py-2 border border-gray-400 rounded hover:bg-gray-100 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageGroupModal