import { useNavigate } from 'react-router-dom'
import sirhaLogo from '../assets/images/sirhaBlanco.png'

const Header = ({ homeRoute = '/' }) => {
  const navigate = useNavigate()

  return (
    <header className="w-full bg-[#b50e11] px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
      {/* Logo - Responsive size */}
      <button onClick={() => navigate(homeRoute)} className="flex items-center">
        <img 
          src={sirhaLogo} 
          alt="SIRHA Logo" 
          className="h-10 sm:h-12 md:h-14 w-auto object-contain"
        />
      </button>

      {/* Navigation Icons - Responsive spacing and size */}
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-6">
        <button 
          onClick={() => navigate(homeRoute)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Home"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>

        <button 
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Notifications"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
        </button>

        <button 
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Account"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header