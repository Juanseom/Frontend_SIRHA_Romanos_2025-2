import { useState } from 'react'
import Layout from '../../components/common/Layout'
import CrearMateriaModal from '../../components/admin/CrearMateriaModal'
import EditarMateriaModal from '../../components/admin/EditarMateriaModal'
import { useNavigate } from 'react-router-dom'

const GestionarMaterias = () => {
  const navigate = useNavigate()
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  
  // Mock de materias - vendría del backend
  const [materias, setMaterias] = useState([
    {
      id: 1,
      codigo: "DOSW",
      nombre: "Desarrollo y Operaciones de Software",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa",
      totalGrupos: 3
    },
    {
      id: 2,
      codigo: "CALV",
      nombre: "Cálculo Vectorial",
      creditos: 4,
      programa: "Todas las ingenierías",
      departamento: "Matemáticas",
      estado: "activa",
      totalGrupos: 5
    },
    {
      id: 3,
      codigo: "PSOC",
      nombre: "Psicología Social",
      creditos: 2,
      programa: "Todas las ingenierías",
      departamento: "Humanidades",
      estado: "activa",
      totalGrupos: 2
    },
    {
      id: 4,
      codigo: "PRYE",
      nombre: "Proyectos de Ingeniería",
      creditos: 3,
      programa: "Todas las ingenierías",
      departamento: "Proyectos",
      estado: "activa",
      totalGrupos: 4
    },
    {
      id: 5,
      codigo: "ALGO",
      nombre: "Algoritmos y Estructuras de Datos",
      creditos: 4,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "activa",
      totalGrupos: 3
    },
    {
      id: 6,
      codigo: "BDAV",
      nombre: "Bases de Datos Avanzadas",
      creditos: 3,
      programa: "Ingeniería de Sistemas",
      departamento: "Sistemas",
      estado: "inactiva",
      totalGrupos: 0
    }
  ])

  const materiasFiltradas = materias.filter(materia =>
    materia.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    materia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    materia.programa.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleCrearMateria = (nuevaMateria) => {
    const nuevoId = Math.max(...materias.map(m => m.id)) + 1
    const materiaCompleta = {
      ...nuevaMateria,
      id: nuevoId,
      totalGrupos: 0
    }
    
    setMaterias([...materias, materiaCompleta])
    setIsCrearModalOpen(false)
    alert(`✅ Materia ${nuevaMateria.codigo} creada exitosamente`)
  }

  const handleEditarMateria = (materiaActualizada) => {
    setMaterias(materias.map(m =>
      m.id === materiaActualizada.id ? materiaActualizada : m
    ))
    setIsEditarModalOpen(false)
    setMateriaSeleccionada(null)
    alert(`✅ Materia ${materiaActualizada.codigo} actualizada exitosamente`)
  }

  const handleEliminarMateria = (materiaId) => {
    const materia = materias.find(m => m.id === materiaId)
    
    if (materia.totalGrupos > 0) {
      alert(`❌ No se puede eliminar ${materia.codigo} porque tiene ${materia.totalGrupos} grupos activos`)
      return
    }
    
    if (confirm(`¿Está seguro de eliminar la materia ${materia.codigo}?`)) {
      setMaterias(materias.filter(m => m.id !== materiaId))
      alert('✅ Materia eliminada exitosamente')
    }
  }

  const handleAbrirEditar = (materia) => {
    setMateriaSeleccionada(materia)
    setIsEditarModalOpen(true)
  }

  const handleVerGrupos = (materia) => {
    navigate(`/admin/grupos-materias?materia=${materia.codigo}`)
  }

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16 pr-8">
        <h1 className="text-3xl font-bold mb-4">Gestión de Materias</h1>
        <div className="w-full max-w-[1400px] h-1 bg-black mb-8"></div>

        {/* Controles superiores */}
        <div className="flex justify-between items-center mb-6">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="🔍 Buscar por código, nombre o programa..."
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Botón crear */}
          <button
            onClick={() => setIsCrearModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            + CREAR NUEVA MATERIA
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Materias</p>
            <p className="text-2xl font-bold text-blue-600">{materias.length}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Activas</p>
            <p className="text-2xl font-bold text-green-600">
              {materias.filter(m => m.estado === 'activa').length}
            </p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Inactivas</p>
            <p className="text-2xl font-bold text-gray-600">
              {materias.filter(m => m.estado === 'inactiva').length}
            </p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Grupos</p>
            <p className="text-2xl font-bold text-purple-600">
              {materias.reduce((sum, m) => sum + m.totalGrupos, 0)}
            </p>
          </div>
        </div>

        {/* Tabla de materias */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Código</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Créditos</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Programa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Grupos</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {materiasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      <p className="text-lg font-semibold mb-2">No se encontraron materias</p>
                      <p className="text-sm">Intenta con otro término de búsqueda</p>
                    </td>
                  </tr>
                ) : (
                  materiasFiltradas.map((materia) => (
                    <tr key={materia.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-bold text-blue-600">{materia.codigo}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">{materia.nombre}</td>
                      <td className="px-6 py-4 text-sm text-center">{materia.creditos}</td>
                      <td className="px-6 py-4 text-sm">{materia.programa}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleVerGrupos(materia)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold"
                        >
                          {materia.totalGrupos} {materia.totalGrupos === 1 ? 'grupo' : 'grupos'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          materia.estado === 'activa'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {materia.estado === 'activa' ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAbrirEditar(materia)}
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleEliminarMateria(materia.id)}
                            className="text-red-600 hover:text-red-800 text-sm underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modales */}
      <CrearMateriaModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
        onCrear={handleCrearMateria}
      />

      <EditarMateriaModal
        isOpen={isEditarModalOpen}
        onClose={() => {
          setIsEditarModalOpen(false)
          setMateriaSeleccionada(null)
        }}
        materia={materiaSeleccionada}
        onEditar={handleEditarMateria}
      />
    </Layout>
  )
}

export default GestionarMaterias