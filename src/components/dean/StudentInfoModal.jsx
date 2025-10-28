const StudentInfoModal = ({ isOpen, onClose, solicitud }) => {
  if (!isOpen || !solicitud) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-8 relative">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600"
        >
          X
        </button>

        {/* Header del modal */}
        <div className="flex items-start gap-6 mb-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-[#5c3a42] flex items-center justify-center">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>

          {/* Info del estudiante */}
          <div className="flex-1">
            <p className="text-sm mb-1"><strong>Código:</strong> {solicitud.codigo}</p>
            <p className="text-sm mb-1"><strong>Nombre:</strong> {solicitud.nombre}</p>
            <p className="text-sm mb-1"><strong>Carrera:</strong> {solicitud.carrera}</p>
            <p className="text-sm mb-1"><strong>Semestre:</strong> {solicitud.semestre}</p>
          </div>

          {/* Botones laterales */}
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Horario Actual
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Semáforo
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Información adicional
            </button>
          </div>
        </div>

        <div className="w-full h-0.5 bg-black mb-6"></div>

        {/* Detalles de la solicitud */}
        <div className="flex gap-8 mb-6">
          <div className="flex-1">
            <p className="mb-2"><strong>Tipo:</strong> {solicitud.tipo}</p>
            <p className="mb-2"><strong>Grupo Actual:</strong> {solicitud.grupoActual}</p>
            <p className="mb-2"><strong>Grupo Destino:</strong> {solicitud.grupoDestino}</p>
          </div>

          <div className="flex-1">
            <p className="font-bold mb-2">Observación:</p>
            <textarea 
              className="w-full h-24 border border-gray-300 rounded p-2 resize-none"
              placeholder="Escribe observaciones aquí..."
              defaultValue={solicitud.observacion}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Solicitar información
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Rechazar
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoModal