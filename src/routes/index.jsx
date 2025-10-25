import { createBrowserRouter } from 'react-router-dom'
import DeanHome from './dean/DeanHome'
import GestionarSolicitudes from './dean/GestionarSolicitudes'
import Periodos from './dean/Periodos'
import MonitorearGrupos from './dean/MonitorearGrupos'

export const router = createBrowserRouter([
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
  {
    path: '/',
    element: <DeanHome />,
  },
])