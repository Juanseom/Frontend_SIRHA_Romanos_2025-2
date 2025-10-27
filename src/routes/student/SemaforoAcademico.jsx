import { useState } from 'react'
import Layout from '../../components/common/Layout'
import MateriaCard from '../../components/student/MateriaCard'
import PrerequisitosModal from '../../components/student/PrerequisitosModal'

const SemaforoAcademico = () => {
  const [selectedMateria, setSelectedMateria] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Datos del estudiante (vendrán del backend)
  const estudiante = {
    nombre: 'Juan Sebastián Ortega',
    codigo: '1000100101',
    carrera: 'Ingeniería de Sistemas',
    promedioAcumulado: 3.85
  }

  // Datos de ejemplo de materias por semestre (vendrán del backend)
  const semestres = [
    {
      numero: 1,
      materias: [
        {
          id: 1,
          codigo: 'MABA',
          nombre: 'Matemáticas Básicas',
          creditos: 0,
          tipo: 'H', // H = Homologable, N = No homologable
          estado: 'aprobada', // aprobada, perdida, cursando, pendiente
          nota: 4.2, // Solo para materias aprobadas
          prerequisitos: []
        },
        {
          id: 2,
          codigo: 'FIBA',
          nombre: 'Física Básica',
          creditos: 0,
          tipo: 'H',
          estado: 'aprobada',
          nota: 3.8,
          prerequisitos: []
        },
        {
          id: 3,
          codigo: 'CADI',
          nombre: 'Cálculo Diferencial',
          creditos: 3,
          tipo: 'H',
          estado: 'aprobada',
          nota: 4.5,
          prerequisitos: ['MABA']
        },
        {
          id: 4,
          codigo: 'CALV',
          nombre: 'Cálculo Vectorial',
          creditos: 3,
          tipo: 'H',
          estado: 'aprobada',
          nota: 4.0,
          prerequisitos: ['CADI']
        },
        {
          id: 5,
          codigo: 'FIGE1',
          nombre: 'Física General 2',
          creditos: 3,
          tipo: 'H',
          estado: 'aprobada',
          nota: 3.9,
          prerequisitos: ['FIBA', 'CADI']
        },
        {
          id: 6,
          codigo: 'FUCO1',
          nombre: 'Fundamentos de la comunicación 1',
          creditos: 2,
          tipo: 'N',
          estado: 'aprobada',
          nota: 4.3,
          prerequisitos: []
        }
      ]
    },
    {
      numero: 2,
      materias: [
        {
          id: 7,
          codigo: 'FUPB',
          nombre: 'Fundamentos de Proyectos',
          creditos: 2,
          tipo: 'H',
          estado: 'cursando',
          prerequisitos: []
        },
        {
          id: 8,
          codigo: 'PRYE',
          nombre: 'Probabilidad y estadística',
          creditos: 3,
          tipo: 'H',
          estado: 'cursando',
          prerequisitos: ['CADI']
        },
        {
          id: 9,
          codigo: 'OSDL',
          nombre: 'Organización de los Sistemas de computación',
          creditos: 3,
          tipo: 'H',
          estado: 'cursando',
          prerequisitos: []
        },
        {
          id: 10,
          codigo: 'PI2E',
          nombre: 'Proyecto Integrador 2 - Estrategias de Organizaciones y Procesos',
          creditos: 3,
          tipo: 'N',
          estado: 'cursando',
          prerequisitos: ['PI1I']
        },
        {
          id: 11,
          codigo: 'DOSW',
          nombre: 'Desarrollo y Operaciones Software',
          creditos: 4,
          tipo: 'H',
          estado: 'cursando',
          prerequisitos: ['PRYE', 'ARSO']
        },
        {
          id: 12,
          codigo: 'BUCA',
          nombre: 'Business Cases',
          creditos: 3,
          tipo: 'H',
          estado: 'perdida',
          prerequisitos: ['FUPB']
        }
      ]
    },
    {
      numero: 3,
      materias: [
        {
          id: 13,
          codigo: 'ARSO',
          nombre: 'Arquitectura y Servicios de Red',
          creditos: 4,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: ['OSDL']
        },
        {
          id: 14,
          codigo: 'PRIN',
          nombre: 'Principios y Tecnologías IA',
          creditos: 3,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: ['PRYE']
        },
        {
          id: 15,
          codigo: 'ARSS',
          nombre: 'Arquitectura de Software',
          creditos: 4,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: ['DOSW']
        },
        {
          id: 16,
          codigo: 'TDIG',
          nombre: 'Transformación Digital y Soluciones Empresariales',
          creditos: 4,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: ['BUCA']
        },
        {
          id: 17,
          codigo: 'INSN',
          nombre: 'Innovación Software en las Nuevas Tecnologías',
          creditos: 4,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: ['PI2E']
        },
        {
          id: 18,
          codigo: 'ELTI',
          nombre: 'Electiva técnica 1/5',
          creditos: 3,
          tipo: 'H',
          estado: 'pendiente',
          prerequisitos: []
        }
      ]
    },
    {
      numero: 4,
      materias: [
        {
          id: 19,
          codigo: 'COJA',
          nombre: 'Cojines Reales Institucional politica',
          creditos: 2,
          tipo: 'N',
          estado: 'pendiente',
          prerequisitos: []
        }
      ]
    }
  ]

  const handleMateriaClick = (materia) => {
    setSelectedMateria(materia)
    setIsModalOpen(true)
  }

  // Calcular créditos totales
  const creditosTotales = semestres.reduce((total, semestre) => {
    return total + semestre.materias.reduce((sum, materia) => sum + materia.creditos, 0)
  }, 0)

  // Calcular créditos según estado
  const creditosAprobados = semestres.reduce((total, semestre) => {
    return total + semestre.materias
      .filter(m => m.estado === 'aprobada')
      .reduce((sum, materia) => sum + materia.creditos, 0)
  }, 0)

  const creditosCursando = semestres.reduce((total, semestre) => {
    return total + semestre.materias
      .filter(m => m.estado === 'cursando')
      .reduce((sum, materia) => sum + materia.creditos, 0)
  }, 0)

  const creditosPendientes = semestres.reduce((total, semestre) => {
    return total + semestre.materias
      .filter(m => m.estado === 'pendiente')
      .reduce((sum, materia) => sum + materia.creditos, 0)
  }, 0)

  return (
    <Layout homeRoute="/student-home" role="student">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Semáforo Académico</h1>
        <div className="w-full max-w-[1400px] h-1 bg-black mb-6"></div>

        {/* Información del estudiante */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 max-w-[1400px]">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Estudiante:</p>
              <p className="font-semibold">{estudiante.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Código:</p>
              <p className="font-semibold">{estudiante.codigo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Carrera:</p>
              <p className="font-semibold">{estudiante.carrera}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Promedio Acumulado:</p>
              <p className="font-semibold">{estudiante.promedioAcumulado}</p>
            </div>
          </div>

          {/* Estadísticas de créditos */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Créditos Totales:</p>
                <p className="font-bold text-lg">{creditosTotales}</p>
              </div>
              <div>
                <p className="text-gray-600">Aprobados:</p>
                <p className="font-bold text-lg text-[#9CECA6]">{creditosAprobados}</p>
              </div>
              <div>
                <p className="text-gray-600">Cursando:</p>
                <p className="font-bold text-lg text-[#6FB1E1]">{creditosCursando}</p>
              </div>
              <div>
                <p className="text-gray-600">Pendientes:</p>
                <p className="font-bold text-lg text-gray-500">{creditosPendientes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de materias organizado por semestres (filas) */}
        <div className="max-w-full overflow-x-auto">
          <div className="space-y-8 pb-4">
            {semestres.map((semestre) => (
              <div key={semestre.numero}>
                {/* Indicador de semestre (opcional) */}
                {/* <h3 className="text-sm font-bold text-gray-600 mb-3">Semestre {semestre.numero}</h3> */}
                
                {/* Materias del semestre en fila con scroll horizontal */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {semestre.materias.map((materia) => (
                    <MateriaCard
                      key={materia.id}
                      materia={materia}
                      onClick={() => handleMateriaClick(materia)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de prerequisitos */}
        <PrerequisitosModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          materia={selectedMateria}
        />
      </div>
    </Layout>
  )
}

export default SemaforoAcademico