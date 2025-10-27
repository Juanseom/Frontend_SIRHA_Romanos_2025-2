const DetalleGrupoModal = ({ isOpen, onClose, grupo }) => {
  if (!isOpen || !grupo) return null

  // Datos de ejemplo extendidos
  const detalleCompleto = {
    estado: 'ABIERTA',
    nClase: grupo.clase || '1624',
    sesion: grupo.seccion || 'Ordinaria',
    unidades: 3,
    presencial: 'Sí',
    campus: 'Bogotá',
    grado: 'Pregrado',
    fechas: '11/8/2025-17/12/2025',
    ubicacion: 'Sede Principal',
    // Disponibilidad
    capacidadClase: 30,
    capacidadListaEspera: 5,
    totalListaEspera: 2,
    capacidadClaseTotal: 30,
    totalIntercepciones: 0,
    plazasDisponibles: 15,
    // Información de clase (tabla)
    diasHoras: [
      { dia: 'Lunes', horario: '14:00-16:00' },
      { dia: 'Miércoles', horario: '14:00-16:00' }
    ],
    aula: grupo.aula || 'D-309',
    instructor: grupo.instructor || 'ANDRÉS MARTÍN QUINTERO',
    fechasClase: '11/8/2025-17/12/2025'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold">Detalle de la Búsqueda</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Información básica en grid */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-6 text-sm">
            <div>
              <span className="font-semibold">Estado:</span>
              <span className="ml-2 bg-green-500 text-white px-3 py-1 rounded text-xs">
                {detalleCompleto.estado}
              </span>
            </div>
            <div>
              <span className="font-semibold">Grado:</span>
              <span className="ml-2">{detalleCompleto.grado}</span>
            </div>
            <div>
              <span className="font-semibold">Pregrado:</span>
            </div>
            <div>
              <span className="font-semibold">N° Clase:</span>
              <span className="ml-2">{detalleCompleto.nClase}</span>
            </div>
            <div>
              <span className="font-semibold">Fechas:</span>
              <span className="ml-2">{detalleCompleto.fechas}</span>
            </div>
            <div>
              <span className="font-semibold">Sesión:</span>
              <span className="ml-2">{detalleCompleto.sesion}</span>
            </div>
            <div>
              <span className="font-semibold">Unidades:</span>
              <span className="ml-2">{detalleCompleto.unidades}</span>
            </div>
            <div>
              <span className="font-semibold">Ubicación:</span>
              <span className="ml-2">{detalleCompleto.ubicacion}</span>
            </div>
            <div>
              <span className="font-semibold">Presencial:</span>
              <span className="ml-2">{detalleCompleto.presencial}</span>
            </div>
            <div>
              <span className="font-semibold">Campus:</span>
              <span className="ml-2">{detalleCompleto.campus}</span>
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3 text-lg">Disponibilidad</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Capacidad lista de espera:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.capacidadListaEspera}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Plazas disponibles:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.plazasDisponibles}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Total lista de espera:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.totalListaEspera}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Capacidad clase:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.capacidadClase}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Capacidad clase total:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.capacidadClaseTotal}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center font-bold">
                  {detalleCompleto.capacidadClase - detalleCompleto.plazasDisponibles}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Total intercepciones:</span>
                <div className="w-32 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                  {detalleCompleto.totalIntercepciones}
                </div>
              </div>
            </div>
          </div>

          {/* Información clase - Tabla */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Información Clase</h3>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Días y Horas</th>
                    <th className="px-4 py-2 text-left">Aula</th>
                    <th className="px-4 py-2 text-left">Instructor</th>
                    <th className="px-4 py-2 text-left">Fechas Clase</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {detalleCompleto.diasHoras.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="px-4 py-2">{item.dia} {item.horario}</td>
                      {index === 0 && (
                        <>
                          <td className="px-4 py-2" rowSpan={detalleCompleto.diasHoras.length}>
                            {detalleCompleto.aula}
                          </td>
                          <td className="px-4 py-2" rowSpan={detalleCompleto.diasHoras.length}>
                            {detalleCompleto.instructor}
                          </td>
                          <td className="px-4 py-2" rowSpan={detalleCompleto.diasHoras.length}>
                            {detalleCompleto.fechasClase}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end sticky bottom-0">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleGrupoModal