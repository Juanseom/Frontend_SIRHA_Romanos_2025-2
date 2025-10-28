const AprobacionRechazo = () => {
  // Datos de ejemplo - vendrían del backend
  const estadisticas = {
    aprobadas: 28,
    rechazadas: 72,
    totalSolicitudes: 350
  }

  const porcentajeAprobadas = estadisticas.aprobadas
  const porcentajeRechazadas = estadisticas.rechazadas

  // Calcular ángulos para los segmentos
  const anguloAprobadas = (porcentajeAprobadas / 100) * 360
  const anguloRechazadas = (porcentajeRechazadas / 100) * 360

  // Función para calcular coordenadas del arco
  const calcularArco = (startAngle, endAngle) => {
    const start = polarToCartesian(120, 120, 100, endAngle)
    const end = polarToCartesian(120, 120, 100, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    
    return [
      'M', start.x, start.y,
      'A', 100, 100, 0, largeArcFlag, 0, end.x, end.y,
      'L', 120, 120,
      'Z'
    ].join(' ')
  }

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  // Calcular posición de los textos dentro de cada segmento
  const calcularPosicionTexto = (startAngle, endAngle, radius = 60) => {
    const angle = startAngle + (endAngle - startAngle) / 2
    const angleInRadians = ((angle - 90) * Math.PI) / 180.0
    return {
      x: 120 + radius * Math.cos(angleInRadians),
      y: 120 + radius * Math.sin(angleInRadians)
    }
  }

  const posAprobadas = calcularPosicionTexto(0, anguloAprobadas)
  const posRechazadas = calcularPosicionTexto(anguloAprobadas, 360)

  return (
    <div className="max-w-4xl">
      <div className="bg-white border-2 border-gray-300 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Tasa de Aprobación vs Rechazo</h2>
        
        <div className="flex items-center justify-center gap-16">
          {/* Gráfica de Torta (Pie Chart) */}
          <div className="relative">
            <svg width="350" height="350" viewBox="0 0 240 240">
              {/* Segmento Verde (Aprobadas) */}
              <path
                d={calcularArco(0, anguloAprobadas)}
                fill="#9CECA6"
                stroke="white"
                strokeWidth="2"
              />
              
              {/* Segmento Rosa (Rechazadas) */}
              <path
                d={calcularArco(anguloAprobadas, 360)}
                fill="#FF9999"
                stroke="white"
                strokeWidth="2"
              />

              {/* Texto en segmento verde */}
              <text
                x={posAprobadas.x}
                y={posAprobadas.y - 8}
                textAnchor="middle"
                fill="#1f2937"
                fontSize="32"
                fontWeight="bold"
              >
                {porcentajeAprobadas}%
              </text>
              <text
                x={posAprobadas.x}
                y={posAprobadas.y + 15}
                textAnchor="middle"
                fill="#4b5563"
                fontSize="12"
              >
                Aprobadas
              </text>

              {/* Texto en segmento rosa */}
              <text
                x={posRechazadas.x}
                y={posRechazadas.y - 8}
                textAnchor="middle"
                fill="#1f2937"
                fontSize="32"
                fontWeight="bold"
              >
                {porcentajeRechazadas}%
              </text>
              <text
                x={posRechazadas.x}
                y={posRechazadas.y + 15}
                textAnchor="middle"
                fill="#4b5563"
                fontSize="12"
              >
                Rechazadas
              </text>
            </svg>
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