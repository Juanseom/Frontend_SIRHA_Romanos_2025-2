// mockData.js - Datos de ejemplo para simulación sin backend

export const materiasInscritas = [
  {
    codigo: 'CALV',
    nombre: 'Cálculo Vectorial',
    grupoActual: '4147',
    creditos: 4,
    profesor: 'Dr. Juan Pérez',
    horario: 'Lunes 7-9am, Miércoles 7-9am'
  },
  {
    codigo: 'FUPR',
    nombre: 'Fundamentos de Proyectos',
    grupoActual: '8808',
    creditos: 3,
    profesor: 'Dra. Ana García',
    horario: 'Martes 10-12pm, Jueves 10-12pm'
  },
  {
    codigo: 'POOB',
    nombre: 'Programación Orientada a Objetos',
    grupoActual: '1964',
    creditos: 3,
    profesor: 'Ing. Carlos Martínez',
    horario: 'Lunes 2-4pm, Miércoles 2-4pm'
  },
  {
    codigo: 'IPRO',
    nombre: 'Introducción a la Programación',
    grupoActual: '2345',
    creditos: 4,
    profesor: 'Dr. Roberto Silva',
    horario: 'Martes 7-9am, Jueves 7-9am'
  }
]

export const gruposDisponibles = {
  'CALV': [
    {
      codigo: '4147',
      profesor: 'Dr. Juan Pérez',
      horario: 'Lunes 7-9am, Miércoles 7-9am',
      cuposDisponibles: 0,
      cuposTotal: 30
    },
    {
      codigo: '4144',
      profesor: 'Dra. María López',
      horario: 'Martes 2-4pm, Jueves 2-4pm',
      cuposDisponibles: 5,
      cuposTotal: 30
    },
    {
      codigo: '4145',
      profesor: 'Ing. Pedro Gómez',
      horario: 'Lunes 10-12pm, Miércoles 10-12pm',
      cuposDisponibles: 0,
      cuposTotal: 25
    }
  ],
  'FUPR': [
    {
      codigo: '8808',
      profesor: 'Dra. Ana García',
      horario: 'Martes 10-12pm, Jueves 10-12pm',
      cuposDisponibles: 3,
      cuposTotal: 28
    },
    {
      codigo: '8809',
      profesor: 'Ing. Luis Hernández',
      horario: 'Lunes 8-10am, Miércoles 8-10am',
      cuposDisponibles: 8,
      cuposTotal: 30
    }
  ],
  'POOB': [
    {
      codigo: '1964',
      profesor: 'Ing. Carlos Martínez',
      horario: 'Lunes 2-4pm, Miércoles 2-4pm',
      cuposDisponibles: 2,
      cuposTotal: 30
    },
    {
      codigo: '1965',
      profesor: 'Dr. Fernando Ruiz',
      horario: 'Martes 9-11am, Jueves 9-11am',
      cuposDisponibles: 12,
      cuposTotal: 30
    }
  ],
  'IPRO': [
    {
      codigo: '2345',
      profesor: 'Dr. Roberto Silva',
      horario: 'Martes 7-9am, Jueves 7-9am',
      cuposDisponibles: 1,
      cuposTotal: 25
    },
    {
      codigo: '2346',
      profesor: 'Dra. Claudia Mendoza',
      horario: 'Lunes 3-5pm, Miércoles 3-5pm',
      cuposDisponibles: 7,
      cuposTotal: 28
    }
  ]
}

