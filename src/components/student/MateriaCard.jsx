const MateriaCard = ({ materia, onClick }) => {
    // Colores según el estado de la materia
  const getBackgroundColor = () => {
    switch (materia.estado) {
      case 'aprobada':
        return '#9CECA6' // Verde
      case 'cursando':
        return '#6FB1E1' // Azul
      case 'perdida':
        return '#FF7878' // Rojo
      case 'pendiente':
        return '#FFFFFF' // Blanco
      default:
        return '#FFFFFF'
    }
  }

  const getBorderColor = () => {
    return materia.estado === 'pendiente' ? '#D1D5DB' : 'transparent'
  }

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[200px] rounded-t-3xl rounded-b-lg shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 border-2"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor()
      }}
    >
      <div className="p-4">
        {/* Header con créditos y tipo en la misma fila */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-white bg-opacity-90 rounded shadow-sm">
            Créditos: {materia.creditos}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 bg-white bg-opacity-90 rounded shadow-sm">
            {materia.tipo}
          </span>
        </div>

        {/* Código de la materia */}
        <h3 className="text-center font-bold text-xl mb-3 tracking-wide">
          {materia.codigo}
        </h3>

        {/* Nombre de la materia */}
        <p className="text-xs text-center leading-tight min-h-[36px] flex items-center justify-center px-1">
          {materia.nombre}
        </p>
      </div>
    </button>
  )
}

export default MateriaCard