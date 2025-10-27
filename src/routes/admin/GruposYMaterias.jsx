import { useState } from 'react'
import Layout from '../../components/common/Layout'
import BuscarGrupoModal from '../../components/admin/BuscarGrupoModal'
import DetalleGrupoModal from '../../components/admin/DetalleGrupoModal'
import CrearGrupoModal from '../../components/admin/CrearGrupoModal'
import AsignarProfesorModal from '../../components/admin/AsignarProfesorModal'

const GruposYMaterias = () => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos')
  const [cicloSeleccionado, setCicloSeleccionado] = useState('2025-2')
  const [isBuscarModalOpen, setIsBuscarModalOpen] = useState(false)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false)
  const [isAsignarProfesorModalOpen, setIsAsignarProfesorModalOpen] = useState(false)
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null)

  // Datos de ejemplo - vendrían del backend
  const [todosLosGrupos] = useState([
    // 2025-2
    {
      id: 1,
      clase: '1624',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE-VIER',
      aula: 'D-309',
      instructor: 'ANDRÉS MARTÍN QUINTERO',
      color: 'verde',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposOcupados: 25,
      cuposTotales: 40
    },
    {
      id: 2,
      clase: '1624',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'MAR-JUE-VIER',
      aula: 'B-104',
      instructor: 'ANDRÉS MARTÍN QUINTERO',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposOcupados: 18,
      cuposTotales: 35
    },
    {
      id: 3,
      clase: '1625',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE',
      aula: 'A-205',
      instructor: 'MARÍA LÓPEZ GARCÍA',
      color: 'verde',
      ciclo: '2025-2',
      estado: 'completo',
      cuposOcupados: 30,
      cuposTotales: 30
    },
    {
      id: 4,
      clase: 'PSOC',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'MAR-JUE',
      aula: 'C-302',
      instructor: 'CARLOS PÉREZ RODRÍGUEZ',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposOcupados: 22,
      cuposTotales: 40
    },
    {
      id: 5,
      clase: 'DOSW',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'LUN-MIE-VIER',
      aula: 'B-204',
      instructor: 'ANA TORRES GONZÁLEZ',
      color: 'verde',
      ciclo: '2025-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 35
    },
    {
      id: 6,
      clase: 'PRYE',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'VIER',
      aula: 'A-401',
      instructor: 'ROBERTO SÁNCHEZ VARGAS',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'completo',
      cuposOcupados: 25,
      cuposTotales: 25
    },
    {
      id: 7,
      clase: 'AYSR',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE',
      aula: 'C-201',
      instructor: 'LAURA GÓMEZ MARTÍNEZ',
      color: 'verde',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposOcupados: 15,
      cuposTotales: 40
    },
    {
      id: 8,
      clase: 'ODSC',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'MAR-JUE',
      aula: 'D-105',
      instructor: 'DIEGO MORALES CASTRO',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposOcupados: 28,
      cuposTotales: 35
    },
    {
      id: 9,
      clase: 'DOSW',
      seccion: '3-LEC ORDINARIA',
      diasHoras: 'LUN-VIER',
      aula: 'B-302',
      instructor: 'PATRICIA GUTIÉRREZ DÍAZ',
      color: 'verde',
      ciclo: '2025-2',
      estado: 'completo',
      cuposOcupados: 40,
      cuposTotales: 40
    },
    {
      id: 10,
      clase: 'PSOC',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'MIE',
      aula: 'A-108',
      instructor: 'FERNANDO ACOSTA RUIZ',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 30
    },
    // 2025-1
    {
      id: 11,
      clase: '1624',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE',
      aula: 'D-201',
      instructor: 'SOFÍA RAMÍREZ LÓPEZ',
      color: 'verde',
      ciclo: '2025-1',
      estado: 'abierto',
      cuposOcupados: 20,
      cuposTotales: 35
    },
    {
      id: 12,
      clase: 'PRYE',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'MAR-JUE',
      aula: 'A-105',
      instructor: 'JUAN PABLO CONTRERAS',
      color: 'azul',
      ciclo: '2025-1',
      estado: 'completo',
      cuposOcupados: 30,
      cuposTotales: 30
    },
    {
      id: 13,
      clase: 'AYSR',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'VIER',
      aula: 'C-401',
      instructor: 'ELIZABETH CORREA SUÁREZ',
      color: 'verde',
      ciclo: '2025-1',
      estado: 'abierto',
      cuposOcupados: 12,
      cuposTotales: 25
    },
    {
      id: 14,
      clase: 'DOSW',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE-VIER',
      aula: 'B-203',
      instructor: 'NIKOLAS MARTÍNEZ',
      color: 'azul',
      ciclo: '2025-1',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 40
    },
    {
      id: 15,
      clase: 'ODSC',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'MAR-JUE',
      aula: 'D-301',
      instructor: 'SANDRA CASALLAS AMAYA',
      color: 'verde',
      ciclo: '2025-1',
      estado: 'abierto',
      cuposOcupados: 18,
      cuposTotales: 30
    },
    {
      id: 16,
      clase: '1625',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-VIER',
      aula: 'A-202',
      instructor: 'IGNACIO CASTILLO RENDÓN',
      color: 'azul',
      ciclo: '2025-1',
      estado: 'completo',
      cuposOcupados: 35,
      cuposTotales: 35
    },
    // 2024-2
    {
      id: 17,
      clase: '1624',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-MIE',
      aula: 'D-101',
      instructor: 'JUAN SEBASTIÁN ORTEGA',
      color: 'verde',
      ciclo: '2024-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 40
    },
    {
      id: 18,
      clase: 'DOSW',
      seccion: '2-LEC ORDINARIA',
      diasHoras: 'MAR-JUE',
      aula: 'B-302',
      instructor: 'MARÍA BELÉN QUINTERO',
      color: 'azul',
      ciclo: '2024-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 35
    },
    {
      id: 19,
      clase: 'PSOC',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'LUN-VIER',
      aula: 'C-205',
      instructor: 'CARLOS EDUARDO DÍAZ',
      color: 'verde',
      ciclo: '2024-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 30
    },
    {
      id: 20,
      clase: 'PRYE',
      seccion: '1-LEC ORDINARIA',
      diasHoras: 'MIE',
      aula: 'A-401',
      instructor: 'ANDREA JIMÉNEZ RUIZ',
      color: 'azul',
      ciclo: '2024-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 25
    }
  ])

  // Filtrar grupos según ciclo y estado seleccionados
  const gruposFiltrados = todosLosGrupos.filter(grupo => {
    const cumpleCiclo = grupo.ciclo === cicloSeleccionado
    const cumpleEstado = estadoSeleccionado === 'todos' || grupo.estado === estadoSeleccionado
    return cumpleCiclo && cumpleEstado
  })

  const handleVerDetalle = (grupo) => {
    setGrupoSeleccionado(grupo)
    setIsDetalleModalOpen(true)
  }

  const handleAsignarProfesor = (grupo) => {
    setGrupoSeleccionado(grupo)
    setIsAsignarProfesorModalOpen(true)
  }

  const handleEliminarGrupo = (grupoId) => {
    if (confirm('¿Está seguro de eliminar este grupo?')) {
      // En producción, esto haría una llamada al backend
      console.log('Eliminar grupo:', grupoId)
      // todosLosGrupos sería actualizado desde el backend
    }
  }

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Gestión de Grupos y Materias</h1>
        <div className="w-full max-w-[1400px] h-1 bg-black mb-8"></div>

        {/* Filtros superiores */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Estado:</label>
              <select
                value={estadoSeleccionado}
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="abierto">Abiertos</option>
                <option value="cerrado">Cerrados</option>
                <option value="completo">Completos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ciclo:</label>
              <select
                value={cicloSeleccionado}
                onChange={(e) => setCicloSeleccionado(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="2025-2">2025-2 Segundo periodo</option>
                <option value="2025-1">2025-1 Primer periodo</option>
                <option value="2024-2">2024-2 Segundo periodo</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsCrearModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            + CREAR NUEVO GRUPO
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mb-6">
          <button
            onClick={() => setIsBuscarModalOpen(true)}
            className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-3 text-left text-gray-500 hover:border-blue-500 transition-colors"
          >
            🔍 Buscar grupo o materia...
          </button>
        </div>

        {/* Lista de grupos */}
        <div className="space-y-3 max-w-[1200px]">
          <div className="grid grid-cols-[100px_200px_150px_150px_250px_120px] gap-4 px-4 text-sm font-semibold text-gray-600 mb-2">
            <div>CLASE</div>
            <div>SECCIÓN</div>
            <div>DÍAS Y HORAS</div>
            <div>AULA</div>
            <div>INSTRUCTOR</div>
            <div>ACCIONES</div>
          </div>

          {gruposFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-semibold mb-2">No hay grupos disponibles</p>
              <p className="text-sm">
                No se encontraron grupos {estadoSeleccionado !== 'todos' ? estadoSeleccionado + 's' : ''} en el periodo {cicloSeleccionado}
              </p>
            </div>
          ) : (
            gruposFiltrados.map((grupo) => (
            <div
              key={grupo.id}
              className={`border-2 rounded-lg p-4 ${
                grupo.color === 'verde' 
                  ? 'bg-green-100 border-green-300' 
                  : 'bg-blue-100 border-blue-300'
              }`}
            >
              <div className="grid grid-cols-[100px_200px_150px_150px_250px_120px] gap-4 items-center">
                <div className="font-bold">{grupo.clase}</div>
                <div className="text-sm">
                  {grupo.seccion}
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    grupo.estado === 'abierto' ? 'bg-green-200 text-green-800' :
                    grupo.estado === 'completo' ? 'bg-red-200 text-red-800' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {grupo.estado === 'abierto' ? 'Abierto' : 
                     grupo.estado === 'completo' ? 'Completo' : 
                     'Cerrado'}
                  </span>
                </div>
                <div className="text-sm">{grupo.diasHoras}</div>
                <div className="text-sm">
                  {grupo.aula}
                  <span className="text-xs text-gray-500 ml-1">
                    ({grupo.cuposOcupados}/{grupo.cuposTotales})
                  </span>
                </div>
                <div className="text-sm">{grupo.instructor}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerDetalle(grupo)}
                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                    title="Ver detalle"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleAsignarProfesor(grupo)}
                    className="text-green-600 hover:text-green-800 text-xs underline"
                    title="Asignar profesor"
                  >
                    Profesor
                  </button>
                  <button
                    onClick={() => handleEliminarGrupo(grupo.id)}
                    className="text-red-600 hover:text-red-800 text-xs underline"
                    title="Eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>

      {/* Modales */}
      <BuscarGrupoModal
        isOpen={isBuscarModalOpen}
        onClose={() => setIsBuscarModalOpen(false)}
      />

      <DetalleGrupoModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        grupo={grupoSeleccionado}
      />

      <CrearGrupoModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
        onCrear={(nuevoGrupo) => {
          // En producción, esto haría una llamada al backend
          console.log('Crear grupo:', nuevoGrupo)
          setIsCrearModalOpen(false)
        }}
      />

      <AsignarProfesorModal
        isOpen={isAsignarProfesorModalOpen}
        onClose={() => setIsAsignarProfesorModalOpen(false)}
        grupo={grupoSeleccionado}
        onAsignar={(profesor) => {
          // En producción, esto haría una llamada al backend
          console.log('Asignar profesor:', profesor, 'al grupo:', grupoSeleccionado?.id)
          setIsAsignarProfesorModalOpen(false)
        }}
      />
    </Layout>
  )
}

export default GruposYMaterias