import { useState } from 'react'
import Layout from '../../components/common/Layout'
import StudentInfoModal from '../../components/dean/StudentInfoModal'

const GestionarSolicitudes = () => {
  const [sortBy, setSortBy] = useState('fecha')
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Datos de ejemplo (esto vendrá del backend)
  const solicitudes = [
    {
      id: 1,
      nombre: 'Juan Sebastián Ortega',
      titulo: 'Cambio de grupo: DOSW - 2 → DOSW - 4',
      prioridad: 'Media',
      fecha: '2025-01-15',
      codigo: '1000100101',
      carrera: 'Ingeniería de Sistemas',
      semestre: 7,
      tipo: 'Cambio de Grupo',
      grupoActual: 'DOSW-2',
      grupoDestino: 'DOSW-4',
      observacion: ''
    },
    {
      id: 2,
      nombre: 'María Belén Quintero',
      titulo: 'Inscribir clase: ODSC - 3',
      prioridad: 'Baja',
      fecha: '2025-01-14',
      codigo: '1000100102',
      carrera: 'Ingeniería de Sistemas',
      semestre: 5,
      tipo: 'Inscribir clase',
      grupoActual: '-',
      grupoDestino: 'ODSC-3',
      observacion: ''
    },
    {
      id: 3,
      nombre: 'Nikolas Martínez',
      titulo: 'Inscribir clase: PRYE - 12',
      prioridad: 'Media',
      fecha: '2025-01-13',
      codigo: '1000100103',
      carrera: 'Ingeniería Industrial',
      semestre: 6,
      tipo: 'Inscribir clase',
      grupoActual: '-',
      grupoDestino: 'PRYE-12',
      observacion: ''
    },
    {
      id: 4,
      nombre: 'Elizabeth Correa Suárez',
      titulo: 'Cambio de grupo: AYSR - 1 → AYSR - 3',
      prioridad: 'Media',
      fecha: '2025-01-12',
      codigo: '1000100104',
      carrera: 'Ingeniería de Sistemas',
      semestre: 4,
      tipo: 'Cambio de Grupo',
      grupoActual: 'AYSR-1',
      grupoDestino: 'AYSR-3',
      observacion: ''
    },
    {
      id: 5,
      nombre: 'Juan Pablo Contreras',
      titulo: 'Cambio de grupo: FPOP - 3 → FPOP - 1',
      prioridad: 'Baja',
      fecha: '2025-01-11',
      codigo: '1000100105',
      carrera: 'Filosofía',
      semestre: 2,
      tipo: 'Cambio de Grupo',
      grupoActual: 'FPOP-3',
      grupoDestino: 'FPOP-1',
      observacion: ''
    },
    {
      id: 6,
      nombre: 'Ignacio Andrés Castillo Rendón',
      titulo: 'Inscribir clase: DOPO - 1',
      prioridad: 'Baja',
      fecha: '2025-01-10',
      codigo: '1000100106',
      carrera: 'Derecho',
      semestre: 3,
      tipo: 'Inscribir clase',
      grupoActual: '-',
      grupoDestino: 'DOPO-1',
      observacion: ''
    },
    {
      id: 7,
      nombre: 'Sandra Vanessa Casallas Amaya',
      titulo: 'Cambio de grupo: ECI3 - 5 → ECI3 - 6',
      prioridad: 'Baja',
      fecha: '2025-01-09',
      codigo: '1000100107',
      carrera: 'Economía',
      semestre: 3,
      tipo: 'Cambio de Grupo',
      grupoActual: 'ECI3-5',
      grupoDestino: 'ECI3-6',
      observacion: ''
    }
  ]

  // Función para ordenar (simulada - en el futuro el backend hará esto)
  const getSortedSolicitudes = () => {
    const sorted = [...solicitudes]
    
    if (sortBy === 'fecha') {
      sorted.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    } else if (sortBy === 'prioridad') {
      const prioridadOrder = { 'Alta': 3, 'Media': 2, 'Baja': 1 }
      sorted.sort((a, b) => prioridadOrder[b.prioridad] - prioridadOrder[a.prioridad])
    } else if (sortBy === 'nombre') {
      sorted.sort((a, b) => a.nombre.localeCompare(b.nombre))
    }
    
    return sorted
  }

  const handleSolicitudClick = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const prioridadColor = (prioridad) => {
    if (prioridad === 'Media') return 'bg-yellow-500'
    if (prioridad === 'Baja') return 'bg-green-500'
    return 'bg-red-500'
  }

  return (
    <Layout homeRoute="/dean-home">
      <div className="pl-16">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Gestión de Solicitudes</h1>
          
          {/* Filtro de ordenamiento */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Ordenar por:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="fecha">Fecha</option>
              <option value="prioridad">Prioridad</option>
              <option value="nombre">Nombre</option>
            </select>
          </div>
        </div>

        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Tabla de solicitudes */}
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[2fr_3fr_1fr] gap-4 px-4 text-sm font-semibold text-gray-600">
            <div>Nombre del Estudiante</div>
            <div>Título de la solicitud</div>
            <div>Prioridad</div>
          </div>

          {/* Solicitudes */}
          {getSortedSolicitudes().map((solicitud) => (
            <button
              key={solicitud.id}
              onClick={() => handleSolicitudClick(solicitud)}
              className="w-full bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <div className="grid grid-cols-[2fr_3fr_1fr] gap-4 items-center text-left">
                <div className="font-medium">{solicitud.nombre}</div>
                <div className="text-sm text-gray-700">{solicitud.titulo}</div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${prioridadColor(solicitud.prioridad)}`}></div>
                  <span className="text-sm">{solicitud.prioridad}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <StudentInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solicitud={selectedSolicitud}
      />
    </Layout>
  )
}

export default GestionarSolicitudes