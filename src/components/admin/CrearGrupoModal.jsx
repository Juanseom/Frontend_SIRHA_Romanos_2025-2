import { useState } from 'react'

const CrearGrupoModal = ({ isOpen, onClose, onCrear }) => {
  const [formData, setFormData] = useState({
    clase: '',
    seccion: '',
    diasHoras: '',
    aula: '',
    instructor: '',
    ciclo: '2025-2',
    estado: 'abierto',
    cuposTotales: 30
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones
    const newErrors = {}
    if (!formData.clase.trim()) newErrors.clase = 'La clase es requerida'
    if (!formData.seccion.trim()) newErrors.seccion = 'La sección es requerida'
    if (!formData.diasHoras.trim()) newErrors.diasHoras = 'Los días y horas son requeridos'
    if (!formData.aula.trim()) newErrors.aula = 'El aula es requerida'
    if (!formData.instructor.trim()) newErrors.instructor = 'El instructor es requerido'
    if (formData.cuposTotales < 1) newErrors.cuposTotales = 'Los cupos deben ser al menos 1'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onCrear(formData)
    
    // Reset form
    setFormData({
      clase: '',
      seccion: '',
      diasHoras: '',
      aula: '',
      instructor: '',
      ciclo: '2025-2',
      estado: 'abierto',
      cuposTotales: 30
    })
    setErrors({})
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-2 gap-6">
            {/* Clase/Materia */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Clase/Materia: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.clase}
                onChange={(e) => handleChange('clase', e.target.value.toUpperCase())}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.clase ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: DOSW, PSOC, 1624"
              />
              {errors.clase && (
                <p className="text-red-500 text-xs mt-1">{errors.clase}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Código o sigla de la materia
              </p>
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
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.seccion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 1-LEC ORDINARIA"
              />
              {errors.seccion && (
                <p className="text-red-500 text-xs mt-1">{errors.seccion}</p>
              )}
            </div>

            {/* Días y Horas */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Días y Horas: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.diasHoras}
                onChange={(e) => handleChange('diasHoras', e.target.value.toUpperCase())}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.diasHoras ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: LUN-MIE-VIER 14:00-16:00"
              />
              {errors.diasHoras && (
                <p className="text-red-500 text-xs mt-1">{errors.diasHoras}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Formato: DÍAS HORA_INICIO-HORA_FIN
              </p>
            </div>

            {/* Aula */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Aula: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.aula}
                onChange={(e) => handleChange('aula', e.target.value.toUpperCase())}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.aula ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: D-309, A-205"
              />
              {errors.aula && (
                <p className="text-red-500 text-xs mt-1">{errors.aula}</p>
              )}
            </div>

            {/* Cupos Totales */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cupos Totales: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.cuposTotales}
                onChange={(e) => handleChange('cuposTotales', parseInt(e.target.value) || 0)}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.cuposTotales ? 'border-red-500' : 'border-gray-300'
                }`}
                min="1"
                max="100"
              />
              {errors.cuposTotales && (
                <p className="text-red-500 text-xs mt-1">{errors.cuposTotales}</p>
              )}
            </div>

            {/* Instructor */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Instructor: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => handleChange('instructor', e.target.value.toUpperCase())}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.instructor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: ANDRÉS MARTÍN QUINTERO"
              />
              {errors.instructor && (
                <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>
              )}
            </div>

            {/* Ciclo Académico */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ciclo Académico: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.ciclo}
                onChange={(e) => handleChange('ciclo', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="2025-2">2025-2 Segundo periodo</option>
                <option value="2025-1">2025-1 Primer periodo</option>
                <option value="2024-2">2024-2 Segundo periodo</option>
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Estado: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.estado}
                onChange={(e) => handleChange('estado', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="abierto">Abierto</option>
                <option value="cerrado">Cerrado</option>
                <option value="completo">Completo</option>
              </select>
            </div>
          </div>

          {/* Info adicional */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Nota:</strong> El grupo se creará con 0 estudiantes inscritos inicialmente. 
              Los estudiantes podrán inscribirse una vez el grupo esté en estado "Abierto".
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
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

export default CrearGrupoModal