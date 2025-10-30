import { useNavigate } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Card from '../../components/common/Card'
import horarioClases from '../../assets/icons/periodos.png'
import misGrupos from '../../assets/icons/gruposYMaterias.png'
import gestionarSolicitudes from '../../assets/icons/gestionarSolicitudes.png'

const ProfesorHome = () => {
  const navigate = useNavigate()

  return (
    <Layout homeRoute="/profesor-home" role="profesor">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Profesor</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-20"></div>

        {/* Fila única: 3 cards */}
        <div className="flex gap-8 justify-start items-start">
          <Card 
            title="Horario de Clases"
            icon={
              <img 
                src={horarioClases} 
                alt="Horario de Clases" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/profesor/horario')}
          />
          
          <Card 
            title="Mis Grupos"
            icon={
              <img 
                src={misGrupos} 
                alt="Mis Grupos" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/profesor/mis-grupos')}
          />
          
          <Card 
            title="Gestionar Solicitudes"
            icon={
              <img 
                src={gestionarSolicitudes} 
                alt="Gestionar Solicitudes" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/profesor/gestionar-solicitudes')}
          />
        </div>
      </div>
    </Layout>
  )
}

export default ProfesorHome