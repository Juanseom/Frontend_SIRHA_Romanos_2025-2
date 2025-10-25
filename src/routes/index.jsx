import { createBrowserRouter } from 'react-router-dom';
import GestionarSolicitudes from './GestionarSolicitudes.jsx';
import DeanHome from './DeanHome.jsx';
import Periodos from './Periodos.jsx';

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