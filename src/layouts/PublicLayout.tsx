import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PillButton } from '../components/ui/PillButton'

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col relative text-on-surface">
      {/* Background blobs for general pages without WebGL shader */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-secondary-container/10 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#ffdad6]/20 to-transparent blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/30 backdrop-blur-[30px] border-b border-white/20 shadow-glass">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link to="/" className="font-headline text-headline-md font-black tracking-tighter text-primary">
            AYXVIBE
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/destinations" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
              Destinations
            </Link>
            <Link to="/search" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
              Programs
            </Link>
            <Link to="/tests" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
              Test Prep
            </Link>
            <Link to="/academy" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
              Academy
            </Link>
            <Link to="/login" className="text-on-surface-variant hover:text-secondary transition-colors font-headline text-label-md px-3 py-2 rounded-lg hover:bg-white/10">
              Log In
            </Link>
          </nav>

          <PillButton 
            variant="primary" 
            className="px-6 py-2.5 !text-sm"
            onClick={() => navigate('/onboarding/path')}
          >
            Get Started
          </PillButton>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-surface-container-low/40 backdrop-blur-[20px] w-full border-t border-white/10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto gap-6">
          <div className="text-center md:text-left">
            <div className="font-headline text-headline-md font-bold text-primary mb-2">AYXVIBE</div>
            <div className="font-body text-body-md text-on-surface-variant text-sm">
              © {new Date().getFullYear()} AYXVIBE. Empowering Global Careers.
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="font-headline text-on-surface-variant hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="font-headline text-on-surface-variant hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="font-headline text-on-surface-variant hover:text-secondary transition-colors">Partner with Us</a>
            <a href="#" className="font-headline text-on-surface-variant hover:text-secondary transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
export default PublicLayout
