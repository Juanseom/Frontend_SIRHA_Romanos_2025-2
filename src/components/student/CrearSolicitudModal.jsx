import { useState } from 'react'
import { 
  materiasInscritas, 
  materiasParaInscribir, 
  gruposDisponibles,
  validaciones,
  getGrupoInfo 
} from '../../utils/mockData'

const CrearSolicitudModal = ({ isOpen, onClose, onCreate, periodoActual }) => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Cambio Grupo')
  const [formData, setFormData] = useState({
    tipo: 'Cambio Grupo',
    materiaSeleccionada: '',
    retirarMateria: '',
    retirarGrupo: '',
    inscribirMateria: '',
    inscribirGrupo: '',
    descripcion: ''
  })
  const [errores, setErrores] = useState({})

  if (!isOpen) return null

  const tiposSolicitud = [
    'Cambio Grupo',
    'Inscribir Asignatura',
    'Bajar Asignatura'
  ]

  const handleTipoClick = (tipo) => {
    setTipoSeleccionado(tipo)
    setFormData({
      ...formData,
      tipo,
      materiaSeleccionada: '',
      retirarMateria: '',
      retirarGrupo: '',
      inscribirMateria: '',
      inscribirGrupo: ''
    })
    setErrores({})
  }

  const handleMateriaChange = (value) => {
    setFormData({ ...formData, materiaSeleccionada: value })
    setErrores({ ...errores, materia: '' })

    if (tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Bajar Asignatura') {
      const materia = materiasInscritas.find(m => m.codigo === value)
      if (materia) {
        setFormData({
          ...formData,
          materiaSeleccionada: value,
          retirarMateria: materia.nombre,
          retirarGrupo: materia.grupoActual
        })
      }
    }
    else if (tipoSeleccionado === 'Inscribir Asignatura') {
      const materia = materiasParaInscribir.find(m => m.codigo === value)
      if (materia) {
        setFormData({
          ...formData,
          materiaSeleccionada: value,
          inscribirMateria: materia.nombre
        })
      }
    }
  }

  const handleGrupoChange = (value) => {
    setFormData({ ...formData, inscribirGrupo: value })
    setErrores({ ...errores, grupo: '' })
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setErrores({ ...errores, [field]: '' })
  }

  const getMateriasDisponibles = () => {
    if (tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Bajar Asignatura') {
      return materiasInscritas
    } else if (tipoSeleccionado === 'Inscribir Asignatura') {
      return materiasParaInscribir
    }
    return []
  }

  const getGruposDisponibles = () => {
    if (!formData.materiaSeleccionada) return []

    if (tipoSeleccionado === 'Cambio Grupo') {
      return gruposDisponibles[formData.materiaSeleccionada] || []
    } else if (tipoSeleccionado === 'Inscribir Asignatura') {
      const materia = materiasParaInscribir.find(m => m.codigo === formData.materiaSeleccionada)
      return materia?.grupos || []
    }
    return []
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.materiaSeleccionada) {
      nuevosErrores.materia = 'Debes seleccionar una materia'
    }

    if (tipoSeleccionado === 'Cambio Grupo') {
      if (!formData.inscribirGrupo) {
        nuevosErrores.grupo = 'Debes seleccionar el grupo destino'
      } else if (formData.inscribirGrupo === formData.retirarGrupo) {
        nuevosErrores.grupo = 'El grupo destino debe ser diferente al actual'
      } else if (!validaciones.tieneCupos(formData.materiaSeleccionada, formData.inscribirGrupo)) {
        nuevosErrores.grupo = 'El grupo no tiene cupos disponibles'
      }
    }

    if (tipoSeleccionado === 'Inscribir Asignatura') {
      if (!formData.inscribirGrupo) {
        nuevosErrores.grupo = 'Debes seleccionar un grupo'
      } else if (!validaciones.tieneCupos(formData.materiaSeleccionada, formData.inscribirGrupo)) {
        nuevosErrores.grupo = 'El grupo no tiene cupos disponibles'
      }
    }

    if (!formData.descripcion || formData.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleCrearSolicitud = () => {
    if (!validarFormulario()) {
      return
    }

    const nuevaSolicitud = {
      id: Date.now(),
      tipo: formData.tipo,
      numeroSolicitud: `000${Math.floor(Math.random() * 99999)}`,
      numeroCatalogo: formData.materiaSeleccionada,
      codigoGrupo: formData.inscribirGrupo || formData.retirarGrupo || 'N/A',
      fechaRealizada: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(',', ''),
      periodo: periodoActual,
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
    
    setFormData({
      tipo: 'Cambio Grupo',
      materiaSeleccionada: '',
      retirarMateria: '',
      retirarGrupo: '',
      inscribirMateria: '',
      inscribirGrupo: '',
      descripcion: ''
    })
    setErrores({})
    
    onClose()
  }

  const mostrarRetirar = tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Bajar Asignatura'
  const mostrarInscribir = tipoSeleccionado === 'Cambio Grupo' || tipoSeleccionado === 'Inscribir Asignatura'

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

            {/* Selector de Materia */}
            <div>
              <label className="block text-sm font-semibold mb-1">Materia:</label>
              <select
                value={formData.materiaSeleccionada}
                onChange={(e) => handleMateriaChange(e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errores.materia ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona una materia</option>
                {getMateriasDisponibles().map((materia) => (
                  <option key={materia.codigo} value={materia.codigo}>
                    {materia.codigo} - {materia.nombre}
                  </option>
                ))}
              </select>
              {errores.materia && (
                <p className="text-red-600 text-xs mt-1">{errores.materia}</p>
              )}
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
                        readOnly
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Grupo/Clase:</label>
                      <input
                        type="text"
                        value={formData.retirarGrupo}
                        readOnly
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
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
                        readOnly
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Grupo/Clase:</label>
                      <select
                        value={formData.inscribirGrupo}
                        onChange={(e) => handleGrupoChange(e.target.value)}
                        disabled={!formData.materiaSeleccionada}
                        className={`w-full border rounded px-2 py-1 text-sm ${
                          errores.grupo ? 'border-red-500' : 'border-gray-300'
                        } ${!formData.materiaSeleccionada ? 'bg-gray-100' : ''}`}
                      >
                        <option value="">Seleccionar grupo</option>
                        {getGruposDisponibles().map((grupo) => (
                          <option 
                            key={grupo.codigo} 
                            value={grupo.codigo}
                            disabled={grupo.cuposDisponibles === 0}
                          >
                            {grupo.codigo} - {grupo.profesor}
                            {grupo.cuposDisponibles > 0 
                              ? ` (${grupo.cuposDisponibles} cupos)` 
                              : ' (SIN CUPOS)'}
                          </option>
                        ))}
                      </select>
                      {errores.grupo && (
                        <p className="text-red-600 text-xs mt-1">{errores.grupo}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Info del grupo seleccionado */}
                  {formData.inscribirGrupo && formData.materiaSeleccionada && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                      {(() => {
                        const grupoInfo = getGrupoInfo(formData.materiaSeleccionada, formData.inscribirGrupo)
                        return grupoInfo ? (
                          <>
                            <p><strong>Horario:</strong> {grupoInfo.horario}</p>
                            <p><strong>Cupos:</strong> {grupoInfo.cuposDisponibles}/{grupoInfo.cuposTotal}</p>
                          </>
                        ) : null
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold mb-1">Descripción:</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Cuéntanos los detalles de tu solicitud (mínimo 10 caracteres)..."
                className={`w-full border rounded px-3 py-2 text-sm resize-none ${
                  errores.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
              />
              <div className="flex justify-between items-center mt-1">
                {errores.descripcion && (
                  <p className="text-red-600 text-xs">{errores.descripcion}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">{formData.descripcion.length}/500</p>
              </div>
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