const GroupInfoModal = ({ isOpen, onClose, grupo, onModificar }) => {
  if (!isOpen || !grupo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-[#b50e11] to-[#8a0a0d] text-white p-6 rounded-t-xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold mb-2">Información del Grupo</h2>
          <p className="text-white text-opacity-90 text-sm">{grupo.materia}</p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Tarjeta de identificación */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 mb-6 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Número de Grupo</p>
                <p className="text-2xl font-bold text-[#b50e11]">{grupo.numeroGrupo}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Código del Grupo</p>
                <p className="text-2xl font-bold text-[#b50e11]">{grupo.codigoGrupo}</p>
              </div>
            </div>
          </div>

          {/* Información del profesor */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">👨‍🏫 Profesor</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">{grupo.profesor}</p>
              <a 
                href={`mailto:${grupo.correo}`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {grupo.correo}
              </a>
            </div>
          </div>

          {/* Información de ocupación */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">📊 Ocupación</h3>
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">Estudiantes inscritos</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {grupo.cuposOcupados} <span className="text-base text-gray-500">/ {grupo.cuposTotales}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Disponibles</p>
                  <p className="text-2xl font-bold text-green-600">
                    {grupo.cuposTotales - grupo.cuposOcupados}
                  </p>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full transition-all ${
                    grupo.porcentaje >= 90 ? 'bg-red-500' : 
                    grupo.porcentaje >= 70 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${grupo.porcentaje}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">{grupo.porcentaje}% ocupado</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  grupo.porcentaje < 100 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    grupo.porcentaje < 100 ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {grupo.porcentaje < 100 ? 'Disponible' : 'Lleno'}
                </span>
              </div>
            </div>
          </div>

          {/* Información de horario y ubicación */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">🕐 Horario y Ubicación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-600 font-semibold">Días</p>
                </div>
                <p className="text-sm font-bold text-gray-800">{grupo.dias}</p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-600 font-semibold">Hora</p>
                </div>
                <p className="text-sm font-bold text-gray-800">{grupo.hora}</p>
              </div>
              
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-xs text-gray-600 font-semibold">Aula</p>
                </div>
                <p className="text-sm font-bold text-gray-800">{grupo.aula}</p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cerrar
            </button>
            <button
              onClick={onModificar}
              className="flex-1 px-6 py-3 bg-[#b50e11] text-white rounded-lg hover:bg-[#8a0a0d] transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Modificar Grupo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupInfoModal