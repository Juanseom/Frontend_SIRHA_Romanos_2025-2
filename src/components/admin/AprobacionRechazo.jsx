const AprobacionRechazo = () => {
  // Datos de ejemplo - vendrían del backend
  const estadisticas = {
    aprobadas: 28,
    rechazadas: 72,
    totalSolicitudes: 350
  }

  const porcentajeAprobadas = estadisticas.aprobadas
  const porcentajeRechazadas = estadisticas.rechazadas

  // Calcular el ángulo para el SVG (círculo completo = 360 grados)
  const radioCirculo = 100
  const circunferencia = 2 * Math.PI * radioCirculo
  const offsetAprobadas = circunferencia - (circunferencia * porcentajeAprobadas) / 100

  return (
    <div className="max-w-4xl">
      <div className="bg-white border-2 border-gray-300 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Tasa de Aprobación vs Rechazo</h2>
        
        <div className="flex items-center justify-center gap-16">
          {/* Gráfica de Torta (Pie Chart) */}
          <div className="relative">
            <svg width="300" height="300" viewBox="0 0 240 240" className="transform -rotate-90">
              {/* Círculo de fondo (rechazadas) */}
              <circle
                cx="120"
                cy="120"
                r={radioCirculo}
                fill="#FF9999"
                stroke="none"
              />
              
              {/* Segmento de aprobadas */}
              <circle
                cx="120"
                cy="120"
                r={radioCirculo}
                fill="transparent"
                stroke="#9CECA6"
                strokeWidth={radioCirculo * 2}
                strokeDasharray={circunferencia}
                strokeDashoffset={offsetAprobadas}
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Porcentajes en el centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-800">{porcentajeAprobadas}%</div>
                <div className="text-sm text-gray-600">Aprobadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{porcentajeRechazadas}%</div>
                <div className="text-sm text-gray-600">Rechazadas</div>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#9CECA6] rounded-lg border-2 border-gray-300"></div>
              <div>
                <p className="text-xl font-bold text-gray-800">Aprobación</p>
                <p className="text-sm text-gray-600">{Math.round(estadisticas.totalSolicitudes * porcentajeAprobadas / 100)} solicitudes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF9999] rounded-lg border-2 border-gray-300"></div>
              <div>
                <p className="text-xl font-bold text-gray-800">Rechazo</p>
                <p className="text-sm text-gray-600">{Math.round(estadisticas.totalSolicitudes * porcentajeRechazadas / 100)} solicitudes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Solicitudes</p>
              <p className="text-2xl font-bold text-gray-800">{estadisticas.totalSolicitudes}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Solicitudes Aprobadas</p>
              <p className="text-2xl font-bold text-green-600">{Math.round(estadisticas.totalSolicitudes * porcentajeAprobadas / 100)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Solicitudes Rechazadas</p>
              <p className="text-2xl font-bold text-red-600">{Math.round(estadisticas.totalSolicitudes * porcentajeRechazadas / 100)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Periodo actual:</span> 2025-2. 
          Las estadísticas se actualizan automáticamente al procesar cada solicitud.
        </p>
      </div>
    </div>
  )
}

export default AprobacionRechazo