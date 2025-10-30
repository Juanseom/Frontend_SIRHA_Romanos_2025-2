import { useState } from 'react'
import Layout from '../../components/common/Layout'
import BuscarGrupoModal from '../../components/admin/BuscarGrupoModal'
import DetalleGrupoModal from '../../components/admin/DetalleGrupoModal'
import CrearGrupoModal from '../../components/admin/CrearGrupoModalAvanzado'
import AsignarProfesorModal from '../../components/admin/AsignarProfesorModal'

const GruposYMaterias = () => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos')
  const [cicloSeleccionado, setCicloSeleccionado] = useState('2025-2')
  const [isBuscarModalOpen, setIsBuscarModalOpen] = useState(false)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false)
  const [isAsignarProfesorModalOpen, setIsAsignarProfesorModalOpen] = useState(false)
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null)

  const [materias] = useState([
    {
      id: 1,
      codigo: "DOSW",
      nombre: "Desarrollo y Operaciones de Software",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    },
    {
      id: 2,
      codigo: "CALV",
      nombre: "Cálculo Vectorial",
      creditos: 4,
      programa: "Todas las ingenierías",
      departamento: "Matemáticas",
      estado: "activa"
    },
    {
      id: 3,
      codigo: "PSOC",
      nombre: "Psicología Social",
      creditos: 2,
      programa: "Todas las ingenierías",
      departamento: "Humanidades",
      estado: "activa"
    },
    {
      id: 4,
      codigo: "PRYE",
      nombre: "Proyectos de Ingeniería",
      creditos: 3,
      programa: "Todas las ingenierías",
      departamento: "Proyectos",
      estado: "activa"
    },
    {
      id: 5,
      codigo: "ALGO",
      nombre: "Algoritmos y Estructuras de Datos",
      creditos: 4,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    },
    {
      id: 6,
      codigo: "1624",
      nombre: "Análisis y Diseño de Sistemas",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    },
    {
      id: 7,
      codigo: "1625",
      nombre: "Bases de Datos",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    },
    {
      id: 8,
      codigo: "AYSR",
      nombre: "Arquitectura y Sistemas en Red",
      creditos: 4,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    },
    {
      id: 9,
      codigo: "ODSC",
      nombre: "Optimización y Diseño de Software",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa"
    }
  ])

  const [todosLosGrupos, setTodosLosGrupos] = useState([
    {
      id: 1,
      materiaId: 6,
      materiaCodigo: "1624",
      clase: '1624',
      seccion: '1-LEC ORDINARIA',
      nombreCompleto: "1624-1",
      codigoGrupo: "1234",
      diasHoras: 'LUN-MIE-VIER 14:00-16:00',
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
      materiaId: 6,
      materiaCodigo: "1624",
      clase: '1624',
      seccion: '2-LEC ORDINARIA',
      nombreCompleto: "1624-2",
      codigoGrupo: "1235",
      diasHoras: 'MAR-JUE-VIER 08:00-10:00',
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
      materiaId: 7,
      materiaCodigo: "1625",
      clase: '1625',
      seccion: '1-LEC ORDINARIA',
      nombreCompleto: "1625-1",
      codigoGrupo: "2345",
      diasHoras: 'LUN-MIE 10:00-12:00',
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
      materiaId: 3,
      materiaCodigo: "PSOC",
      clase: 'PSOC',
      seccion: '1-LEC ORDINARIA',
      nombreCompleto: "PSOC-1",
      codigoGrupo: "3456",
      diasHoras: 'MAR-JUE 14:00-16:00',
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
      materiaId: 1,
      materiaCodigo: "DOSW",
      clase: 'DOSW',
      seccion: '2-LEC ORDINARIA',
      nombreCompleto: "DOSW-2",
      codigoGrupo: "4567",
      diasHoras: 'LUN-MIE-VIER 16:00-18:00',
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
      materiaId: 4,
      materiaCodigo: "PRYE",
      clase: 'PRYE',
      seccion: '1-LEC ORDINARIA',
      nombreCompleto: "PRYE-1",
      codigoGrupo: "5678",
      diasHoras: 'VIER 14:00-18:00',
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
      materiaId: 8,
      materiaCodigo: "AYSR",
      clase: 'AYSR',
      seccion: '1-LEC ORDINARIA',
      nombreCompleto: "AYSR-1",
      codigoGrupo: "6789",
      diasHoras: 'LUN-MIE 08:00-10:00',
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
      materiaId: 9,
      materiaCodigo: "ODSC",
      clase: 'ODSC',
      seccion: '2-LEC ORDINARIA',
      nombreCompleto: "ODSC-2",
      codigoGrupo: "7890",
      diasHoras: 'MAR-JUE 10:00-12:00',
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
      materiaId: 1,
      materiaCodigo: "DOSW",
      clase: 'DOSW',
      seccion: '3-LEC ORDINARIA',
      nombreCompleto: "DOSW-3",
      codigoGrupo: "8901",
      diasHoras: 'LUN-VIER 10:00-12:00',
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
      materiaId: 3,
      materiaCodigo: "PSOC",
      clase: 'PSOC',
      seccion: '2-LEC ORDINARIA',
      nombreCompleto: "PSOC-2",
      codigoGrupo: "9012",
      diasHoras: 'MIE 14:00-18:00',
      aula: 'A-108',
      instructor: 'FERNANDO ACOSTA RUIZ',
      color: 'azul',
      ciclo: '2025-2',
      estado: 'cerrado',
      cuposOcupados: 0,
      cuposTotales: 30
    }
  ])

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

  const handleActualizarProfesor = (nuevoProfesor) => {
    if (!grupoSeleccionado) return

    setTodosLosGrupos(grupos =>
      grupos.map(g =>
        g.id === grupoSeleccionado.id
          ? { ...g, instructor: nuevoProfesor }
          : g
      )
    )
    
    setIsAsignarProfesorModalOpen(false)
    setGrupoSeleccionado(null)
    alert(`✅ Profesor asignado exitosamente a ${grupoSeleccionado.clase} - ${grupoSeleccionado.seccion}`)
  }

  const handleEliminarGrupo = (grupoId) => {
    const grupo = todosLosGrupos.find(g => g.id === grupoId)
    
    if (confirm(`¿Está seguro de eliminar el grupo ${grupo?.clase} - ${grupo?.seccion}?`)) {
      setTodosLosGrupos(grupos => grupos.filter(g => g.id !== grupoId))
      alert('✅ Grupo eliminado exitosamente')
    }
  }

  const handleCrearGrupo = (nuevoGrupo) => {
    const nuevoId = Math.max(...todosLosGrupos.map(g => g.id)) + 1
    
    const grupoCompleto = {
      id: nuevoId,
      ...nuevoGrupo,
      clase: nuevoGrupo.materiaCodigo,
      cuposOcupados: 0,
      color: nuevoId % 2 === 0 ? 'azul' : 'verde',
      diasHoras: nuevoGrupo.horarios?.map(h => 
        `${h.dia.substring(0, 3)} ${h.horaInicio}-${h.horaFin}`
      ).join(', ') || 'Sin horarios',
      aula: nuevoGrupo.horarios?.[0]?.salon || 'Sin asignar'
    }
    
    setTodosLosGrupos(grupos => [...grupos, grupoCompleto])
    setIsCrearModalOpen(false)
    alert(`✅ Grupo ${grupoCompleto.nombreCompleto} creado exitosamente`)
  }

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Gestión de Grupos</h1>
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
          <div className="grid grid-cols-[100px_200px_180px_120px_250px_150px] gap-4 px-4 text-sm font-semibold text-gray-600 mb-2">
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
              <div className="grid grid-cols-[100px_200px_180px_120px_250px_150px] gap-4 items-center">
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
                  <span className="text-xs text-gray-500 ml-1 block">
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
        materias={materias}
      />

      <CrearGrupoModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
        onCrear={handleCrearGrupo}
        materias={materias}
      />

      <AsignarProfesorModal
        isOpen={isAsignarProfesorModalOpen}
        onClose={() => setIsAsignarProfesorModalOpen(false)}
        grupo={grupoSeleccionado}
        onAsignar={handleActualizarProfesor}
      />
    </Layout>
  )
}

export default GruposYMaterias