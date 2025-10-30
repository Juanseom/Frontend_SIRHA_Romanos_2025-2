import { useState } from 'react'

const CrearMateriaModal = ({ isOpen, onClose, onCrear }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    creditos: 3,
    programa: 'Ingeniería de Sistemas',
    departamento: 'Sistemas',
    descripcion: '',
    estado: 'activa'
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const programas = [
    'Ingeniería de Sistemas',
    'Ingeniería Civil',
    'Ingeniería Industrial',
    'Ingeniería Electrónica',
    'Ingeniería Mecánica',
    'Ingeniería Biomédica',
    'Todas las ingenierías'
  ]

  const departamentos = [
    'Sistemas',
    'Matemáticas',
    'Física',
    'Humanidades',
    'Civil',
    'Industrial',
    'Electrónica',
    'Mecánica',
    'Proyectos'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    
    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es requerido'
    } else if (formData.codigo.length !== 4) {
      newErrors.codigo = 'El código debe tener exactamente 4 caracteres'
    } else if (!/^[A-Z]{4}$/.test(formData.codigo)) {
      newErrors.codigo = 'El código debe contener solo letras mayúsculas'
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    } else if (formData.nombre.length < 5) {
      newErrors.nombre = 'El nombre debe tener al menos 5 caracteres'
    }
    
    if (formData.creditos < 1 || formData.creditos > 8) {
      newErrors.creditos = 'Los créditos deben estar entre 1 y 8'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onCrear(formData)
    
    setFormData({
      codigo: '',
      nombre: '',
      creditos: 3,
      programa: 'Ingeniería de Sistemas',
      departamento: 'Sistemas',
      descripcion: '',
      estado: 'activa'
    })
    setErrors({})
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleCodigoChange = (value) => {
    const codigo = value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4)
    handleChange('codigo', codigo)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold">Crear Nueva Materia</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Código de la Materia: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => handleCodigoChange(e.target.value)}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.codigo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="DOSW"
                maxLength="4"
              />
              {errors.codigo && (
                <p className="text-red-500 text-xs mt-1">{errors.codigo}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                4 letras mayúsculas (ej: DOSW, CALV, PSOC)
              </p>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nombre Completo: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className={`w-full border-2 rounded-lg px-3 py-2 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Desarrollo y Operaciones de Software"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Créditos y Estado */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Créditos: <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.creditos}
                  onChange={(e) => handleChange('creditos', parseInt(e.target.value) || 0)}
                  className={`w-full border-2 rounded-lg px-3 py-2 ${
                    errors.creditos ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="1"
                  max="8"
                />
                {errors.creditos && (
                  <p className="text-red-500 text-xs mt-1">{errors.creditos}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Estado: <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="activa">Activa</option>
                  <option value="inactiva">Inactiva</option>
                </select>
              </div>
            </div>

            {/* Programa */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Programa Académico: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.programa}
                onChange={(e) => handleChange('programa', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                {programas.map((programa) => (
                  <option key={programa} value={programa}>
                    {programa}
                  </option>
                ))}
              </select>
            </div>

            {/* Departamento */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Departamento: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.departamento}
                onChange={(e) => handleChange('departamento', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                {departamentos.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Descripción (opcional):
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 resize-none"
                rows="3"
                placeholder="Breve descripción del curso..."
              />
            </div>
          </div>

          {/* Info adicional */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Nota:</strong> Después de crear la materia, podrás crear grupos específicos 
              (ej: {formData.codigo || 'DOSW'}-1, {formData.codigo || 'DOSW'}-2) con sus respectivos horarios y profesores.
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
              CREAR MATERIA
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrearMateriaModal