import { createBrowserRouter } from 'react-router-dom'
import DeanHome from './DeanHome'
import GestionarSolicitudes from './GestionarSolicitudes'

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
    path: '/',
    element: <DeanHome />,
  },
])