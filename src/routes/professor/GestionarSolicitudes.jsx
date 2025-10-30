import { useState } from 'react'
import Layout from '../../components/common/Layout'
import StudentInfoModal from '../../components/dean/StudentInfoModal'

const GestionarSolicitudes = () => {
  const [sortBy, setSortBy] = useState('fecha')
  const [filterTipo, setFilterTipo] = useState('todas')
  const [filterEstado, setFilterEstado] = useState('pendientes')
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const role = 'profesor'
  const homeRoute = '/profesor-home'

  // Datos de ejemplo (esto vendrá del backend)
  const [solicitudes, setSolicitudes] = useState([
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
      observacion: 'Tengo conflicto de horario con otra materia. Necesito cambiar al grupo 4 que es en la tarde.',
      estado: 'pendiente'
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
      observacion: 'Necesito inscribir esta materia para completar mis créditos del semestre.',
      estado: 'pendiente'
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
      observacion: 'Ya cumplí con los prerequisitos y quiero adelantar esta materia.',
      estado: 'pendiente'
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
      observacion: 'El horario del grupo 1 choca con mi trabajo. Necesito el grupo 3.',
      estado: 'pendiente'
    },
    {
      id: 5,
      nombre: 'Juan Pablo Contreras',
      titulo: 'Cambio de grupo: FPOP - 3 → FPOP - 1',
      prioridad: 'Baja',
      fecha: '2025-01-11',
      codigo: '1000100105',
      carrera: 'Administración de Empresas',
      semestre: 2,
      tipo: 'Cambio de Grupo',
      grupoActual: 'FPOP-3',
      grupoDestino: 'FPOP-1',
      observacion: 'Prefiero el horario del grupo 1.',
      estado: 'pendiente'
    },
    {
      id: 6,
      nombre: 'Ignacio Andrés Castillo Rendón',
      titulo: 'Inscribir clase: DOPO - 1',
      prioridad: 'Baja',
      fecha: '2025-01-10',
      codigo: '1000100106',
      carrera: 'Ingeniería de Sistemas',
      semestre: 3,
      tipo: 'Inscribir clase',
      grupoActual: '-',
      grupoDestino: 'DOPO-1',
      observacion: 'Electiva de interés personal.',
      estado: 'pendiente'
    },
    {
      id: 7,
      nombre: 'Sandra Vanessa Casallas Amaya',
      titulo: 'Cambio de grupo: EGI3 - 5 → EGI3 - 6',
      prioridad: 'Baja',
      fecha: '2025-01-09',
      codigo: '1000100107',
      carrera: 'Economía',
      semestre: 3,
      tipo: 'Cambio de Grupo',
      grupoActual: 'EGI3-5',
      grupoDestino: 'EGI3-6',
      observacion: 'El profesor del grupo 6 tiene mejor metodología según comentarios.',
      estado: 'pendiente'
    },
    {
      id: 8,
      nombre: 'Carlos Rodríguez',
      titulo: 'Cambio de grupo: CALV - 1 → CALV - 2',
      prioridad: 'Media',
      fecha: '2025-01-08',
      codigo: '1000100108',
      carrera: 'Ingeniería de Sistemas',
      semestre: 3,
      tipo: 'Cambio de Grupo',
      grupoActual: 'CALV-1',
      grupoDestino: 'CALV-2',
      observacion: 'Conflicto de horario.',
      estado: 'aprobada',
      respuesta: 'Aprobada. Grupo con disponibilidad.',
      fechaRespuesta: '2025-01-08'
    },
    {
      id: 9,
      nombre: 'Ana María López',
      titulo: 'Inscribir clase: BADA - 5',
      prioridad: 'Alta',
      fecha: '2025-01-07',
      codigo: '1000100109',
      carrera: 'Ingeniería de Sistemas',
      semestre: 5,
      tipo: 'Inscribir clase',
      grupoActual: '-',
      grupoDestino: 'BADA-5',
      observacion: 'Necesito esta materia urgente.',
      estado: 'rechazada',
      respuesta: 'Grupo sin cupos disponibles. Por favor selecciona otro grupo.',
      fechaRespuesta: '2025-01-07'
    },
    {
      id: 10,
      nombre: 'Pedro Gómez',
      titulo: 'Cambio de grupo: ALGO - 3 → ALGO - 5',
      prioridad: 'Media',
      fecha: '2025-01-06',
      codigo: '1000100110',
      carrera: 'Ingeniería de Sistemas',
      semestre: 4,
      tipo: 'Cambio de Grupo',
      grupoActual: 'ALGO-3',
      grupoDestino: 'ALGO-5',
      observacion: 'Necesito cambiar de grupo por motivos personales.',
      estado: 'info-solicitada',
      respuesta: 'Por favor adjunta certificado médico que justifique el cambio de horario.',
      fechaRespuesta: '2025-01-06'
    }
  ])

  const getFilteredAndSortedSolicitudes = () => {
    let filtered = [...solicitudes]
    
    if (filterEstado === 'pendientes') {
      filtered = filtered.filter(s => s.estado === 'pendiente')
    } else if (filterEstado === 'aprobadas') {
      filtered = filtered.filter(s => s.estado === 'aprobada')
    } else if (filterEstado === 'rechazadas') {
      filtered = filtered.filter(s => s.estado === 'rechazada')
    } else if (filterEstado === 'info-solicitada') {
      filtered = filtered.filter(s => s.estado === 'info-solicitada')
    }
    
    if (filterTipo !== 'todas') {
      filtered = filtered.filter(s => s.tipo === filterTipo)
    }
    
    if (sortBy === 'fecha') {
      filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    } else if (sortBy === 'prioridad') {
      const prioridadOrder = { 'Alta': 3, 'Media': 2, 'Baja': 1 }
      filtered.sort((a, b) => prioridadOrder[b.prioridad] - prioridadOrder[a.prioridad])
    } else if (sortBy === 'nombre') {
      filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
    }
    
    return filtered
  }

  const handleSolicitudClick = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const handleAprobar = (solicitudId, motivo) => {
    setSolicitudes(solicitudes.map(sol => 
      sol.id === solicitudId 
        ? { 
            ...sol, 
            estado: 'aprobada', 
            respuesta: motivo,
            fechaRespuesta: new Date().toISOString().split('T')[0]
          } 
        : sol
    ))
    alert('Solicitud aprobada exitosamente')
  }

  const handleRechazar = (solicitudId, motivo) => {
    setSolicitudes(solicitudes.map(sol => 
      sol.id === solicitudId 
        ? { 
            ...sol, 
            estado: 'rechazada', 
            respuesta: motivo,
            fechaRespuesta: new Date().toISOString().split('T')[0]
          } 
        : sol
    ))
    alert('Solicitud rechazada')
  }

  const handleSolicitarInfo = (solicitudId, informacionRequerida) => {
    setSolicitudes(solicitudes.map(sol => 
      sol.id === solicitudId 
        ? { 
            ...sol, 
            estado: 'info-solicitada', 
            respuesta: informacionRequerida,
            fechaRespuesta: new Date().toISOString().split('T')[0]
          } 
        : sol
    ))
    alert('Se ha solicitado información adicional al estudiante')
  }

  const prioridadColor = (prioridad) => {
    if (prioridad === 'Media') return 'bg-yellow-500'
    if (prioridad === 'Baja') return 'bg-green-500'
    return 'bg-red-500'
  }

  const estadoColor = (estado) => {
    if (estado === 'aprobada') return 'text-green-600'
    if (estado === 'rechazada') return 'text-red-600'
    if (estado === 'pendiente') return 'text-gray-600'
    if (estado === 'info-solicitada') return 'text-yellow-600'
    return 'text-gray-600'
  }

  const estadoTexto = (estado) => {
    if (estado === 'info-solicitada') return 'Info Solicitada'
    return estado.charAt(0).toUpperCase() + estado.slice(1)
  }

  const solicitudesFiltradas = getFilteredAndSortedSolicitudes()

  return (
    <Layout homeRoute={homeRoute} role={role}>
      <div className="pl-16">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Gestión de Solicitudes</h1>
          
          {/* Filtros */}
          <div className="flex items-center gap-4">
            {/* Filtro por Estado */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Estado:</label>
              <select 
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="pendientes">Pendientes</option>
                <option value="info-solicitada">Info Solicitada</option>
                <option value="aprobadas">Aprobadas</option>
                <option value="rechazadas">Rechazadas</option>
                <option value="todas">Todas</option>
              </select>
            </div>

            {/* Filtro por Tipo */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Tipo:</label>
              <select 
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="todas">Todas</option>
                <option value="Cambio de Grupo">Cambio de Grupo</option>
                <option value="Inscribir clase">Inscribir Clase</option>
                <option value="Bajar Asignatura">Bajar Asignatura</option>
              </select>
            </div>

            {/* Ordenar por */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Ordenar:</label>
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
        </div>

        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Contador de resultados */}
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {solicitudesFiltradas.length} solicitud{solicitudesFiltradas.length !== 1 ? 'es' : ''}
        </div>

        {/* Tabla de solicitudes */}
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 px-4 text-sm font-semibold text-gray-600">
            <div>Nombre del Estudiante</div>
            <div>Título de la solicitud</div>
            <div>Prioridad</div>
            <div>Estado</div>
          </div>

          {/* Solicitudes */}
          {solicitudesFiltradas.length > 0 ? (
            solicitudesFiltradas.map((solicitud) => (
              <button
                key={solicitud.id}
                onClick={() => handleSolicitudClick(solicitud)}
                className="w-full bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 items-center text-left">
                  <div className="font-medium">{solicitud.nombre}</div>
                  <div className="text-sm text-gray-700">{solicitud.titulo}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${prioridadColor(solicitud.prioridad)}`}></div>
                    <span className="text-sm">{solicitud.prioridad}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-semibold capitalize ${estadoColor(solicitud.estado)}`}>
                      {estadoTexto(solicitud.estado)}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No hay solicitudes que coincidan con los filtros seleccionados
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <StudentInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solicitud={selectedSolicitud}
        onAprobar={handleAprobar}
        onRechazar={handleRechazar}
        onSolicitarInfo={handleSolicitarInfo}
      />
    </Layout>
  )
}

export default GestionarSolicitudes