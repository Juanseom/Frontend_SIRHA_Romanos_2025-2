import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Card from '../components/Card'
import gestionarSolicitudes from '../assets/icons/gestionarSolicitudes.png'
import monitorearGrupos from '../assets/icons/monitorearGrupos.png'
import periodos from '../assets/icons/periodos.png'

const DeanHome = () => {
  const navigate = useNavigate()

  return (
    <Layout homeRoute="/dean-home">
      {/* Responsive padding */}
      <div className="pl-4 sm:pl-8 md:pl-12 lg:pl-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Decanatura</h1>
        <div className="w-full max-w-full lg:max-w-[1200px] h-1 bg-black mb-12 sm:mb-16 md:mb-20"></div>

        {/* Grid responsive - 1 columna móvil, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card 
            title="Gestionar Solicitudes"
            icon={
              <img 
                src={gestionarSolicitudes} 
                alt="Gestionar Solicitudes" 
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
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
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 object-contain"
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
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
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