import Header from './header.jsx';

const Layout = ({ children, homeRoute = '/' }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header homeRoute={homeRoute} />
      
      {/* Área de contenido con menú hamburguesa */}
      <div className="flex">
        {/* Menú Hamburguesa - Lado izquierdo */}
        <button 
          className="fixed top-[120px] left-6 text-black hover:text-gray-600 transition-colors z-10"
          aria-label="Menu"
        >
          <svg className="w-10 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        {/* Contenido principal */}
        <main className="flex-1 p-8 pl-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;