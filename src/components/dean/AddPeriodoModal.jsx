import { useState } from 'react'

const AddPeriodoModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaInicio: '',
    horaInicio: '',
    fechaFin: '',
    horaFin: '',
    activo: true
  })
  const [errores, setErrores] = useState({})

  if (!isOpen) return null

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setErrores({ ...errores, [field]: '' })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.nombre) {
      nuevosErrores.nombre = 'El nombre del periodo es obligatorio'
    }

    if (!formData.fechaInicio) {
      nuevosErrores.fechaInicio = 'La fecha de inicio es obligatoria'
    }

    if (!formData.horaInicio) {
      nuevosErrores.horaInicio = 'La hora de inicio es obligatoria'
    }

    if (!formData.fechaFin) {
      nuevosErrores.fechaFin = 'La fecha de fin es obligatoria'
    }

    if (!formData.horaFin) {
      nuevosErrores.horaFin = 'La hora de fin es obligatoria'
    }

    // Validar que la fecha de fin sea después de la de inicio
    if (formData.fechaInicio && formData.fechaFin && formData.horaInicio && formData.horaFin) {
      const inicio = new Date(`${formData.fechaInicio}T${formData.horaInicio}`)
      const fin = new Date(`${formData.fechaFin}T${formData.horaFin}`)
      
      if (fin <= inicio) {
        nuevosErrores.fechaFin = 'La fecha de fin debe ser posterior a la de inicio'
      }
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    // Formatear las fechas para mostrar
    const formatearFecha = (fecha, hora) => {
      const date = new Date(`${fecha}T${hora}`)
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      const dia = dias[date.getDay()]
      const fechaFormateada = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
      const horaFormateada = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })
      
      return `${dia} ${fechaFormateada} - ${horaFormateada}`
    }

    const nuevoPeriodo = {
      id: Date.now(),
      nombre: formData.nombre,
      inicio: formatearFecha(formData.fechaInicio, formData.horaInicio),
      fin: formatearFecha(formData.fechaFin, formData.horaFin),
      activo: formData.activo
    }

    onAdd(nuevoPeriodo)
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      fechaInicio: '',
      horaInicio: '',
      fechaFin: '',
      horaFin: '',
      activo: true
    })
    setErrores({})
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      nombre: '',
      fechaInicio: '',
      horaInicio: '',
      fechaFin: '',
      horaFin: '',
      activo: true
    })
    setErrores({})
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-[#b50e11] px-6 py-4 flex justify-between items-center sticky top-0">
            <h2 className="text-xl font-bold text-white">Nuevo Periodo</h2>
            <button
              onClick={handleCancel}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nombre del Periodo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Periodo *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ej: Periodo 2025-2"
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                  errores.nombre ? 'border-red-500' : 'border-gray-300 focus:border-[#b50e11]'
                }`}
              />
              {errores.nombre && (
                <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>
              )}
            </div>

            {/* Fecha y Hora de Inicio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha y Hora de Inicio *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                    className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                      errores.fechaInicio ? 'border-red-500' : 'border-gray-300 focus:border-[#b50e11]'
                    }`}
                  />
                  {errores.fechaInicio && (
                    <p className="text-red-600 text-xs mt-1">{errores.fechaInicio}</p>
                  )}
                </div>
                <div>
                  <input
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => handleInputChange('horaInicio', e.target.value)}
                    className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                      errores.horaInicio ? 'border-red-500' : 'border-gray-300 focus:border-[#b50e11]'
                    }`}
                  />
                  {errores.horaInicio && (
                    <p className="text-red-600 text-xs mt-1">{errores.horaInicio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Fecha y Hora de Fin */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha y Hora de Fin *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => handleInputChange('fechaFin', e.target.value)}
                    className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                      errores.fechaFin ? 'border-red-500' : 'border-gray-300 focus:border-[#b50e11]'
                    }`}
                  />
                  {errores.fechaFin && (
                    <p className="text-red-600 text-xs mt-1">{errores.fechaFin}</p>
                  )}
                </div>
                <div>
                  <input
                    type="time"
                    value={formData.horaFin}
                    onChange={(e) => handleInputChange('horaFin', e.target.value)}
                    className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                      errores.horaFin ? 'border-red-500' : 'border-gray-300 focus:border-[#b50e11]'
                    }`}
                  />
                  {errores.horaFin && (
                    <p className="text-red-600 text-xs mt-1">{errores.horaFin}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => handleInputChange('activo', e.target.checked)}
                  className="w-5 h-5 text-[#b50e11] focus:ring-[#b50e11] rounded"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Activar periodo inmediatamente
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-7">
                {formData.activo 
                  ? '✅ Los estudiantes podrán realizar solicitudes en este periodo'
                  : '⏸️ El periodo se creará inactivo. Podrás activarlo más tarde'}
              </p>
            </div>

            {/* Info importante */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Importante:</strong> Solo puede haber un periodo activo a la vez. 
                Si activas este periodo, se desactivarán automáticamente los demás.
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3 sticky bottom-0">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#b50e11] text-white rounded-lg hover:bg-[#8a0a0d] transition-colors font-semibold"
            >
              Crear Periodo
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPeriodoModal