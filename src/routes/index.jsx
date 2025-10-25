import { createBrowserRouter } from 'react-router-dom'

// Dean routes
import DeanHome from './dean/DeanHome'
import GestionarSolicitudes from './dean/GestionarSolicitudes'
import Periodos from './dean/Periodos'
import MonitorearGrupos from './dean/MonitorearGrupos'

// Student routes
import StudentHome from './student/StudentHome'

// Admin routes
import AdminHome from './admin/AdminHome'

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
  // {
  //   path: '/student/mis-solicitudes',
  //   element: <MisSolicitudes />,
  // },

  // Admin routes
  {
    path: '/admin-home',
    element: <AdminHome />,
  },
  // {
  //   path: '/admin/gestionar-solicitudes',
  //   element: <AdminGestionarSolicitudes />,
  // },

  // Default redirect
  {
    path: '/',
    element: <DeanHome />,
  },
])