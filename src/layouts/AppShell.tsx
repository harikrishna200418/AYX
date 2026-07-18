import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { AIChatWidget } from '../components/ui/AIChatWidget'

export const AppShell: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  // Gate the route: Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
    }
  }, [isAuthenticated, navigate, location])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-on-surface flex flex-col relative">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-radial from-secondary-container/5 to-transparent blur-[80px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-radial from-primary/5 to-transparent blur-[100px]" />
      </div>

      {/* Auth Shell Header */}
      <header className="sticky top-0 w-full z-40 bg-white/40 backdrop-blur-[30px] border-b border-white/20 shadow-glass">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="font-headline text-headline-md font-black tracking-tighter text-primary">
              AYXVIBE
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className={`transition-colors font-headline text-label-md px-3 py-2 rounded-lg ${
                  location.pathname === '/dashboard' 
                    ? 'text-secondary font-bold bg-white/50 shadow-sm border border-white/20' 
                    : 'text-on-surface-variant hover:text-secondary hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/my-learning" 
                className={`transition-colors font-headline text-label-md px-3 py-2 rounded-lg ${
                  location.pathname === '/my-learning' 
                    ? 'text-secondary font-bold bg-white/50 shadow-sm border border-white/20' 
                    : 'text-on-surface-variant hover:text-secondary hover:bg-white/10'
                }`}
              >
                My Learning
              </Link>
              <Link to="/academy" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
                Academy Hub
              </Link>
              <Link to="/destinations" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
                Destinations
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile Info */}
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="font-headline text-label-md text-primary font-bold">{user?.name || 'Alex Mercer'}</span>
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider">{user?.path || 'Global Aspirant'}</span>
            </div>
            
            {/* Avatar Pill */}
            <div className="w-10 h-10 rounded-full bg-secondary-container text-white flex items-center justify-center font-headline font-bold shadow-md border border-white/40">
              {user?.name ? user.name[0] : 'A'}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error/10 flex items-center justify-center"
              title="Log Out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow relative z-10 py-8 px-margin-mobile md:px-margin-desktop max-w-container-max w-full mx-auto">
        <Outlet />
      </main>

      {/* Authenticated AIChatWidget */}
      <AIChatWidget />
    </div>
  )
}
export default AppShell
