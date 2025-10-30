import { useState } from 'react'

const HistorialCambios = () => {
  const [codigoEstudiante, setCodigoEstudiante] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [estudianteEncontrado, setEstudianteEncontrado] = useState(null)

  // Datos de ejemplo - vendrían del backend
  const estudiantesDB = {
    '1000100101': {
      nombre: 'Karla Rodríguez Rodríguez',
      programa: 'Ingeniería Electrónica',
      cambios: [
        {
          id: 1,
          fecha: '15/01/2025',
          tipo: 'Cambio de Grupo',
          de: 'DOSW-2',
          a: 'DOSW-4',
          estado: 'aprobado',
          observacion: 'Cambio aprobado por disponibilidad de cupos'
        },
        {
          id: 2,
          fecha: '10/01/2025',
          tipo: 'Inscribir Materia',
          de: '-',
          a: 'PRYE-3',
          estado: 'aprobado',
          observacion: 'Cumple con prerequisitos'
        },
        {
          id: 3,
          fecha: '05/01/2025',
          tipo: 'Bajar Materia',
          de: 'CALV-2',
          a: '-',
          estado: 'rechazado',
          observacion: 'Fuera del periodo permitido'
        },
        {
          id: 4,
          fecha: '20/12/2024',
          tipo: 'Cambio de Grupo',
          de: 'FIGE-1',
          a: 'FIGE-3',
          estado: 'rechazado',
          observacion: 'Grupo destino sin cupos disponibles'
        }
      ]
    }
  }

  const handleBuscar = () => {
    if (codigoEstudiante.trim()) {
      const estudiante = estudiantesDB[codigoEstudiante]
      if (estudiante) {
        setEstudianteEncontrado(estudiante)
      } else {
        setEstudianteEncontrado(null)
        alert('Estudiante no encontrado')
      }
    }
  }

  const cambiosFiltrados = estudianteEncontrado?.cambios.filter(cambio => {
    if (filtro === 'todos') return true
    if (filtro === 'aprobados') return cambio.estado === 'aprobado'
    if (filtro === 'rechazados') return cambio.estado === 'rechazado'
    return true
  }) || []

  return (
    <div className="max-w-4xl">
      {/* Búsqueda */}
      <div className="mb-8 flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-2">
            Ingrese el ID del estudiante que desea consultar:
          </label>
          <input
            type="text"
            value={codigoEstudiante}
            onChange={(e) => setCodigoEstudiante(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
            placeholder="Ej: 1000100101"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Filtrar por:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="todos">Todos los Cambios</option>
            <option value="aprobados">Aprobados</option>
            <option value="rechazados">Rechazados</option>
          </select>
        </div>

        <button
          onClick={handleBuscar}
          className="px-6 py-2 bg-[#b50e11] text-white rounded-lg hover:bg-[#8a0a0d] transition-colors font-semibold"
        >
          Buscar
        </button>
      </div>

      {/* Información del estudiante */}
      {estudianteEncontrado && (
        <>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
            <p className="text-sm mb-1">
              <span className="font-semibold">Nombre del estudiante:</span> {estudianteEncontrado.nombre}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Programa académico:</span> {estudianteEncontrado.programa}
            </p>
          </div>

          {/* Lista de cambios */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-gray-800 pb-2">
              {filtro === 'aprobados' ? 'Cambios Aprobados:' : 
               filtro === 'rechazados' ? 'Cambios Rechazados:' : 
               'Todos los Cambios:'}
            </h3>

            {cambiosFiltrados.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No hay cambios {filtro !== 'todos' ? filtro : ''} para mostrar
              </p>
            ) : (
              <div className="space-y-3">
                {cambiosFiltrados.map((cambio) => (
                  <div
                    key={cambio.id}
                    className={`border-2 rounded-lg p-4 ${
                      cambio.estado === 'aprobado'
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{cambio.tipo}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {cambio.de !== '-' && <span>De: <span className="font-medium">{cambio.de}</span> → </span>}
                          {cambio.a !== '-' && <span>A: <span className="font-medium">{cambio.a}</span></span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          cambio.estado === 'aprobado'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {cambio.estado === 'aprobado' ? 'Aprobado' : 'Rechazado'}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">{cambio.fecha}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic mt-2">
                      "{cambio.observacion}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Mensaje inicial */}
      {!estudianteEncontrado && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-semibold mb-2">Busca un estudiante</p>
          <p className="text-sm">Ingresa el código del estudiante para ver su historial de cambios</p>
        </div>
      )}
    </div>
  )
}

export default HistorialCambios