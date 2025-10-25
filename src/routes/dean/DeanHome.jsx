import { useNavigate } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Card from '../../components/common/Card'

import gestionarSolicitudes from '../../assets/icons/gestionarSolicitudes.png'
import monitorearGrupos from '../../assets/icons/monitorearGrupos.png'
import periodos from '../../assets/icons/periodos.png'

const DeanHome = () => {
  const navigate = useNavigate()

  return (
    <Layout homeRoute="/dean-home">
      {/* Contenedor con padding para alinear todo */}
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Decanatura</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-20"></div>

        {/* Cards alineadas con el texto */}
        <div className="flex gap-8 justify-start items-start">
          <Card 
            title="Gestionar Solicitudes"
            icon={
              <img 
                src={gestionarSolicitudes} 
                alt="Gestionar Solicitudes" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/dean/gestionar-solicitudes')}
          />
          
          <Card 
            title="Periodos"
            icon={
              <img 
                src={periodos} 
                alt="Periodos" 
                className="w-44 h-44 object-contain"
              />
            }
            onClick={() => navigate('/dean/periodos')}
          />
          
          <Card 
            title="Monitorear Grupos"
            icon={
              <img 
                src={monitorearGrupos} 
                alt="Monitorear Grupos" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/dean/monitorear-grupos')}
          />
        </div>
      </div>
    </Layout>
  )
}

export default DeanHome