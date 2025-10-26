const SolicitudCard = ({ solicitud, onClick }) => {
  const estadoColors = {
    aprobada: 'bg-[#9CECA6]',
    'en proceso': 'bg-[#6FB1E1]',
    rechazada: 'bg-[#FF7878]',
    pendiente: 'bg-[#CACACA]'
  }

  const colorClass = estadoColors[solicitud.estado.toLowerCase()] || 'bg-gray-200'

  return (
    <button
      onClick={() => onClick(solicitud)}
      className={`w-full ${colorClass} rounded-lg p-4 hover:opacity-90 transition-opacity shadow-sm text-left`}
    >
      <div className="grid grid-cols-5 gap-4 items-center text-sm">
        {/* Columna 1: Tipo y N° Solicitud */}
        <div>
          <p className="font-semibold">Tipo solicitud: <span className="font-normal">{solicitud.tipo}</span></p>
          <p className="text-xs mt-1">N° Solicitud: {solicitud.numeroSolicitud}</p>
        </div>

        {/* Columna 2: N° Catálogo y Código */}
        <div>
          <p className="font-semibold">N° Catálogo: <span className="font-normal">{solicitud.numeroCatalogo}</span></p>
          <p className="text-xs mt-1">Grupo clase: {solicitud.codigoGrupo}</p>
        </div>

        {/* Columna 3: Fecha/Hora */}
        <div>
          <p className="font-semibold">Fecha / Hora</p>
          <p className="text-xs mt-1">Realizada: {solicitud.fechaRealizada}</p>
        </div>

        {/* Columna 4: Vacío o info adicional */}
        <div></div>

        {/* Columna 5: Estado */}
        <div className="text-right">
          <p className="font-semibold">Estado solicitud: <span className="font-normal capitalize">{solicitud.estado}</span></p>
        </div>
      </div>
    </button>
  )
}

export default SolicitudCard