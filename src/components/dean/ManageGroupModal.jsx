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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header con gradiente - FIJO */}
        <div className="bg-gradient-to-r from-[#b50e11] to-[#8a0a0d] text-white p-6 rounded-t-xl relative flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold mb-2">Administrar Grupo</h2>
          <p className="text-white text-opacity-90 text-sm">Modifica la capacidad del grupo</p>
        </div>

        {/* Contenido - SCROLLEABLE */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Información del grupo */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 mb-6 border border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Materia:</span>
                <span className="font-semibold text-gray-800">{grupo.materia}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Grupo:</span>
                <span className="font-semibold text-gray-800">#{grupo.numeroGrupo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Código del grupo:</span>
                <span className="font-semibold text-gray-800">{grupo.codigoGrupo}</span>
              </div>
            </div>
          </div>

          {/* Estadísticas de cupos */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">📊 Capacidad Actual</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Cupos Ocupados</p>
                <p className="text-3xl font-bold text-blue-700">{grupo.cuposOcupados}</p>
                <p className="text-xs text-gray-500 mt-1">estudiantes inscritos</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Cupos Disponibles</p>
                <p className="text-3xl font-bold text-green-700">{cuposDisponibles}</p>
                <p className="text-xs text-gray-500 mt-1">espacios libres</p>
              </div>
            </div>
          </div>

          {/* Control de cupos totales */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">⚙️ Ajustar Capacidad Total</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Capacidad total del grupo</p>
                  <p className="text-xs text-gray-500">Mínimo: {grupo.cuposOcupados} (no puede ser menor a los ocupados)</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={cuposTotales <= grupo.cuposOcupados}
                  className={`w-12 h-12 rounded-lg font-bold text-xl transition-all ${
                    cuposTotales <= grupo.cuposOcupados
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  −
                </button>
                
                <div className="relative">
                  <input
                    type="number"
                    value={cuposTotales}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || grupo.cuposOcupados
                      if (val >= grupo.cuposOcupados) {
                        setCuposTotales(val)
                      }
                    }}
                    className="w-24 text-center text-3xl font-bold border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  />
                  <p className="text-xs text-center text-gray-500 mt-1">cupos totales</p>
                </div>
                
                <button
                  onClick={handleIncrement}
                  className="w-12 h-12 bg-green-500 text-white rounded-lg font-bold text-xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                >
                  +
                </button>
              </div>

              {/* Barra de progreso visual */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      (grupo.cuposOcupados / cuposTotales * 100) >= 90 ? 'bg-red-500' : 
                      (grupo.cuposOcupados / cuposTotales * 100) >= 70 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${(grupo.cuposOcupados / cuposTotales * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center text-gray-600 mt-2">
                  {Math.round((grupo.cuposOcupados / cuposTotales) * 100)}% de capacidad ocupada
                </p>
              </div>
            </div>
          </div>

          {/* Botón borrar */}
          <div className="mb-6">
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres eliminar este grupo? Esta acción no se puede deshacer.')) {
                  onDelete(grupo.id)
                  onClose()
                }
              }}
              className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar Grupo Permanentemente
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-[#b50e11] text-white rounded-lg hover:bg-[#8a0a0d] transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageGroupModal