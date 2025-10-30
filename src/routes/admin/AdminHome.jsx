import { useNavigate } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Card from '../../components/common/Card'
import gestionarSolicitudes from '../../assets/icons/gestionarSolicitudes.png'
import monitorearGrupos from '../../assets/icons/monitorearGrupos.png'
import estadisticas from '../../assets/icons/estadisticas.png'
import gruposYMaterias from '../../assets/icons/gruposYMaterias.png'
import materias from '../../assets/icons/materias.png'
import periodos from '../../assets/icons/periodos.png'

const AdminHome = () => {
  const navigate = useNavigate()

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Administrador</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-20"></div>

        {/* Primera fila: 3 cards */}
        <div className="flex gap-8 justify-start items-start mb-8">
          <Card 
            title="Gestionar Solicitudes"
            icon={
              <img 
                src={gestionarSolicitudes} 
                alt="Gestionar Solicitudes" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/admin/gestionar-solicitudes')}
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
            onClick={() => navigate('/admin/monitorear-grupos')}
          />
          
          <Card 
            title="Estadísticas"
            icon={
              <img 
                src={estadisticas} 
                alt="Estadísticas" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/admin/estadisticas')}
          />
        </div>

        {/* Segunda fila: 3 cards (agregando Gestionar Materias y renombrando Grupos y Materias) */}
        <div className="flex gap-8 justify-start items-start">
          <Card 
            title="Gestionar Grupos"
            icon={
              <img 
                src={gruposYMaterias} 
                alt="Gestionar Grupos" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/admin/grupos-materias')}
          />
          
          <Card 
            title="Gestionar Materias"
            icon={
              <img 
                src={materias} 
                alt="Gestionar Materias" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/admin/gestionar-materias')}
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
            onClick={() => navigate('/admin/periodos')}
          />
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome