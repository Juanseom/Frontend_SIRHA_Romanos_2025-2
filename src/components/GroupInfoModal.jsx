const GroupInfoModal = ({ isOpen, onClose, grupo, onModificar }) => {
  if (!isOpen || !grupo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-8 relative">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600"
        >
          X
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold mb-4 text-center">Información Detallada del Grupo</h2>
        <div className="w-full h-1 bg-black mb-6"></div>

        {/* Contenido en caja gris */}
        <div className="bg-gray-200 p-6 rounded mb-6 space-y-2">
          <p><strong>Materia:</strong> {grupo.materia}</p>
          <p><strong>Grupo:</strong> {grupo.numeroGrupo}</p>
          <p><strong>Código del grupo:</strong> {grupo.codigoGrupo}</p>
          
          <p><strong>Profesor:</strong> {grupo.profesor}</p>
          <p><strong>Correo:</strong> {grupo.correo}</p>
          
          <p><strong>Cupos actuales:</strong> {grupo.cuposOcupados} / {grupo.cuposTotales} estudiantes</p>
          <p><strong>Porcentaje de ocupación:</strong> {grupo.porcentaje}% lleno</p>
          <p>
            <strong>Estado:</strong> 
            <span className={`ml-2 ${grupo.porcentaje < 100 ? 'text-green-600' : 'text-red-600'}`}>
              ● {grupo.porcentaje < 100 ? 'Disponible' : 'Lleno'}
            </span>
          </p>
          
          <p><strong>Días:</strong> {grupo.dias}</p>
          <p><strong>Hora:</strong> {grupo.hora}</p>
          <p><strong>Aula:</strong> {grupo.aula}</p>
        </div>

        {/* Botones */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-400 rounded hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onModificar}
            className="px-8 py-2 border border-gray-400 rounded hover:bg-gray-100 transition-colors"
          >
            Modificar Grupo
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupInfoModal