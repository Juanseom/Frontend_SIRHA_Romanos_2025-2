import { useState } from 'react'
import Layout from '../../components/common/Layout'

const MisHorarios = () => {
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('2025-2')

  const semestres = ['2025-2', '2025-1', '2024-2', '2024-1', '2023-2']

  const bloquesHorarios = [
    { inicio: '07:00', fin: '08:30', label: '7:00am - 8:30am' },
    { inicio: '08:30', fin: '10:00', label: '8:30am - 10:00am' },
    { inicio: '10:00', fin: '11:30', label: '10:00am - 11:30am' },
    { inicio: '11:30', fin: '13:00', label: '11:30am - 1:00pm' },
    { inicio: '13:00', fin: '14:30', label: '1:00pm - 2:30pm' },
    { inicio: '14:30', fin: '16:00', label: '2:30pm - 4:00pm' },
    { inicio: '16:00', fin: '17:30', label: '4:00pm - 5:30pm' },
    { inicio: '17:30', fin: '19:00', label: '5:30pm - 7:00pm' }
  ]

  // Datos de ejemplo del horario (vendrán del backend)
  const horarioData = {
    '2025-2': [
      {
        id: 1,
        materia: 'DOSW',
        nombreCompleto: 'Desarrollo y Operaciones de Software',
        profesor: 'Martín Cantor',
        salon: 'B-204',
        creditos: 3,
        color: '#FFE66D',
        bloques: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: 2,
        materia: 'PRYE',
        nombreCompleto: 'Probabilidad y Estadística',
        profesor: 'Laura Gómez',
        salon: 'A-105',
        creditos: 3,
        color: '#A8DADC',
        bloques: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: 3,
        materia: 'CALV',
        nombreCompleto: 'Cálculo Vectorial',
        profesor: 'Carlos Pérez',
        salon: 'C-301',
        creditos: 4,
        color: '#F4A261',
        bloques: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Jueves', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Sábado', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: 4,
        materia: 'FPOP',
        nombreCompleto: 'Filosofía y Cultura Popular',
        profesor: 'Ana Torres',
        salon: 'B-107',
        creditos: 2,
        color: '#E76F51',
        bloques: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Viernes', horaInicio: '16:00', horaFin: '17:30' }
        ]
      },
      {
        id: 5,
        materia: 'ESCU',
        nombreCompleto: 'Estética y Cultura',
        profesor: 'Roberto Sánchez',
        salon: 'A-203',
        creditos: 2,
        color: '#B5838D',
        bloques: [
          { dia: 'Martes', horaInicio: '17:30', horaFin: '19:00' }
        ]
      },
      {
        id: 6,
        materia: 'EGI3',
        nombreCompleto: 'Inglés III',
        profesor: 'Patricia Gutiérrez',
        salon: 'C-201',
        creditos: 2,
        color: '#6A4C93',
        bloques: [
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      }
    ],
    '2025-1': [
      {
        id: 7,
        materia: 'MATD',
        nombreCompleto: 'Matemáticas Discretas',
        profesor: 'Diego Morales',
        salon: 'B-305',
        creditos: 3,
        color: '#4ECDC4',
        bloques: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: 8,
        materia: 'FUEC',
        nombreCompleto: 'Fundamentos de Economía',
        profesor: 'Fernando Acosta',
        salon: 'A-401',
        creditos: 3,
        color: '#95E1D3',
        bloques: [
          { dia: 'Martes', horaInicio: '13:00', horaFin: '14:30' },
          { dia: 'Jueves', horaInicio: '13:00', horaFin: '14:30' }
        ]
      },
      {
        id: 9,
        materia: 'ALGO',
        nombreCompleto: 'Algoritmos y Estructuras de Datos',
        profesor: 'María Rodríguez',
        salon: 'C-102',
        creditos: 4,
        color: '#FFB6C1',
        bloques: [
          { dia: 'Lunes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Miércoles', horaInicio: '14:30', horaFin: '16:00' }
        ]
      }
    ],
    '2024-2': [
      {
        id: 10,
        materia: 'PROG',
        nombreCompleto: 'Programación Orientada a Objetos',
        profesor: 'Luis Martínez',
        salon: 'B-101',
        creditos: 3,
        color: '#87CEEB',
        bloques: [
          { dia: 'Martes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Jueves', horaInicio: '08:30', horaFin: '10:00' }
        ]
      }
    ]
  }

  const horario = horarioData[semestreSeleccionado] || []
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  const getClaseEnBloque = (dia, bloqueHora) => {
    for (const clase of horario) {
      for (const bloque of clase.bloques) {
        if (bloque.dia === dia && bloque.horaInicio === bloqueHora.inicio) {
          return clase
        }
      }
    }
    return null
  }

  const totalMaterias = horario.length
  const totalCreditos = horario.reduce((sum, materia) => sum + materia.creditos, 0)
  const horasSemanales = horario.reduce((sum, materia) => sum + materia.bloques.length * 1.5, 0)

  return (
    <Layout homeRoute="/student-home" role="student">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Mis Horarios</h1>
        <div className="w-full max-w-[1400px] h-1 bg-black mb-6"></div>

        {/* Estadísticas del semestre */}
        <div className="grid grid-cols-4 gap-4 mb-6 max-w-[1400px]">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-600">Semestre Actual</p>
            <p className="text-2xl font-bold text-blue-700">{semestreSeleccionado}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Materias</p>
            <p className="text-2xl font-bold text-green-700">{totalMaterias}</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Créditos</p>
            <p className="text-2xl font-bold text-purple-700">{totalCreditos}</p>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
            <p className="text-sm text-gray-600">Horas Semanales</p>
            <p className="text-2xl font-bold text-orange-700">{horasSemanales}h</p>
          </div>
        </div>

        {/* Selector de semestre y tabla */}
        <div className="flex gap-8">
          {/* Tabla de horario */}
          <div className="flex-1">
            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-xs font-semibold w-32">Hora</th>
                    {dias.map(dia => (
                      <th key={dia} className="border border-gray-300 p-2 text-sm font-semibold">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloquesHorarios.map((bloqueHora, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 text-[10px] text-center font-medium bg-gray-50">
                        {bloqueHora.label}
                      </td>
                      {dias.map((dia, diaIndex) => {
                        const clase = getClaseEnBloque(dia, bloqueHora)
                        
                        return (
                          <td
                            key={diaIndex}
                            className={`border border-gray-300 p-2 text-xs ${
                              clase ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                            }`}
                            style={{
                              backgroundColor: clase ? clase.color : 'white',
                              height: '65px'
                            }}
                            title={clase ? `${clase.nombreCompleto}\nProfesor: ${clase.profesor}\nSalón: ${clase.salon}\nCréditos: ${clase.creditos}` : ''}
                          >
                            {clase && (
                              <div className="flex flex-col items-center justify-center h-full">
                                <p className="font-bold text-sm">{clase.materia}</p>
                                <p className="text-[10px] text-gray-700">{clase.salon}</p>
                                <p className="text-[9px] text-gray-600">{clase.creditos} créditos</p>
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selector de semestres */}
          <div className="w-48">
            <h3 className="font-semibold mb-3 text-center">Tus horarios:</h3>
            <div className="border border-gray-300 rounded shadow-sm">
              {semestres.map(semestre => (
                <button
                  key={semestre}
                  onClick={() => setSemestreSeleccionado(semestre)}
                  className={`w-full p-3 border-b border-gray-300 last:border-b-0 text-sm transition-colors ${
                    semestreSeleccionado === semestre
                      ? 'bg-[#b50e11] text-white font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {semestre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda de materias */}
        <div className="mt-8 max-w-[1400px]">
          <h3 className="font-semibold mb-3 text-lg">Materias del Semestre:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {horario.map(clase => (
              <div
                key={clase.id}
                className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
              >
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 mt-1"
                  style={{ backgroundColor: clase.color }}
                ></div>
                <div className="flex-1">
                  <p className="font-bold text-base">{clase.materia}</p>
                  <p className="text-sm text-gray-700 mt-1">{clase.nombreCompleto}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600">
                      👨‍🏫 Profesor: <span className="font-semibold">{clase.profesor}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      📍 Salón: <span className="font-semibold">{clase.salon}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      📚 Créditos: <span className="font-semibold">{clase.creditos}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      🕐 Horario:
                    </p>
                    <div className="ml-4 space-y-0.5">
                      {clase.bloques.map((bloque, idx) => (
                        <p key={idx} className="text-xs text-gray-600">
                          • {bloque.dia}: {bloque.horaInicio} - {bloque.horaFin}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MisHorarios