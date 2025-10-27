const GruposStats = () => {
  // Datos de ejemplo - vendrían del backend
  const estadisticasGrupos = {
    totalGrupos: 156,
    gruposLlenos: 42,
    gruposDisponibles: 114,
    capacidadPromedio: 67,
    materiaMasDemandada: 'DOSW - Desarrollo y Operaciones Software'
  }

  return (
    <div className="max-w-6xl">
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Estadísticas de Grupos</h2>
        
        {/* Resumen general */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Total de Grupos</p>
            <p className="text-3xl font-bold text-blue-600">{estadisticasGrupos.totalGrupos}</p>
          </div>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Disponibles</p>
            <p className="text-3xl font-bold text-green-600">{estadisticasGrupos.gruposDisponibles}</p>
          </div>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Llenos</p>
            <p className="text-3xl font-bold text-red-600">{estadisticasGrupos.gruposLlenos}</p>
          </div>
          
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Capacidad Promedio</p>
            <p className="text-3xl font-bold text-purple-600">{estadisticasGrupos.capacidadPromedio}%</p>
          </div>
          
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Más Demandada</p>
            <p className="text-lg font-bold text-yellow-700">DOSW</p>
          </div>
        </div>

        {/* Distribución */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Distribución de Capacidad</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grupos Llenos (100%)</span>
                <span className="font-semibold">{estadisticasGrupos.gruposLlenos} grupos</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500"
                  style={{ width: `${(estadisticasGrupos.gruposLlenos / estadisticasGrupos.totalGrupos) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grupos con Alta Ocupación (70-99%)</span>
                <span className="font-semibold">45 grupos</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '29%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grupos con Ocupación Media (40-69%)</span>
                <span className="font-semibold">38 grupos</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '24%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grupos con Baja Ocupación (&lt;40%)</span>
                <span className="font-semibold">31 grupos</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Nota */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Nota:</span> Los datos se actualizan en tiempo real basándose 
            en las inscripciones y solicitudes de cambio de los estudiantes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GruposStats