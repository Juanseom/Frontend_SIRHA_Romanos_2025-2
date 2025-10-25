import Header from './Header.jsx'
import { useState } from 'react'

const Layout = ({ children, homeRoute = '/' }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header homeRoute={homeRoute} />
      
      <div className="flex">
        {/* Menú Hamburguesa - Responsive */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-[120px] left-6 text-black hover:text-gray-600 transition-colors z-10 lg:block"
          aria-label="Menu"
        >
          <svg className="w-10 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        {/* Contenido principal - Responsive padding */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 pl-16 sm:pl-20 md:pl-24">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout