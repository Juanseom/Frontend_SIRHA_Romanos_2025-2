const SolicitudDetalleModal = ({ isOpen, onClose, solicitud }) => {
  if (!isOpen || !solicitud) return null

  const estadoColors = {
    aprobada: 'bg-[#9CECA6]',
    'en proceso': 'bg-[#6FB1E1]',
    rechazada: 'bg-[#FF7878]',
    pendiente: 'bg-[#CACACA]'
  }

  const estadoLabels = {
    aprobada: 'Approved',
    'en proceso': 'In Process',
    rechazada: 'Rejected',
    pendiente: 'Pending'
  }

  const colorClass = estadoColors[solicitud.estado.toLowerCase()] || 'bg-gray-200'
  const estadoLabel = estadoLabels[solicitud.estado.toLowerCase()] || solicitud.estado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg relative">
        {/* Header con color del estado */}
        <div className={`${colorClass} px-6 py-4 rounded-t-lg`}>
          <h2 className="text-lg font-bold text-center">Ver Solicitud</h2>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Grid de información */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            {/* Columna 1 */}
            <div>
              <p className="font-semibold mb-1">Tipo:</p>
              <p>{solicitud.tipo}</p>
              
              <p className="font-semibold mt-3 mb-1">Número Solicitud:</p>
              <p>{solicitud.numeroSolicitud}</p>
              
              <p className="font-semibold mt-3 mb-1">Estado:</p>
              <p className="capitalize">{solicitud.estado}</p>
            </div>

            {/* Columna 2 - A Retirar */}
            <div>
              <p className="font-semibold mb-1">A Retirar:</p>
              {solicitud.aRetirar ? (
                <>
                  <p className="text-xs"><span className="font-medium">Nombre Materia:</span> {solicitud.aRetirar.nombreMateria}</p>
                  <p className="text-xs"><span className="font-medium">Grupo/Clase:</span> {solicitud.aRetirar.grupoClase}</p>
                </>
              ) : (
                <p className="text-xs text-gray-500">-</p>
              )}
            </div>

            {/* Columna 3 - A Inscribir */}
            <div>
              <p className="font-semibold mb-1">A Inscribir:</p>
              {solicitud.aInscribir ? (
                <>
                  <p className="text-xs"><span className="font-medium">Nombre Materia:</span> {solicitud.aInscribir.nombreMateria}</p>
                  <p className="text-xs"><span className="font-medium">Grupo/Clase:</span> {solicitud.aInscribir.grupoClase}</p>
                </>
              ) : (
                <p className="text-xs text-gray-500">-</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <p className="font-semibold text-sm mb-2">Descripción:</p>
            <textarea
              readOnly
              value={solicitud.descripcion || 'No se qué escribir, pero aquí irá la excusa de por qué la quiere cambiar o eso.'}
              className="w-full border border-gray-300 rounded p-2 text-sm resize-none bg-gray-50"
              rows="3"
            />
          </div>

          {/* Respuesta */}
          <div>
            <p className="font-semibold text-sm mb-2">Respuesta:</p>
            <textarea
              readOnly
              value={solicitud.respuesta || ''}
              placeholder={solicitud.estado === 'pendiente' || solicitud.estado === 'en proceso' ? '' : 'No se qué escribir, pero aquí está la razón de por qué se la rechazaron.'}
              className="w-full border border-gray-300 rounded p-2 text-sm resize-none bg-gray-50"
              rows="3"
            />
          </div>

          {/* Botón cerrar */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitudDetalleModal