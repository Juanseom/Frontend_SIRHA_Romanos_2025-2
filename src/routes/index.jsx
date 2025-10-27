import { createBrowserRouter } from 'react-router-dom'
// Dean routes
import DeanHome from './dean/DeanHome'
import GestionarSolicitudes from './dean/GestionarSolicitudes'
import Periodos from './dean/Periodos'
import MonitorearGrupos from './dean/MonitorearGrupos'

// Student routes
import StudentHome from './student/StudentHome'
import MisSolicitudes from './student/MisSolicitudes'
import MisHorarios from './student/MisHorarios'
import SemaforoAcademico from './student/SemaforoAcademico'

// Admin routes
import AdminHome from './admin/AdminHome'
import GestionarSolicitudesAdmin from './admin/GestionarSolicitudes'
import PeriodosAdmin from './admin/Periodos'
import MonitorearGruposAdmin from './admin/MonitorearGrupos'
import Estadisticas from './admin/Estadisticas'
import GruposYMaterias from './admin/GruposYMaterias'

export const router = createBrowserRouter([
  // Dean routes
  {
    path: '/dean-home',
    element: <DeanHome />,
  },
  {
    path: '/dean/gestionar-solicitudes',
    element: <GestionarSolicitudes />,
  },
  {
    path: '/dean/periodos',
    element: <Periodos />,
  },
  {
    path: '/dean/monitorear-grupos',
    element: <MonitorearGrupos />,
  },

  // Student routes
  {
    path: '/student-home',
    element: <StudentHome />,
  },
  {
    path: '/student/mis-solicitudes',
    element: <MisSolicitudes />,
  },
  {
    path: '/student/mis-horarios',
    element: <MisHorarios />,
  },
  {
    path: '/student/semaforo',
    element: <SemaforoAcademico />,
  },

  // Admin routes
  {
    path: '/admin-home',
    element: <AdminHome />,
  },
  {
    path: '/admin/gestionar-solicitudes',
    element: <GestionarSolicitudesAdmin />,
  },
  {
    path: '/admin/periodos',
    element: <PeriodosAdmin />,
  },
  {
    path: '/admin/monitorear-grupos',
    element: <MonitorearGruposAdmin />,
  },
  {
  path: '/admin/estadisticas',
  element: <Estadisticas />
  },
  {
    path: '/admin/grupos-materias',
    element: <GruposYMaterias />
  },

  // Default route
  {
    path: '/',
    element: <DeanHome />,
  },
])