const SemaforizacionGlobal = () => {
  // Datos de ejemplo - vendrán del backend
  const estadisticasGlobales = {
    totalEstudiantes: 1250,
    creditosTotalesPlan: 165,
    promedioCreditos: 87,
    porcentajeAvance: 53,
    materiasAprobadas: 45600,
    materiasCursando: 8900,
    materiasPendientes: 12300
  }

  return (
    <div className="max-w-6xl">
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Resumen General del Plan de Estudios</h2>
        
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Total Estudiantes</p>
            <p className="text-3xl font-bold text-gray-800">{estadisticasGlobales.totalEstudiantes}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Créditos Promedio</p>
            <p className="text-3xl font-bold text-blue-600">{estadisticasGlobales.promedioCreditos}</p>
            <p className="text-xs text-gray-500">de {estadisticasGlobales.creditosTotalesPlan}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">% Avance Promedio</p>
            <p className="text-3xl font-bold text-green-600">{estadisticasGlobales.porcentajeAvance}%</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Materias Cursando</p>
            <p className="text-3xl font-bold text-[#6FB1E1]">{estadisticasGlobales.materiasCursando.toLocaleString()}</p>
          </div>
        </div>

        {/* Barra de progreso global */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Progreso Global del Plan de Estudios</span>
            <span className="text-gray-600">{estadisticasGlobales.porcentajeAvance}%</span>
          </div>
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${estadisticasGlobales.porcentajeAvance}%` }}
            ></div>
          </div>
        </div>

        {/* Distribución de materias */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#9CECA6] bg-opacity-20 border-2 border-[#9CECA6] rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Aprobadas</p>
            <p className="text-2xl font-bold text-gray-800">{estadisticasGlobales.materiasAprobadas.toLocaleString()}</p>
          </div>
          
          <div className="bg-[#6FB1E1] bg-opacity-20 border-2 border-[#6FB1E1] rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Cursando</p>
            <p className="text-2xl font-bold text-gray-800">{estadisticasGlobales.materiasCursando.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-gray-800">{estadisticasGlobales.materiasPendientes.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Vista General del Sistema</p>
            <p className="text-sm text-blue-800">
              Esta vista muestra el progreso académico agregado de todos los estudiantes del sistema. 
              Los datos se actualizan en tiempo real basándose en los semáforos académicos individuales de cada estudiante.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SemaforizacionGlobal