const MateriaCard = ({ materia, onClick }) => {
  // Definir colores según estado
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
      className="w-[180px] rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: '2px'
      }}
    >
      <div className="p-3">
        {/* Header con créditos y tipo */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-white bg-opacity-80 rounded">
            Créditos: {materia.creditos}
          </span>
          <span className="text-xs font-bold px-2 py-1 bg-white bg-opacity-80 rounded">
            {materia.tipo}
          </span>
        </div>

        {/* Código de la materia */}
        <h3 className="text-center font-bold text-lg mb-2">
          {materia.codigo}
        </h3>

        {/* Nombre de la materia */}
        <p className="text-xs text-center leading-tight min-h-[40px] flex items-center justify-center">
          {materia.nombre}
        </p>
      </div>
    </button>
  )
}

export default MateriaCard