export const materiasParaInscribir = [
  {
    codigo: 'PRYE',
    nombre: 'Proyectos de Ingeniería',
    creditos: 3,
    prerequisitos: ['CALV', 'IPRO'],
    grupos: [
      {
        codigo: '4567',
        profesor: 'Ing. Santiago Torres',
        horario: 'Viernes 8-11am',
        cuposDisponibles: 10,
        cuposTotal: 25
      },
      {
        codigo: '4568',
        profesor: 'Dra. Laura Jiménez',
        horario: 'Sábado 7-10am',
        cuposDisponibles: 0,
        cuposTotal: 20
      }
    ]
  },
  {
    codigo: 'BADA',
    nombre: 'Bases de Datos',
    creditos: 4,
    prerequisitos: ['FUPR'],
    grupos: [
      {
        codigo: '3456',
        profesor: 'Dr. Miguel Ángel Rojas',
        horario: 'Martes 7-9am, Jueves 7-9am',
        cuposDisponibles: 15,
        cuposTotal: 30
      },
      {
        codigo: '3457',
        profesor: 'Ing. Patricia Vega',
        horario: 'Lunes 2-4pm, Miércoles 2-4pm',
        cuposDisponibles: 8,
        cuposTotal: 28
      }
    ]
  },
  {
    codigo: 'RECO',
    nombre: 'Redes de Computadores',
    creditos: 3,
    prerequisitos: ['POOB'],
    grupos: [
      {
        codigo: '5678',
        profesor: 'Ing. Andrés Castro',
        horario: 'Martes 3-5pm, Jueves 3-5pm',
        cuposDisponibles: 5,
        cuposTotal: 25
      }
    ]
  },
  {
    codigo: 'MATE',
    nombre: 'Matemáticas Discretas',
    creditos: 4,
    prerequisitos: [],
    grupos: [
      {
        codigo: '6789',
        profesor: 'Dr. Ricardo Pardo',
        horario: 'Lunes 8-10am, Miércoles 8-10am',
        cuposDisponibles: 20,
        cuposTotal: 30
      },
      {
        codigo: '6790',
        profesor: 'Dra. Sofía Ramírez',
        horario: 'Viernes 2-6pm',
        cuposDisponibles: 0,
        cuposTotal: 25
      }
    ]
  }
]

export const validaciones = {
  tieneMateria: (codigoMateria) => {
    return materiasInscritas.some(m => m.codigo === codigoMateria)
  },

  noTieneMateria: (codigoMateria) => {
    return !materiasInscritas.some(m => m.codigo === codigoMateria)
  },

  getGrupoActual: (codigoMateria) => {
    const materia = materiasInscritas.find(m => m.codigo === codigoMateria)
    return materia?.grupoActual || null
  },

  tieneCupos: (codigoMateria, codigoGrupo) => {
    const grupos = gruposDisponibles[codigoMateria]
    if (!grupos) return false
    
    const grupo = grupos.find(g => g.codigo === codigoGrupo)
    return grupo && grupo.cuposDisponibles > 0
  },

  cumplePrerequisitos: (codigoMateria) => {
    const materia = materiasParaInscribir.find(m => m.codigo === codigoMateria)
    if (!materia || !materia.prerequisitos) return true
    
    return materia.prerequisitos.every(prereq => 
      materiasInscritas.some(mi => mi.codigo === prereq)
    )
  },
  tieneConflictoHorario: (nuevoHorario) => {
    return false
  }
}

export const getMateriaInfo = (codigoMateria) => {
  let materia = materiasInscritas.find(m => m.codigo === codigoMateria)
  if (materia) return { ...materia, inscrita: true }
  
  materia = materiasParaInscribir.find(m => m.codigo === codigoMateria)
  if (materia) return { ...materia, inscrita: false }
  
  return null
}

export const getGrupoInfo = (codigoMateria, codigoGrupo) => {

  const grupos = gruposDisponibles[codigoMateria]
  if (grupos) {
    const grupo = grupos.find(g => g.codigo === codigoGrupo)
    if (grupo) return grupo
  }
  
  const materia = materiasParaInscribir.find(m => m.codigo === codigoMateria)
  if (materia && materia.grupos) {
    return materia.grupos.find(g => g.codigo === codigoGrupo)
  }
  
  return null
}

export default {
  materiasInscritas,
  gruposDisponibles,
  materiasParaInscribir,
  validaciones,
  getMateriaInfo,
  getGrupoInfo
}