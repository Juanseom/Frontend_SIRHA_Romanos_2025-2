import { useNavigate } from 'react-router-dom'
import Layout from '../../components/common/Layout'
import Card from '../../components/common/Card'
import misSolicitudes from '../../assets/icons/misSolicitudes.png'
import misHorarios from '../../assets/icons/periodos.png' 
import semaforo from '../../assets/icons/semaforo.png'

const StudentHome = () => {
  const navigate = useNavigate()

  return (
    <Layout homeRoute="/student-home" role="student">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-4">Estudiante</h1>
        <div className="w-full max-w-[1200px] h-1 bg-black mb-20"></div>

        <div className="flex gap-8 justify-start items-start">
          <Card 
            title="Mis Solicitudes"
            icon={
              <img 
                src={misSolicitudes} 
                alt="Mis Solicitudes" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/student/mis-solicitudes')}
          />
          
          <Card 
            title="Mis Horarios"
            icon={
              <img 
                src={misHorarios} 
                alt="Mis Horarios" 
                className="w-44 h-44 object-contain"
              />
            }
            onClick={() => navigate('/student/mis-horarios')}
          />
          
          <Card 
            title="Semáforo Académico"
            icon={
              <img 
                src={semaforo} 
                alt="Semáforo Académico" 
                className="w-40 h-40 object-contain"
              />
            }
            onClick={() => navigate('/student/semaforo')}
          />
        </div>
      </div>
    </Layout>
  )
}

export default StudentHome