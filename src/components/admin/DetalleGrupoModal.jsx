const DetalleGrupoModal = ({ isOpen, onClose, grupo, materias = [] }) => {
  if (!isOpen || !grupo) return null

  const materiaInfo = materias.find(m => m.id === grupo.materiaId) || {}

  const detalleCompleto = {
    materia: {
      codigo: materiaInfo.codigo || grupo.materiaCodigo || grupo.clase,
      nombre: materiaInfo.nombre || 'Materia sin nombre',
      creditos: materiaInfo.creditos || 3,
      departamento: materiaInfo.departamento || 'Sin departamento',
      programa: materiaInfo.programa || 'Sin programa'
    },
    
    grupo: {
      nombreCompleto: grupo.nombreCompleto || `${grupo.clase}-1`,  
      numeroGrupo: grupo.nombreCompleto?.split('-')[1] || '1', 
      seccion: grupo.seccion || 'LEC ORDINARIA',
      estado: grupo.estado || 'abierto',
      ciclo: grupo.ciclo || '2025-2',
      codigoGrupo: grupo.codigoGrupo || '1234'
    },

    detalles: {
      grado: 'Pregrado',
      ubicacion: 'Sede Principal',
      campus: 'Bogotá',
      presencial: 'Sí',
      fechas: '11/8/2025-17/12/2025'
    },
    
    disponibilidad: {
      capacidadClase: grupo.cuposTotales || 30,
      plazasDisponibles: (grupo.cuposTotales || 30) - (grupo.cuposOcupados || 0),
      cuposOcupados: grupo.cuposOcupados || 15,
      capacidadListaEspera: 5,
      totalListaEspera: 2,
      totalIntercepciones: 0
    },
    
    horarios: [
      { 
        dia: 'Lunes', 
        horario: '14:00-16:00',
        aula: grupo.aula || 'D-309',
        instructor: grupo.instructor || 'ANDRÉS MARTÍN CANTOR'
      },
      { 
        dia: 'Miércoles', 
        horario: '14:00-16:00',
        aula: grupo.aula || 'D-309',
        instructor: grupo.instructor || 'ANDRÉS MARTÍN CANTOR'
      }
    ]
  }

  const totalCupos = detalleCompleto.disponibilidad.cuposOcupados + detalleCompleto.disponibilidad.plazasDisponibles

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold">Detalle del Grupo</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          
          {/* SECCIÓN 1: INFORMACIÓN DE LA MATERIA */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-3">📚 Información de la Materia</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Código Materia:</span>
                <span className="ml-2 text-blue-700 font-bold">{detalleCompleto.materia.codigo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Créditos:</span>
                <span className="ml-2">{detalleCompleto.materia.creditos}</span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Nombre:</span>
                <span className="ml-2">{detalleCompleto.materia.nombre}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Departamento:</span>
                <span className="ml-2">{detalleCompleto.materia.departamento}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Programa:</span>
                <span className="ml-2">{detalleCompleto.materia.programa}</span>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: INFORMACIÓN DEL GRUPO */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-900 mb-3">👥 Información del Grupo</h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Grupo:</span>
                <span className="ml-2 text-green-700 font-bold text-lg">{detalleCompleto.grupo.nombreCompleto}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Número:</span>
                <span className="ml-2">{detalleCompleto.grupo.numeroGrupo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Estado:</span>
                <span className={`ml-2 px-3 py-1 rounded text-xs font-semibold ${
                  detalleCompleto.grupo.estado === 'abierto' 
                    ? 'bg-green-500 text-white' 
                    : detalleCompleto.grupo.estado === 'completo'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}>
                  {detalleCompleto.grupo.estado.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Sección:</span>
                <span className="ml-2">{detalleCompleto.grupo.seccion}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Ciclo:</span>
                <span className="ml-2">{detalleCompleto.grupo.ciclo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Código Grupo:</span>
                <span className="ml-2">{detalleCompleto.grupo.codigoGrupo}</span>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: DETALLES GENERALES */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm border-b pb-4">
            <div>
              <span className="font-semibold text-gray-700">Grado:</span>
              <span className="ml-2">{detalleCompleto.detalles.grado}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Ubicación:</span>
              <span className="ml-2">{detalleCompleto.detalles.ubicacion}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Pregrado:</span>
              <span className="ml-2">{detalleCompleto.materia.programa}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Campus:</span>
              <span className="ml-2">{detalleCompleto.detalles.campus}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Presencial:</span>
              <span className="ml-2">{detalleCompleto.detalles.presencial}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Fechas:</span>
              <span className="ml-2 text-sm">{detalleCompleto.detalles.fechas}</span>
            </div>
          </div>

          {/* SECCIÓN 4: DISPONIBILIDAD */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-purple-900 mb-4">📊 Disponibilidad</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Columna izquierda */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white rounded p-2">
                  <span className="text-sm font-semibold text-gray-700">Capacidad lista de espera:</span>
                  <span className="text-lg font-bold text-purple-600">{detalleCompleto.disponibilidad.capacidadListaEspera}</span>
                </div>
                <div className="flex justify-between items-center bg-white rounded p-2">
                  <span className="text-sm font-semibold text-gray-700">Total lista de espera:</span>
                  <span className="text-lg font-bold text-purple-600">{detalleCompleto.disponibilidad.totalListaEspera}</span>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white rounded p-2">
                  <span className="text-sm font-semibold text-gray-700">Plazas disponibles:</span>
                  <span className="text-lg font-bold text-green-600">{detalleCompleto.disponibilidad.plazasDisponibles}</span>
                </div>
                <div className="flex justify-between items-center bg-white rounded p-2">
                  <span className="text-sm font-semibold text-gray-700">Capacidad clase total:</span>
                  <span className="text-lg font-bold text-purple-600">{detalleCompleto.disponibilidad.capacidadClase}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 5: HORARIOS E INSTRUCTOR */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-2">
              <h3 className="font-bold">🕐 Información de Clase</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Días y Horas</th>
                    <th className="px-4 py-2 text-left">Aula</th>
                    <th className="px-4 py-2 text-left">Instructor</th>
                    <th className="px-4 py-2 text-left">Fechas Clase</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleCompleto.horarios.map((horario, index) => (
                    <tr key={index} className="border-b hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm">
                        <span className="font-semibold">{horario.dia}</span> {horario.horario}
                      </td>
                      <td className="px-4 py-3 text-sm">{horario.aula}</td>
                      <td className="px-4 py-3 text-sm">{horario.instructor}</td>
                      <td className="px-4 py-3 text-sm">{detalleCompleto.detalles.fechas}</td>
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
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleGrupoModal