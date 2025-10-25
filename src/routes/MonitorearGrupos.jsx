import { useState } from 'react'
import Layout from '../components/Layout'
import ProgressBar from '../components/ProgressBar'
import GroupInfoModal from '../components/GroupInfoModal'
import ManageGroupModal from '../components/ManageGroupModal'

const MonitorearGrupos = () => {
  const [activeTab, setActiveTab] = useState('disponibles') // 'disponibles' o 'llenos'
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)

  // Datos de ejemplo (vendrán del backend)
  const [grupos, setGrupos] = useState([
    {
      id: 1,
      codigo: 'DOSW - 2',
      cuposOcupados: 30,
      cuposTotales: 50,
      porcentaje: 60,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 2,
      codigoGrupo: 2253,
      profesor: 'Martín Andrés Cantor Urrego',
      correo: 'andres.cantor-u@escuelaing.edu.co',
      dias: 'Lunes y miércoles',
      hora: '8:30 - 10:00 AM',
      aula: 'B-204'
    },
    {
      id: 2,
      codigo: 'PRYE - 2',
      cuposOcupados: 20,
      cuposTotales: 50,
      porcentaje: 40,
      materia: 'PRYE - Proyectos de Ingeniería',
      numeroGrupo: 2,
      codigoGrupo: 3301,
      profesor: 'Laura Gómez Martínez',
      correo: 'laura.gomez@escuelaing.edu.co',
      dias: 'Martes y jueves',
      hora: '10:00 - 11:30 AM',
      aula: 'A-105'
    },
    {
      id: 3,
      codigo: 'DOSW - 3',
      cuposOcupados: 40,
      cuposTotales: 50,
      porcentaje: 80,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 3,
      codigoGrupo: 2254,
      profesor: 'Carlos Pérez Rodríguez',
      correo: 'carlos.perez@escuelaing.edu.co',
      dias: 'Lunes y miércoles',
      hora: '14:00 - 15:30 PM',
      aula: 'C-301'
    },
    {
      id: 4,
      codigo: 'ODSC - 2',
      cuposOcupados: 10,
      cuposTotales: 50,
      porcentaje: 20,
      materia: 'ODSC - Optimización de Sistemas',
      numeroGrupo: 2,
      codigoGrupo: 4102,
      profesor: 'Ana María Torres',
      correo: 'ana.torres@escuelaing.edu.co',
      dias: 'Viernes',
      hora: '8:00 - 11:00 AM',
      aula: 'B-107'
    },
    {
      id: 5,
      codigo: 'AYSR - 1',
      cuposOcupados: 0,
      cuposTotales: 50,
      porcentaje: 0,
      materia: 'AYSR - Análisis y Síntesis de Requisitos',
      numeroGrupo: 1,
      codigoGrupo: 1850,
      profesor: 'Roberto Sánchez Vargas',
      correo: 'roberto.sanchez@escuelaing.edu.co',
      dias: 'Martes y jueves',
      hora: '16:00 - 17:30 PM',
      aula: 'A-203'
    },
    {
      id: 6,
      codigo: 'DOSW - 12',
      cuposOcupados: 30,
      cuposTotales: 30,
      porcentaje: 100,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 12,
      codigoGrupo: 2265,
      profesor: 'Sofía Ramírez López',
      correo: 'sofia.ramirez@escuelaing.edu.co',
      dias: 'Lunes y miércoles',
      hora: '7:00 - 8:30 AM',
      aula: 'D-401'
    },
    {
      id: 7,
      codigo: 'PRYE - 6',
      cuposOcupados: 20,
      cuposTotales: 20,
      porcentaje: 100,
      materia: 'PRYE - Proyectos de Ingeniería',
      numeroGrupo: 6,
      codigoGrupo: 3306,
      profesor: 'Diego Morales Castro',
      correo: 'diego.morales@escuelaing.edu.co',
      dias: 'Viernes',
      hora: '14:00 - 17:00 PM',
      aula: 'B-305'
    },
    {
      id: 8,
      codigo: 'DOSW - 6',
      cuposOcupados: 40,
      cuposTotales: 40,
      porcentaje: 100,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 6,
      codigoGrupo: 2258,
      profesor: 'Patricia Gutiérrez Díaz',
      correo: 'patricia.gutierrez@escuelaing.edu.co',
      dias: 'Martes y jueves',
      hora: '18:00 - 19:30 PM',
      aula: 'C-201'
    },
    {
      id: 9,
      codigo: 'ODSC - 7',
      cuposOcupados: 10,
      cuposTotales: 10,
      porcentaje: 100,
      materia: 'ODSC - Optimización de Sistemas',
      numeroGrupo: 7,
      codigoGrupo: 4107,
      profesor: 'Fernando Acosta Ruiz',
      correo: 'fernando.acosta@escuelaing.edu.co',
      dias: 'Lunes',
      hora: '10:00 - 13:00 PM',
      aula: 'A-401'
    }
  ])

  const gruposDisponibles = grupos.filter(g => g.porcentaje < 100)
  const gruposLlenos = grupos.filter(g => g.porcentaje === 100)

  const gruposAMostrar = activeTab === 'disponibles' ? gruposDisponibles : gruposLlenos

  const handleGrupoClick = (grupo) => {
    setSelectedGrupo(grupo)
    setIsInfoModalOpen(true)
  }

  const handleModificar = () => {
    setIsInfoModalOpen(false)
    setIsManageModalOpen(true)
  }

  const handleSaveGroup = (updatedGrupo) => {
    setGrupos(grupos.map(g => g.id === updatedGrupo.id ? {
      ...updatedGrupo,
      porcentaje: Math.round((updatedGrupo.cuposOcupados / updatedGrupo.cuposTotales) * 100)
    } : g))
  }

  const handleDeleteGroup = (grupoId) => {
    setGrupos(grupos.filter(g => g.id !== grupoId))
  }

  return (
    <Layout homeRoute="/dean-home">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Monitoreo de Capacidad de Grupos</h1>
        
        {/* Pestañas */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('disponibles')}
            className={`px-6 py-2 rounded-t-lg border border-b-0 transition-colors ${
              activeTab === 'disponibles'
                ? 'bg-white border-gray-400 font-semibold'
                : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
            }`}
          >
            Grupos disponibles
          </button>
          <button
            onClick={() => setActiveTab('llenos')}
            className={`px-6 py-2 rounded-t-lg border border-b-0 transition-colors ${
              activeTab === 'llenos'
                ? 'bg-white border-gray-400 font-semibold'
                : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
            }`}
          >
            Grupos llenos
          </button>
        </div>

        <div className="w-full max-w-[1200px] h-1 bg-black mb-8"></div>

        {/* Lista de grupos */}
        <div className="space-y-4 max-w-[800px]">
          {gruposAMostrar.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay grupos {activeTab === 'disponibles' ? 'disponibles' : 'llenos'} en este momento
            </p>
          ) : (
            gruposAMostrar.map((grupo) => (
              <button
                key={grupo.id}
                onClick={() => handleGrupoClick(grupo)}
                className="w-full bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-32 font-semibold">{grupo.codigo}</div>
                  <div className="w-40 text-sm text-gray-700">
                    {grupo.cuposOcupados}/{grupo.cuposTotales} estudiantes
                  </div>
                  <ProgressBar 
                    current={grupo.cuposOcupados}
                    total={grupo.cuposTotales}
                    percentage={grupo.porcentaje}
                  />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Modales */}
      <GroupInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        grupo={selectedGrupo}
        onModificar={handleModificar}
      />

      <ManageGroupModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        grupo={selectedGrupo}
        onSave={handleSaveGroup}
        onDelete={handleDeleteGroup}
      />
    </Layout>
  )
}

export default MonitorearGrupos