import { useState } from 'react'
import Layout from '../../components/common/Layout'
import AddPeriodoModal from '../../components/dean/AddPeriodoModal'

const Periodos = () => {
  const [periodos, setPeriodos] = useState([
    {
      id: 1,
      inicio: 'Miércoles 15/10 - 8:00 a.m.',
      fin: 'Miércoles 15/10 - 9:00 a.m.'
    },
    {
      id: 2,
      inicio: 'Miércoles 13/08 - 10:00 a.m.',
      fin: 'Miércoles 13/08 - 11:00 a.m.'
    },
    {
      id: 3,
      inicio: 'Miércoles 05/11 - 8:00 a.m.',
      fin: 'Miércoles 05/11 - 9:00 a.m.'
    },
    {
      id: 4,
      inicio: 'Jueves 06/11 - 8:00 a.m.',
      fin: 'Jueves 06/11 - 9:00 a.m.'
    },
    {
      id: 5,
      inicio: 'Jueves 11/12 - 11:00 a.m.',
      fin: 'Jueves 11/12 - 12:00 p.m.'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNuevoPeriodo = () => {
    setIsModalOpen(true)
  }

  const handleAddPeriodo = (nuevoPeriodo) => {
    setPeriodos([nuevoPeriodo, ...periodos]) // Agrega al inicio
  }

  const handlePeriodoClick = (periodo) => {
    console.log('Periodo seleccionado:', periodo)
    // Aquí podrías abrir un modal de edición
  }

  return (
    <Layout homeRoute="/dean-home">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Periodos Habilitados</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Botón Nuevo Periodo */}
        <button
          onClick={handleNuevoPeriodo}
          className="mb-6 px-6 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors text-sm"
        >
          + Nuevo Periodo
        </button>

        {/* Lista de periodos */}
        <div className="space-y-4 max-w-[600px]">
          {periodos.map((periodo) => (
            <button
              key={periodo.id}
              onClick={() => handlePeriodoClick(periodo)}
              className="w-full bg-gray-200 border border-gray-400 rounded-lg p-4 hover:bg-gray-300 transition-colors text-left"
            >
              <p className="text-sm">
                {periodo.inicio} → {periodo.fin}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddPeriodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPeriodo}
      />
    </Layout>
  )
}

export default Periodos