import { useState } from 'react'
import Layout from '../../components/common/Layout'
import SolicitudCard from '../../components/student/SolicitudCard'
import SolicitudDetalleModal from '../../components/student/SolicitudDetalleModal'

const MisSolicitudes = () => {
  const [activeTab, setActiveTab] = useState('todas')
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('2025-2')
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Datos de ejemplo (vendrán del backend)
  // Datos de ejemplo (vendrán del backend)
const solicitudes = [
  {
    id: 1,
    tipo: 'Cambio Grupo',
    numeroSolicitud: '00021671',
    numeroCatalogo: '98698',
    codigoGrupo: '1770',
    fechaRealizada: '20/07/2025 3:27PM',
    estado: 'aprobada',
    aRetirar: {
      nombreMateria: 'CALV',
      grupoClase: '4147'
    },
    aInscribir: {
      nombreMateria: 'CALV',
      grupoClase: '4144'
    },
    descripcion: 'No se qué escribir, pero aquí irá la excusa de por qué la quiere cambiar o eso.',
    respuesta: 'No se qué escribir, pero aquí está la razón de por qué se la aprobaron o nada.'
  },
  {
    id: 2,
    tipo: 'Bajar Asignatura',
    numeroSolicitud: '00021671',
    numeroCatalogo: 'FUPB',
    codigoGrupo: '8808',
    fechaRealizada: '20/07/2025 3:27PM',
    estado: 'en proceso',
    aRetirar: {
      nombreMateria: 'FUPB',
      grupoClase: '8808'
    },
    aInscribir: null,
    descripcion: 'Necesito bajar esta materia por razones personales.',
    respuesta: ''
  },
  {
    id: 3,
    tipo: 'Inscribir Asignatura',
    numeroSolicitud: '00021671',
    numeroCatalogo: 'PRYE',
    codigoGrupo: '4567',
    fechaRealizada: '20/07/2025 3:27PM',
    estado: 'en proceso',
    aRetirar: null,
    aInscribir: {
      nombreMateria: 'PRYE',
      grupoClase: '4567'
    },
    descripcion: 'Quiero inscribir esta materia para completar mis créditos.',
    respuesta: ''
  },
  {
    id: 4,
    tipo: 'Bajar Asignatura',
    numeroSolicitud: '00021671',
    numeroCatalogo: 'DOSW',
    codigoGrupo: '1964',
    fechaRealizada: '20/07/2025 3:27PM',
    estado: 'rechazada',
    aRetirar: {
      nombreMateria: 'DOSW',
      grupoClase: '1964'
    },
    aInscribir: null,
    descripcion: 'Solicito bajar esta materia.',
    respuesta: 'No se qué escribir, pero aquí está la razón de por qué se la rechazaron.'
  },
  {
    id: 5,
    tipo: 'Cambio Grupo',
    numeroSolicitud: '00021671',
    numeroCatalogo: 'ECI3',
    codigoGrupo: '2163',
    fechaRealizada: '20/07/2025 3:27PM',
    estado: 'pendiente',
    aRetirar: {
      nombreMateria: 'CALV',
      grupoClase: '4147'
    },
    aInscribir: {
      nombreMateria: 'CALV',
      grupoClase: '4144'
    },
    descripcion: 'No se qué escribir, pero aquí irá la excusa de por qué la quiere cambiar o eso.',
    respuesta: ''
  }
]

  // Filtrar según la pestaña activa
  const solicitudesFiltradas = solicitudes.filter(sol => {
    if (activeTab === 'todas') return true
    if (activeTab === 'aprobadas') return sol.estado === 'aprobada'
    if (activeTab === 'rechazadas') return sol.estado === 'rechazada'
    if (activeTab === 'pendientes') return sol.estado === 'pendiente'
    if (activeTab === 'en-proceso') return sol.estado === 'en proceso'
    return true
  })

  const handleSolicitudClick = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const handleNuevaSolicitud = () => {
    alert('Funcionalidad de nueva solicitud - Por implementar')
    // navigate('/student/nueva-solicitud')
  }

  const tabs = [
    { id: 'todas', label: 'Todas' },
    { id: 'aprobadas', label: 'Aprobadas' },
    { id: 'rechazadas', label: 'Rechazadas' },
    { id: 'pendientes', label: 'Pendientes' },
    { id: 'en-proceso', label: 'En Proceso' }
  ]

  return (
    <Layout homeRoute="/student-home" role="student">
      <div className="pl-16">
        {/* Header con título y filtro de periodo */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tus Solicitudes</h1>
          
          {/* Filtro de periodo */}
          <div className="flex flex-col items-end">
            <label className="text-sm mb-1">Seleccionar Periodo Académico:</label>
            <select 
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="2025-2">2025-2</option>
              <option value="2025-1">2025-1</option>
              <option value="2024-2">2024-2</option>
              <option value="2024-1">2024-1</option>
            </select>
          </div>
        </div>

        {/* Pestañas/Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-black font-semibold'
                  : 'border-transparent hover:border-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Lista de solicitudes - MISMO ANCHO QUE LA LÍNEA */}
        <div className="space-y-4 mb-8 max-w-[1200px]">
        {solicitudesFiltradas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
            No hay solicitudes {activeTab !== 'todas' ? `${activeTab}` : ''} en este periodo
            </p>
        ) : (
            solicitudesFiltradas.map(solicitud => (
            <SolicitudCard
                key={solicitud.id}
                solicitud={solicitud}
                onClick={handleSolicitudClick}
            />
            ))
        )}
        </div>

        {/* Botón Nueva Solicitud */}
        <div className="flex justify-center">
          <button
            onClick={handleNuevaSolicitud}
            className="px-8 py-3 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors font-semibold"
          >
            Nueva Solicitud +
          </button>
        </div>
      </div>

      {/* Modal de detalles */}
      <SolicitudDetalleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solicitud={selectedSolicitud}
      />
    </Layout>
  )
}

export default MisSolicitudes