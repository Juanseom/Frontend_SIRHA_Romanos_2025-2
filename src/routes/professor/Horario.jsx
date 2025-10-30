import { useState } from 'react'
import Layout from '../../components/common/Layout'

const Horario = () => {
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('2025-2')

  const semestres = ['2025-2', '2025-1', '2024-2', '2024-1']

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

  // Datos de ejemplo del horario del profesor (vendrán del backend)
  const horarioData = {
    '2025-2': [
      {
        id: 1,
        materia: 'DOSW',
        grupo: '2',
        nombreCompleto: 'Desarrollo y Operaciones de Software - Grupo 2',
        salon: 'B-204',
        estudiantes: 35,
        color: '#FFE66D',
        bloques: [
          { dia: 'Lunes', horaInicio: '08:30', horaFin: '10:00' },
          { dia: 'Miércoles', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: 2,
        materia: 'DOSW',
        grupo: '4',
        nombreCompleto: 'Desarrollo y Operaciones de Software - Grupo 4',
        salon: 'B-205',
        estudiantes: 32,
        color: '#FFD93D',
        bloques: [
          { dia: 'Martes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Jueves', horaInicio: '14:30', horaFin: '16:00' }
        ]
      },
      {
        id: 3,
        materia: 'MBDA',
        grupo: '3',
        nombreCompleto: 'Modelos de Bases de Datos - Grupo 3',
        salon: 'C-301',
        estudiantes: 30,
        color: '#A8DADC',
        bloques: [
          { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Viernes', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: 4,
        materia: 'MBDA',
        grupo: '5',
        nombreCompleto: 'Modelos de Bases de Datos - Grupo 5',
        salon: 'C-302',
        estudiantes: 28,
        color: '#89CFF0',
        bloques: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Sábado', horaInicio: '08:30', horaFin: '10:00' }
        ]
      },
      {
        id: 5,
        materia: 'ALGO',
        grupo: '1',
        nombreCompleto: 'Algoritmos y Estructuras de Datos - Grupo 1',
        salon: 'A-105',
        estudiantes: 40,
        color: '#F4A261',
        bloques: [
          { dia: 'Lunes', horaInicio: '16:00', horaFin: '17:30' },
          { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30' }
        ]
      }
    ],
    '2025-1': [
      {
        id: 6,
        materia: 'DOSW',
        grupo: '1',
        nombreCompleto: 'Desarrollo y Operaciones de Software - Grupo 1',
        salon: 'B-203',
        estudiantes: 38,
        color: '#FFE66D',
        bloques: [
          { dia: 'Lunes', horaInicio: '07:00', horaFin: '08:30' },
          { dia: 'Miércoles', horaInicio: '07:00', horaFin: '08:30' }
        ]
      },
      {
        id: 7,
        materia: 'PRYE',
        grupo: '2',
        nombreCompleto: 'Probabilidad y Estadística - Grupo 2',
        salon: 'A-201',
        estudiantes: 33,
        color: '#95E1D3',
        bloques: [
          { dia: 'Martes', horaInicio: '10:00', horaFin: '11:30' },
          { dia: 'Jueves', horaInicio: '10:00', horaFin: '11:30' }
        ]
      },
      {
        id: 8,
        materia: 'ALGO',
        grupo: '3',
        nombreCompleto: 'Algoritmos y Estructuras de Datos - Grupo 3',
        salon: 'A-106',
        estudiantes: 36,
        color: '#E76F51',
        bloques: [
          { dia: 'Viernes', horaInicio: '14:30', horaFin: '16:00' },
          { dia: 'Sábado', horaInicio: '10:00', horaFin: '11:30' }
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

  const totalGrupos = horario.length
  const totalEstudiantes = horario.reduce((sum, grupo) => sum + grupo.estudiantes, 0)
  const horasSemanales = horario.reduce((sum, grupo) => sum + grupo.bloques.length * 1.5, 0)

  return (
    <Layout homeRoute="/profesor-home" role="profesor">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Mi Horario de Clases</h1>
        <div className="w-full max-w-[1400px] h-1 bg-black mb-6"></div>

        {/* Estadísticas del semestre */}
        <div className="grid grid-cols-4 gap-4 mb-6 max-w-[1400px]">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-600">Semestre Actual</p>
            <p className="text-2xl font-bold text-blue-700">{semestreSeleccionado}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Grupos a Cargo</p>
            <p className="text-2xl font-bold text-green-700">{totalGrupos}</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Estudiantes</p>
            <p className="text-2xl font-bold text-purple-700">{totalEstudiantes}</p>
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
                            title={clase ? `${clase.nombreCompleto}\nSalón: ${clase.salon}\nEstudiantes: ${clase.estudiantes}` : ''}
                          >
                            {clase && (
                              <div className="flex flex-col items-center justify-center h-full">
                                <p className="font-bold text-sm">{clase.materia}-{clase.grupo}</p>
                                <p className="text-[10px] text-gray-700">{clase.salon}</p>
                                <p className="text-[9px] text-gray-600">{clase.estudiantes} est.</p>
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
            <h3 className="font-semibold mb-3 text-center">Tus semestres:</h3>
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

        {/* Leyenda de grupos */}
        <div className="mt-8 max-w-[1400px]">
          <h3 className="font-semibold mb-3 text-lg">Mis Grupos del Semestre:</h3>
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
                  <p className="font-bold text-base">{clase.materia} - Grupo {clase.grupo}</p>
                  <p className="text-sm text-gray-700 mt-1">{clase.nombreCompleto.split(' - ')[0]}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600">
                      📍 Salón: <span className="font-semibold">{clase.salon}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      👥 Estudiantes: <span className="font-semibold">{clase.estudiantes}</span>
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

export default Horario