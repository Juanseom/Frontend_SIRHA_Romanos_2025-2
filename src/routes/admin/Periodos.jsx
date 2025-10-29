import { useState } from 'react'
import Layout from '../../components/common/Layout'
import AddPeriodoModal from '../../components/dean/AddPeriodoModal'

const Periodos = () => {
  const [periodos, setPeriodos] = useState([
    {
      id: 1,
      nombre: 'Periodo de Inscripción - Semestre 2025-2',
      inicio: '2025-10-15T08:00',
      fin: '2025-10-15T09:00',
      estado: 'activo', // 'activo', 'proximo', 'finalizado'
      tipo: 'inscripcion'
    },
    {
      id: 2,
      nombre: 'Periodo de Cambios - Semestre 2025-1',
      inicio: '2025-08-13T10:00',
      fin: '2025-08-13T11:00',
      estado: 'finalizado',
      tipo: 'cambios'
    },
    {
      id: 3,
      nombre: 'Periodo de Inscripción - Semestre 2026-1',
      inicio: '2025-11-05T08:00',
      fin: '2025-11-05T09:00',
      estado: 'proximo',
      tipo: 'inscripcion'
    },
    {
      id: 4,
      nombre: 'Periodo de Retiros - Semestre 2025-2',
      inicio: '2025-11-06T08:00',
      fin: '2025-11-06T09:00',
      estado: 'proximo',
      tipo: 'retiros'
    },
    {
      id: 5,
      nombre: 'Periodo Especial de Cambios',
      inicio: '2025-12-11T11:00',
      fin: '2025-12-11T12:00',
      estado: 'proximo',
      tipo: 'cambios'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterEstado, setFilterEstado] = useState('todos')

  const handleNuevoPeriodo = () => {
    setIsModalOpen(true)
  }

  const handleAddPeriodo = (nuevoPeriodo) => {
    setPeriodos([nuevoPeriodo, ...periodos])
  }

  const handlePeriodoClick = (periodo) => {
    console.log('Periodo seleccionado:', periodo)
    // Aquí podrías abrir un modal de edición
  }

  const handleEliminarPeriodo = (periodoId, e) => {
    e.stopPropagation() // Evitar que se ejecute handlePeriodoClick
    if (confirm('¿Estás seguro de que deseas eliminar este periodo?')) {
      setPeriodos(periodos.filter(p => p.id !== periodoId))
    }
  }

  // Formatear fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    
    const diaSemana = dias[date.getDay()]
    const dia = date.getDate()
    const mes = meses[date.getMonth()]
    const hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })
    
    return `${diaSemana} ${dia} de ${mes} - ${hora}`
  }

  // Filtrar periodos
  const periodosFiltrados = periodos.filter(periodo => {
    if (filterEstado === 'todos') return true
    return periodo.estado === filterEstado
  })

  // Colores según estado
  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'activo':
        return 'bg-green-100 border-green-300 text-green-800'
      case 'proximo':
        return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'finalizado':
        return 'bg-gray-100 border-gray-300 text-gray-600'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'activo':
        return { text: 'Activo', icon: '🟢' }
      case 'proximo':
        return { text: 'Próximo', icon: '🔵' }
      case 'finalizado':
        return { text: 'Finalizado', icon: '⚫' }
      default:
        return { text: estado, icon: '⚪' }
    }
  }

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'inscripcion':
        return '📝'
      case 'cambios':
        return '🔄'
      case 'retiros':
        return '📤'
      default:
        return '📅'
    }
  }

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Periodos Habilitados</h1>
          
          {/* Filtro */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Estado:</label>
            <select 
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="proximo">Próximos</option>
              <option value="finalizado">Finalizados</option>
            </select>
          </div>
        </div>

        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Botón Nuevo Periodo */}
        <button
          onClick={handleNuevoPeriodo}
          className="mb-6 px-6 py-3 bg-[#b50e11] text-white rounded-lg hover:bg-[#8a0a0d] transition-colors font-semibold flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Nuevo Periodo
        </button>

        {/* Contador */}
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {periodosFiltrados.length} periodo{periodosFiltrados.length !== 1 ? 's' : ''}
        </div>

        {/* Lista de periodos */}
        <div className="space-y-4 max-w-[900px]">
          {periodosFiltrados.length > 0 ? (
            periodosFiltrados.map((periodo) => {
              const badge = getEstadoBadge(periodo.estado)
              return (
                <div
                  key={periodo.id}
                  onClick={() => handlePeriodoClick(periodo)}
                  className={`border-2 rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer ${getEstadoColor(periodo.estado)}`}
                >
                  <div className="flex items-start justify-between">
                    {/* Contenido principal */}
                    <div className="flex-1">
                      {/* Título y badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getTipoIcon(periodo.tipo)}</span>
                        <h3 className="text-lg font-bold">{periodo.nombre}</h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-white">
                          {badge.icon} {badge.text}
                        </span>
                      </div>

                      {/* Fechas */}
                      <div className="space-y-2 ml-9">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Inicio:</span>
                          <span>{formatearFecha(periodo.inicio)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Fin:</span>
                          <span>{formatearFecha(periodo.fin)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={(e) => handleEliminarPeriodo(periodo.id, e)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Eliminar periodo"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No hay periodos {filterEstado !== 'todos' ? filterEstado + 's' : ''}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AddPeriodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPeriodo}
      />
    </Layout>
  )
}

export default Periodos