import { useState } from 'react'

const CrearGrupoModalAvanzado = ({ isOpen, onClose, onCrear, materias }) => {
  const [formData, setFormData] = useState({
    materiaId: '',
    seccion: '1',
    codigoGrupo: '',
    profesor: '',
    cuposTotales: 30,
    ciclo: '2025-2',
    estado: 'abierto'
  })

  const [horarios, setHorarios] = useState([])
  const [nuevoHorario, setNuevoHorario] = useState({
    dia: 'LUNES',
    horaInicio: '07:00',
    horaFin: '08:30',
    salon: ''
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  // Configuración de horarios
  const diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
  
  const horariosDisponibles = [
    '07:00', '08:30', '10:00', '11:30',
    '13:00', '14:30', '16:00', '17:30'
  ]

  // Generar automáticamente código de 4 dígitos
  const generarCodigoGrupo = () => {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString()
    handleChange('codigoGrupo', codigo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones
    const newErrors = {}
    
    if (!formData.materiaId) {
      newErrors.materiaId = 'Debe seleccionar una materia'
    }
    
    if (!formData.codigoGrupo.trim()) {
      newErrors.codigoGrupo = 'El código del grupo es requerido'
    } else if (!/^\d{4}$/.test(formData.codigoGrupo)) {
      newErrors.codigoGrupo = 'El código debe ser de 4 dígitos numéricos'
    }
    
    if (!formData.profesor.trim()) {
      newErrors.profesor = 'El profesor es requerido'
    }
    
    if (formData.cuposTotales < 1 || formData.cuposTotales > 100) {
      newErrors.cuposTotales = 'Los cupos deben estar entre 1 y 100'
    }
    
    if (horarios.length === 0) {
      newErrors.horarios = 'Debe agregar al menos un horario'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Encontrar la materia seleccionada
    const materiaSeleccionada = materias.find(m => m.id === parseInt(formData.materiaId))
    
    const grupoCompleto = {
      ...formData,
      materiaCodigo: materiaSeleccionada.codigo,
      nombreCompleto: `${materiaSeleccionada.codigo}-${formData.seccion}`,
      horarios: horarios,
      cuposOcupados: 0
    }
    
    onCrear(grupoCompleto)
    
    // Reset form
    setFormData({
      materiaId: '',
      seccion: '1',
      codigoGrupo: '',
      profesor: '',
      cuposTotales: 30,
      ciclo: '2025-2',
      estado: 'abierto'
    })
    setHorarios([])
    setErrors({})
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleAgregarHorario = () => {
    // Validar horario
    if (!nuevoHorario.salon.trim()) {
      alert('❌ Debe especificar un salón')
      return
    }

    // Validar duración (debe ser 1h 30min)
    const inicio = new Date(`2000-01-01T${nuevoHorario.horaInicio}`)
    const fin = new Date(`2000-01-01T${nuevoHorario.horaFin}`)
    const duracion = (fin - inicio) / (1000 * 60) // minutos
    
    if (duracion !== 90) {
      alert('❌ Las clases deben durar exactamente 1 hora y 30 minutos')
      return
    }

    // Verificar que no haya solapamiento en el mismo día
    const hayConflicto = horarios.some(h =>
      h.dia === nuevoHorario.dia &&
      !(nuevoHorario.horaFin <= h.horaInicio || nuevoHorario.horaInicio >= h.horaFin)
    )

    if (hayConflicto) {
      alert('❌ Ya existe un horario en ese día que se solapa con el horario que intentas agregar')
      return
    }

    setHorarios([...horarios, { ...nuevoHorario }])
    
    // Reset nuevo horario
    setNuevoHorario({
      dia: 'LUNES',
      horaInicio: '07:00',
      horaFin: '08:30',
      salon: ''
    })
    
    // Limpiar error de horarios si existía
    if (errors.horarios) {
      setErrors({ ...errors, horarios: null })
    }
  }

  const handleEliminarHorario = (index) => {
    setHorarios(horarios.filter((_, i) => i !== index))
  }

  const calcularHoraFin = (horaInicio) => {
    const [horas, minutos] = horaInicio.split(':').map(Number)
    let nuevasHoras = horas + 1
    let nuevosMinutos = minutos + 30
    
    if (nuevosMinutos >= 60) {
      nuevasHoras += 1
      nuevosMinutos -= 60
    }
    
    return `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`
  }

  const handleHoraInicioChange = (horaInicio) => {
    setNuevoHorario({
      ...nuevoHorario,
      horaInicio,
      horaFin: calcularHoraFin(horaInicio)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold">Crear Nuevo Grupo</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Información básica del grupo */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">📋 Información del Grupo</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Materia */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Materia: <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.materiaId}
                  onChange={(e) => handleChange('materiaId', e.target.value)}
                  className={`w-full border-2 rounded-lg px-3 py-2 bg-white ${
                    errors.materiaId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Seleccionar materia --</option>
                  {materias.filter(m => m.estado === 'activa').map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.codigo} - {materia.nombre}
                    </option>
                  ))}
                </select>
                {errors.materiaId && (
                  <p className="text-red-500 text-xs mt-1">{errors.materiaId}</p>
                )}
              </div>

              {/* Sección */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Sección: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.seccion}
                  onChange={(e) => handleChange('seccion', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                  placeholder="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.materiaId && materias.find(m => m.id === parseInt(formData.materiaId)) && (
                    <>Grupo: {materias.find(m => m.id === parseInt(formData.materiaId)).codigo}-{formData.seccion}</>
                  )}
                </p>
              </div>

              {/* Código Grupo */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Código del Grupo: <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.codigoGrupo}
                    onChange={(e) => handleChange('codigoGrupo', e.target.value.replace(/\D/g, '').substring(0, 4))}
                    className={`flex-1 border-2 rounded-lg px-3 py-2 ${
                      errors.codigoGrupo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234"
                    maxLength="4"
                  />
                  <button
                    type="button"
                    onClick={generarCodigoGrupo}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    🎲 Auto
                  </button>
                </div>
                {errors.codigoGrupo && (
                  <p className="text-red-500 text-xs mt-1">{errors.codigoGrupo}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">4 dígitos numéricos</p>
              </div>

              {/* Cupos */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cupos Totales: <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.cuposTotales}
                  onChange={(e) => handleChange('cuposTotales', parseInt(e.target.value) || 0)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                  min="1"
                  max="100"
                />
              </div>

              {/* Profesor */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Profesor: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.profesor}
                  onChange={(e) => handleChange('profesor', e.target.value.toUpperCase())}
                  className={`w-full border-2 rounded-lg px-3 py-2 ${
                    errors.profesor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="NOMBRE DEL PROFESOR"
                />
                {errors.profesor && (
                  <p className="text-red-500 text-xs mt-1">{errors.profesor}</p>
                )}
              </div>

              {/* Ciclo y Estado */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ciclo Académico:
                </label>
                <select
                  value={formData.ciclo}
                  onChange={(e) => handleChange('ciclo', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="2025-2">2025-2</option>
                  <option value="2025-1">2025-1</option>
                  <option value="2024-2">2024-2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Estado:
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="abierto">Abierto</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección de horarios */}
          <div className="mb-6 border-t-2 pt-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              🕒 Horarios de Clase
              {errors.horarios && (
                <span className="text-red-500 text-sm ml-2">* {errors.horarios}</span>
              )}
            </h3>

            {/* Agregar nuevo horario */}
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold mb-3 text-gray-700">Agregar horario:</p>
              
              <div className="grid grid-cols-5 gap-3">
                {/* Día */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Día</label>
                  <select
                    value={nuevoHorario.dia}
                    onChange={(e) => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                  >
                    {diasSemana.map(dia => (
                      <option key={dia} value={dia}>{dia.substring(0, 3)}</option>
                    ))}
                  </select>
                </div>

                {/* Hora Inicio */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Hora Inicio</label>
                  <select
                    value={nuevoHorario.horaInicio}
                    onChange={(e) => handleHoraInicioChange(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                  >
                    {horariosDisponibles.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>

                {/* Hora Fin (auto-calculada) */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Hora Fin</label>
                  <input
                    type="text"
                    value={nuevoHorario.horaFin}
                    readOnly
                    className="w-full border-2 border-gray-200 rounded-lg px-2 py-1 text-sm bg-gray-100"
                  />
                </div>

                {/* Salón */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Salón</label>
                  <input
                    type="text"
                    value={nuevoHorario.salon}
                    onChange={(e) => setNuevoHorario({ ...nuevoHorario, salon: e.target.value.toUpperCase() })}
                    className="w-full border-2 border-gray-300 rounded-lg px-2 py-1 text-sm"
                    placeholder="G-102"
                  />
                </div>

                {/* Botón agregar */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAgregarHorario}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    + Agregar
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                ℹ️ Las clases tienen una duración fija de 1 hora y 30 minutos (7:00 AM - 7:00 PM)
              </p>
            </div>

            {/* Lista de horarios agregados */}
            {horarios.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Horarios configurados:</p>
                {horarios.map((horario, index) => (
                  <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-bold text-blue-700">{horario.dia}</span>
                      <span className="mx-2">•</span>
                      <span>{horario.horaInicio} - {horario.horaFin}</span>
                      <span className="mx-2">•</span>
                      <span className="font-semibold">{horario.salon}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEliminarHorario(index)}
                      className="text-red-600 hover:text-red-800 font-bold text-lg"
                      title="Eliminar horario"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              CREAR GRUPO
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrearGrupoModalAvanzado