import { useState } from 'react'

const AddPeriodoModal = ({ isOpen, onClose, onAdd }) => {
  const [fechaDesde, setFechaDesde] = useState('')
  const [horaDesde, setHoraDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [horaHasta, setHoraHasta] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!fechaDesde || !horaDesde || !fechaHasta || !horaHasta) {
      alert('Por favor completa todos los campos')
      return
    }

    // Formatear el periodo
    const nuevoPeriodo = {
      id: Date.now(), // ID temporal
      inicio: `${formatearFecha(fechaDesde)} - ${horaDesde}`,
      fin: `${formatearFecha(fechaHasta)} - ${horaHasta}`
    }

    onAdd(nuevoPeriodo)
    
    // Limpiar formulario
    setFechaDesde('')
    setHoraDesde('')
    setFechaHasta('')
    setHoraHasta('')
    
    onClose()
  }

  const formatearFecha = (fecha) => {
    // Convierte "2025-10-15" a "Miércoles 15/10"
    const date = new Date(fecha)
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const dia = dias[date.getDay()]
    const diaNum = date.getDate()
    const mes = date.getMonth() + 1
    return `${dia} ${diaNum}/${mes}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold hover:text-gray-600"
        >
          X
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold mb-4 text-center">Añadir un periodo</h2>
        <div className="w-full h-1 bg-black mb-6"></div>

        {/* Desde */}
        <div className="mb-6 bg-gray-200 p-4 rounded">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <label className="font-bold">Desde:</label>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm"
              placeholder="dd/mm/aaaa"
            />
            <input
              type="time"
              value={horaDesde}
              onChange={(e) => setHoraDesde(e.target.value)}
              className="w-28 border border-gray-400 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Hasta */}
        <div className="mb-6 bg-gray-200 p-4 rounded">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <label className="font-bold">Hasta:</label>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm"
              placeholder="dd/mm/aaaa"
            />
            <input
              type="time"
              value={horaHasta}
              onChange={(e) => setHoraHasta(e.target.value)}
              className="w-28 border border-gray-400 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Botón Añadir */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors"
          >
            Añadir Periodo
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPeriodoModal