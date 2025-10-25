import { createBrowserRouter } from 'react-router-dom'
import DeanHome from './DeanHome'
import GestionarSolicitudes from './GestionarSolicitudes'
import Periodos from './Periodos'

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
    path: '/',
    element: <DeanHome />,
  },
])