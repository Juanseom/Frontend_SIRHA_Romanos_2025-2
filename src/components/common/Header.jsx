import { useNavigate } from 'react-router-dom'
import sirhaLogo from '../../assets/logos/sirhaBlanco.png'
import ProfileDropdown from './ProfileDropdown'
import NotificationsDropdown from './NotificationsDropdown'

const Header = ({ homeRoute = '/' }) => {
  const navigate = useNavigate()

  return (
    <header className="w-full bg-[#b50e11] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo - clickeable para ir a home del flujo actual */}
      <button onClick={() => navigate(homeRoute)} className="flex items-center">
        <img 
          src={sirhaLogo} 
          alt="SIRHA Logo" 
          className="h-14 w-auto object-contain"
        />
      </button>

      {/* Navigation Icons */}
      <nav className="flex items-center gap-6">
        {/* Home Icon */}
        <button 
          onClick={() => navigate(homeRoute)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Home"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>

        {/* Notifications Dropdown */}
        <NotificationsDropdown />

        {/* Profile Dropdown*/}
        <ProfileDropdown />
      </nav>
    </header>
  );
};

export default Header