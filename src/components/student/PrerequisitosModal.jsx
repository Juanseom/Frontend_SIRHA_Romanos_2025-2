const PrerequisitosModal = ({ isOpen, onClose, materia }) => {
  if (!isOpen || !materia) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Información de Materia</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Información de la materia */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-gray-800">{materia.codigo}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                materia.estado === 'aprobada' ? 'bg-[#9CECA6] text-gray-800' :
                materia.estado === 'cursando' ? 'bg-[#6FB1E1] text-white' :
                materia.estado === 'perdida' ? 'bg-[#FF7878] text-white' :
                'bg-gray-200 text-gray-700'
              }`}>
                {materia.estado === 'aprobada' ? 'Aprobada' :
                 materia.estado === 'cursando' ? 'Cursando' :
                 materia.estado === 'perdida' ? 'Perdida' :
                 'Pendiente'}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{materia.nombre}</p>
            
            <div className="flex gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Créditos:</span> {materia.creditos}
              </div>
              <div>
                <span className="font-semibold">Tipo:</span> {materia.tipo === 'H' ? 'Homologable' : 'No Homologable'}
              </div>
              {/* Mostrar nota solo si está aprobada */}
              {materia.estado === 'aprobada' && materia.nota && (
                <div>
                  <span className="font-semibold">Nota:</span> <span className="font-bold text-gray-800">{materia.nota.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Prerequisitos */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-lg font-bold mb-3 text-gray-800">Prerequisitos:</h4>
            
            {materia.prerequisitos && materia.prerequisitos.length > 0 ? (
              <div className="space-y-2">
                {materia.prerequisitos.map((prereq, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg px-4 py-3 flex items-center"
                  >
                    <div className="bg-[#9CECA6] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800">{prereq}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic bg-gray-50 rounded-lg px-4 py-3 text-center">
                No requiere prerequisitos
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrerequisitosModal