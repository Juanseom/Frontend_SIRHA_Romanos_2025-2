import { useState } from 'react'

const CrearGrupoModal = ({ isOpen, onClose, onCrear }) => {
  const [formData, setFormData] = useState({
    estado: 'ABIERTA',
    clase: '',
    grado: 'Pregrado',
    sesion: 'Ordinaria',
    unidades: '',
    ubicacion: 'Sede Principal',
    campus: 'Bogotá',
    presencial: true,
    capacidadClase: '',
    capacidadListaEspera: '',
    aula: '',
    diasHoras: '',
    seccion: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onCrear(formData)
    // Reset form
    setFormData({
      estado: 'ABIERTA',
      clase: '',
      grado: 'Pregrado',
      sesion: 'Ordinaria',
      unidades: '',
      ubicacion: 'Sede Principal',
      campus: 'Bogotá',
      presencial: true,
      capacidadClase: '',
      capacidadListaEspera: '',
      aula: '',
      diasHoras: '',
      seccion: ''
    })
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
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
            {/* Estado */}
            <div>
              <label className="block text-sm font-semibold mb-2">Estado:</label>
              <select
                value={formData.estado}
                onChange={(e) => handleChange('estado', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="ABIERTA">ABIERTA</option>
                <option value="CERRADA">CERRADA</option>
              </select>
            </div>

            {/* N° Clase */}
            <div>
              <label className="block text-sm font-semibold mb-2">N° Clase:</label>
              <input
                type="text"
                value={formData.clase}
                onChange={(e) => handleChange('clase', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                placeholder="Ej: 1624"
                required
              />
            </div>

            {/* Sección */}
            <div>
              <label className="block text-sm font-semibold mb-2">Sección:</label>
              <input
                type="text"
                value={formData.seccion}
                onChange={(e) => handleChange('seccion', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                placeholder="Ej: 1-LEC ORDINARIA"
                required
              />
            </div>

            {/* Grado */}
            <div>
              <label className="block text-sm font-semibold mb-2">Grado:</label>
              <select
                value={formData.grado}
                onChange={(e) => handleChange('grado', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Pregrado">Pregrado</option>
                <option value="Posgrado">Posgrado</option>
              </select>
            </div>

            {/* Sesión */}
            <div>
              <label className="block text-sm font-semibold mb-2">Sesión:</label>
              <input
                type="text"
                value={formData.sesion}
                onChange={(e) => handleChange('sesion', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Unidades */}
            <div>
              <label className="block text-sm font-semibold mb-2">Unidades:</label>
              <input
                type="number"
                value={formData.unidades}
                onChange={(e) => handleChange('unidades', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                min="1"
                required
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-semibold mb-2">Ubicación:</label>
              <input
                type="text"
                value={formData.ubicacion}
                onChange={(e) => handleChange('ubicacion', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Campus */}
            <div>
              <label className="block text-sm font-semibold mb-2">Campus:</label>
              <select
                value={formData.campus}
                onChange={(e) => handleChange('campus', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Bogotá">Bogotá</option>
                <option value="Medellín">Medellín</option>
                <option value="Cali">Cali</option>
              </select>
            </div>

            {/* Modalidad */}
            <div>
              <label className="block text-sm font-semibold mb-2">Modalidad:</label>
              <div className="flex gap-4 items-center pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.presencial}
                    onChange={() => handleChange('presencial', true)}
                  />
                  <span>Presencial</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!formData.presencial}
                    onChange={() => handleChange('presencial', false)}
                  />
                  <span>Virtual</span>
                </label>
              </div>
            </div>

            {/* Capacidad Clase */}
            <div>
              <label className="block text-sm font-semibold mb-2">Capacidad Clase:</label>
              <input
                type="number"
                value={formData.capacidadClase}
                onChange={(e) => handleChange('capacidadClase', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                min="1"
                required
              />
            </div>

            {/* Capacidad Lista de Espera */}
            <div>
              <label className="block text-sm font-semibold mb-2">Capacidad Lista Espera:</label>
              <input
                type="number"
                value={formData.capacidadListaEspera}
                onChange={(e) => handleChange('capacidadListaEspera', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                min="0"
              />
            </div>

            {/* Aula */}
            <div>
              <label className="block text-sm font-semibold mb-2">Aula:</label>
              <input
                type="text"
                value={formData.aula}
                onChange={(e) => handleChange('aula', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                placeholder="Ej: D-309"
                required
              />
            </div>

            {/* Días y Horas */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">Días y Horas:</label>
              <input
                type="text"
                value={formData.diasHoras}
                onChange={(e) => handleChange('diasHoras', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2"
                placeholder="Ej: LUN-MIE-VIER 14:00-16:00"
                required
              />
            </div>
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