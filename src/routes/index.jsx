import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'
import ProtectedRoute from '../components/common/ProtectedRoute'

// Dean routes
import DeanHome from './dean/DeanHome'
import GestionarSolicitudes from './dean/GestionarSolicitudes'
import Periodos from './dean/Periodos'
import MonitorearGrupos from './dean/MonitorearGrupos'
import GestionarGruposDean from './dean/GruposYMaterias'
import GestionarMateriasDean from './dean/GestionarMaterias'

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
import GestionarMaterias from './admin/GestionarMaterias'

export const router = createBrowserRouter([
  // Public routes (Login/Logout)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  
  // Default route - redirige al login
  {
    path: '/',
    element: <Login />,
  },

  // ==================== STUDENT ROUTES ====================
  {
    path: '/student-home',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/mis-solicitudes',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <MisSolicitudes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/mis-horarios',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <MisHorarios />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/semaforo',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <SemaforoAcademico />
      </ProtectedRoute>
    ),
  },

  // ==================== DEAN ROUTES ====================
  {
    path: '/dean-home',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <DeanHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dean/gestionar-solicitudes',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <GestionarSolicitudes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dean/periodos',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <Periodos />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dean/monitorear-grupos',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <MonitorearGrupos />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dean/grupos-materias',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <GestionarGruposDean />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dean/gestionar-materias',
    element: (
      <ProtectedRoute allowedRoles={['dean']}>
        <GestionarMateriasDean />
      </ProtectedRoute>
    ),
  },

  // ==================== ADMIN ROUTES ====================
  {
    path: '/admin-home',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/gestionar-solicitudes',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <GestionarSolicitudesAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/periodos',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <PeriodosAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/monitorear-grupos',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <MonitorearGruposAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/estadisticas',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Estadisticas />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/grupos-materias',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <GruposYMaterias />
      </ProtectedRoute>
    ),
  },
  {
  path: '/admin/gestionar-materias',
  element: (
    <ProtectedRoute allowedRoles={['admin']}>
      <GestionarMaterias />
    </ProtectedRoute>
  ),
}
])