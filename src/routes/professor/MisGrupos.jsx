import { useState } from 'react'
import Layout from '../../components/common/Layout'
import ProgressBar from '../../components/common/ProgressBar'
import GroupInfoModal from '../../components/dean/GroupInfoModal'
import ManageGroupModal from '../../components/dean/ManageGroupModal'

const MisGrupos = () => {
  const [filterMateria, setFilterMateria] = useState('todas')
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)

  // Datos de ejemplo de los grupos que enseña el profesor (vendrán del backend)
  const [grupos, setGrupos] = useState([
    {
      id: 1,
      codigo: 'DOSW - 2',
      cuposOcupados: 35,
      cuposTotales: 50,
      porcentaje: 70,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 2,
      codigoGrupo: 2253,
      profesor: 'Prof. Roberto Martínez',
      correo: 'profesor@escuelaing.edu.co',
      dias: 'Lunes y miércoles',
      hora: '8:30 - 10:00 AM',
      aula: 'B-204',
      periodo: '2025-2'
    },
    {
      id: 2,
      codigo: 'DOSW - 4',
      cuposOcupados: 32,
      cuposTotales: 50,
      porcentaje: 64,
      materia: 'DOSW - Desarrollo y Operaciones de Software',
      numeroGrupo: 4,
      codigoGrupo: 2255,
      profesor: 'Prof. Roberto Martínez',
      correo: 'profesor@escuelaing.edu.co',
      dias: 'Martes y jueves',
      hora: '14:30 - 16:00 PM',
      aula: 'B-205',
      periodo: '2025-2'
    },
    {
      id: 3,
      codigo: 'BADA - 3',
      cuposOcupados: 30,
      cuposTotales: 50,
      porcentaje: 60,
      materia: 'BADA - Bases de Datos',
      numeroGrupo: 3,
      codigoGrupo: 1803,
      profesor: 'Prof. Roberto Martínez',
      correo: 'profesor@escuelaing.edu.co',
      dias: 'Lunes, miércoles y viernes',
      hora: '10:00 - 11:30 AM',
      aula: 'C-301',
      periodo: '2025-2'
    },
    {
      id: 4,
      codigo: 'BADA - 5',
      cuposOcupados: 28,
      cuposTotales: 50,
      porcentaje: 56,
      materia: 'BADA - Bases de Datos',
      numeroGrupo: 5,
      codigoGrupo: 1805,
      profesor: 'Prof. Roberto Martínez',
      correo: 'profesor@escuelaing.edu.co',
      dias: 'Martes, jueves y sábado',
      hora: '10:00 - 11:30 AM',
      aula: 'C-302',
      periodo: '2025-2'
    },
    {
      id: 5,
      codigo: 'ALGO - 1',
      cuposOcupados: 40,
      cuposTotales: 50,
      porcentaje: 80,
      materia: 'ALGO - Algoritmos y Estructuras de Datos',
      numeroGrupo: 1,
      codigoGrupo: 1101,
      profesor: 'Prof. Roberto Martínez',
      correo: 'profesor@escuelaing.edu.co',
      dias: 'Lunes y viernes',
      hora: '16:00 - 17:30 PM',
      aula: 'A-105',
      periodo: '2025-2'
    }
  ])

  // Obtener lista única de materias para el filtro
  const materiasUnicas = ['todas', ...new Set(grupos.map(g => g.materia.split(' - ')[0]))]

  // Filtrar grupos según la materia seleccionada
  const gruposFiltrados = filterMateria === 'todas' 
    ? grupos 
    : grupos.filter(g => g.materia.startsWith(filterMateria))

  // Calcular estadísticas
  const totalGrupos = grupos.length
  const totalEstudiantes = grupos.reduce((sum, g) => sum + g.cuposOcupados, 0)
  const promedioOcupacion = Math.round(grupos.reduce((sum, g) => sum + g.porcentaje, 0) / grupos.length)

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
    <Layout homeRoute="/profesor-home" role="profesor">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Mis Grupos</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-6"></div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6 max-w-[1200px]">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total de Grupos</p>
            <p className="text-3xl font-bold text-blue-700">{totalGrupos}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Estudiantes</p>
            <p className="text-3xl font-bold text-green-700">{totalEstudiantes}</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-sm text-gray-600">Ocupación Promedio</p>
            <p className="text-3xl font-bold text-purple-700">{promedioOcupacion}%</p>
          </div>
        </div>

        {/* Filtro por materia */}
        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm font-semibold">Filtrar por materia:</label>
          <select 
            value={filterMateria}
            onChange={(e) => setFilterMateria(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-sm"
          >
            {materiasUnicas.map(materia => (
              <option key={materia} value={materia}>
                {materia === 'todas' ? 'Todas las materias' : materia}
              </option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {gruposFiltrados.length} grupo{gruposFiltrados.length !== 1 ? 's' : ''}
        </div>

        {/* Lista de grupos */}
        <div className="space-y-4 max-w-[900px]">
          {gruposFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay grupos que coincidan con el filtro seleccionado
            </p>
          ) : (
            gruposFiltrados.map((grupo) => (
              <button
                key={grupo.id}
                onClick={() => handleGrupoClick(grupo)}
                className="w-full bg-white border border-gray-300 rounded-lg p-5 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-6">
                  {/* Código del grupo */}
                  <div className="w-32">
                    <p className="font-bold text-lg">{grupo.codigo}</p>
                    <p className="text-xs text-gray-500">Grupo {grupo.numeroGrupo}</p>
                  </div>

                  {/* Información de estudiantes */}
                  <div className="w-44">
                    <p className="text-sm font-semibold text-gray-700">
                      {grupo.cuposOcupados}/{grupo.cuposTotales} estudiantes
                    </p>
                    <p className="text-xs text-gray-500">
                      {grupo.cuposTotales - grupo.cuposOcupados} cupos disponibles
                    </p>
                  </div>

                  {/* Barra de progreso */}
                  <div className="flex-1">
                    <ProgressBar 
                      current={grupo.cuposOcupados}
                      total={grupo.cuposTotales}
                      percentage={grupo.porcentaje}
                    />
                  </div>

                  {/* Información adicional */}
                  <div className="w-48 text-left">
                    <p className="text-xs text-gray-600">
                      📍 {grupo.aula}
                    </p>
                    <p className="text-xs text-gray-600">
                      🕐 {grupo.hora}
                    </p>
                    <p className="text-xs text-gray-500">
                      {grupo.dias}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-8 max-w-[900px] bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            💡 <span className="font-semibold">Tip:</span> Haz clic en cualquier grupo para ver información detallada de los estudiantes inscritos.
          </p>
        </div>
      </div>

      {/* Modal de información del grupo */}
      <GroupInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        grupo={selectedGrupo}
        onModificar={handleModificar}
      />

      {/* Modal de administración del grupo */}
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

export default MisGrupos