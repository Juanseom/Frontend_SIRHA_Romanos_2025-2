import { useState } from 'react'
import Header from './header.jsx'
import Sidebar from './Sidebar.jsx'

const Layout = ({ children, homeRoute = '/', role = 'dean' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header homeRoute={homeRoute} />
      
      <div className="flex">
        {/* Menú Hamburguesa */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[120px] left-6 text-black hover:text-gray-600 transition-colors z-10"
          aria-label="Menu"
        >
          <svg className="w-10 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          role={role}
        />

        {/* Contenido principal */}
        <main className="flex-1 p-8 pl-24">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout