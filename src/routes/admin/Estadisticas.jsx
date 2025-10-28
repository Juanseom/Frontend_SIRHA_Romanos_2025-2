import { useState } from 'react'
import Layout from '../../components/common/Layout'
import SemaforizacionGlobal from '../../components/admin/SemaforizacionGlobal'
import HistorialCambios from '../../components/admin/HistorialCambios'
import GruposStats from '../../components/admin/GruposStats'
import AprobacionRechazo from '../../components/admin/AprobacionRechazo'

const Estadisticas = () => {
  const [activeTab, setActiveTab] = useState('semaforizacion')

  const tabs = [
    { id: 'semaforizacion', label: 'Semaforización Global' },
    { id: 'historial', label: 'Historial de Cambios' },
    { id: 'grupos', label: 'Grupos' },
    { id: 'aprobacion', label: 'Aprobación vs Rechazo' }
  ]

  return (
    <Layout homeRoute="/admin-home" role="admin">
      <div className="pl-16">
        <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-t-2xl border-2 border-b-0 transition-all font-medium ${
                activeTab === tab.id
                  ? 'bg-white border-black shadow-md relative z-10'
                  : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Línea negra debajo de los tabs */}
        <div className="w-full h-1 bg-black mb-8 -mt-6"></div>

        {/* Contenido según tab activo */}
        <div className="pb-8">
          {activeTab === 'semaforizacion' && <SemaforizacionGlobal />}
          {activeTab === 'historial' && <HistorialCambios />}
          {activeTab === 'grupos' && <GruposStats />}
          {activeTab === 'aprobacion' && <AprobacionRechazo />}
        </div>
      </div>
    </Layout>
  )
}

export default Estadisticas