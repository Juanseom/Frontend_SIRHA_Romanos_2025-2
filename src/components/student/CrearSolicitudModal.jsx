import { useState } from 'react'

const CrearSolicitudModal = ({ isOpen, onClose, onCreate }) => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Cambio Grupo')
  const [formData, setFormData] = useState({
    tipo: 'Cambio Grupo',
    retirarMateria: '',
    retirarGrupo: '',
    inscribirMateria: '',
    inscribirGrupo: '',
    descripcion: ''
  })

  if (!isOpen) return null

  const tiposSolicitud = [
    'Cambio Grupo',
    'Inscribir/Adicionar Materia',
    'Retirar Materia'
  ]

  const handleTipoClick = (tipo) => {
    setTipoSeleccionado(tipo)
    setFormData({ ...formData, tipo })
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCrearSolicitud = () => {
    // Validación básica
    if (tipoSeleccionado === 'Cambio Grupo') {
      if (!formData.retirarMateria || !formData.retirarGrupo || 
          !formData.inscribirMateria || !formData.inscribirGrupo || 
          !formData.descripcion) {
        alert('Por favor completa todos los campos obligatorios')
        return
      }
    } else if (tipoSeleccionado === 'Inscribir/Adicionar Materia') {
      if (!formData.inscribirMateria || !formData.inscribirGrupo || !formData.descripcion) {
        alert('Por favor completa todos los campos obligatorios')
        return
      }
    } else if (tipoSeleccionado === 'Retirar Materia') {
      if (!formData.retirarMateria || !formData.retirarGrupo || !formData.descripcion) {
        alert('Por favor completa todos los campos obligatorios')
        return
      }
    }

    // Crear objeto de solicitud
    const nuevaSolicitud = {
      id: Date.now(),
      tipo: formData.tipo,
      numeroSolicitud: `000${Math.floor(Math.random() * 99999)}`,
      numeroCatalogo: formData.inscribirMateria || formData.retirarMateria || 'N/A',
      codigoGrupo: formData.inscribirGrupo || formData.retirarGrupo || 'N/A',
      fechaRealizada: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(',', ''),
      estado: 'pendiente',
      aRetirar: formData.retirarMateria ? {
        nombreMateria: formData.retirarMateria,
        grupoClase: formData.retirarGrupo
      } : null,
      aInscribir: formData.inscribirMateria ? {
        nombreMateria: formData.inscribirMateria,
        grupoClase: formData.inscribirGrupo
      } : null,
      descripcion: formData.descripcion,
      respuesta: ''
    }

    onCreate(nuevaSolicitud)
    
    // Limpiar formulario
    setFormData({
      tipo: 'Cambio Grupo',
      retirarMateria: '',
      retirarGrupo: '',
      inscribirMateria: '',
      inscribirGrupo: '',
      descripcion: ''
    })
    
    onClose()
  }

  const mostrarRetirar = tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Retirar Materia'
  const mostrarInscribir = tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Inscribir/Adicionar Materia'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl flex overflow-hidden shadow-xl">
        {/* Menú lateral */}
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
          <h3 className="font-bold text-sm mb-4 text-black-600">Tipo de Petición</h3>
          <div className="space-y-2">
            {tiposSolicitud.map(tipo => (
              <button
                key={tipo}
                onClick={() => handleTipoClick(tipo)}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  tipoSeleccionado === tipo
                    ? 'bg-white border border-gray-300 font-semibold'
                    : 'hover:bg-gray-200'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario principal */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="bg-gray-200 px-4 py-3 -mx-6 -mt-6 mb-6">
            <h2 className="text-lg font-bold text-center">Crear Solicitud</h2>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-4">
            {/* Tipo */}
            <div>
              <label className="block text-sm font-semibold mb-1">Tipo:</label>
              <input
                type="text"
                value={tipoSeleccionado}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-sm"
              />
            </div>

            {/* Grid de A Retirar y A Inscribir */}
            <div className="grid grid-cols-2 gap-4">
              {/* A Retirar */}
              {mostrarRetirar && (
                <div>
                  <p className="font-semibold text-sm mb-2">A Retirar:</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs mb-1">Nombre Materia:</label>
                      <input
                        type="text"
                        value={formData.retirarMateria}
                        onChange={(e) => handleInputChange('retirarMateria', e.target.value)}
                        placeholder="Ej: CALV"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Grupo/Clase:</label>
                      <input
                        type="text"
                        value={formData.retirarGrupo}
                        onChange={(e) => handleInputChange('retirarGrupo', e.target.value)}
                        placeholder="Ej: 4147"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* A Inscribir */}
              {mostrarInscribir && (
                <div>
                  <p className="font-semibold text-sm mb-2">A Inscribir:</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs mb-1">Nombre Materia:</label>
                      <input
                        type="text"
                        value={formData.inscribirMateria}
                        onChange={(e) => handleInputChange('inscribirMateria', e.target.value)}
                        placeholder="Ej: CALV"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Grupo/Clase:</label>
                      <input
                        type="text"
                        value={formData.inscribirGrupo}
                        onChange={(e) => handleInputChange('inscribirGrupo', e.target.value)}
                        placeholder="Ej: 4144"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold mb-1">Descripción:</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Cuéntanos los detalles de tu solicitud..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
                rows="4"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handleCrearSolicitud}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Crear Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearSolicitudModal