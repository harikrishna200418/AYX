import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { PillButton } from '../components/ui/PillButton'
import { Footer } from '../components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/search', label: 'Programs' },
  { to: '/tests', label: 'Test Prep' },
  { to: '/academy', label: 'Academy' },
  { to: '/login', label: 'Log In' },
]

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col relative text-on-surface">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-secondary-container/10 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#ffdad6]/20 to-transparent blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/30 backdrop-blur-[30px] border-b border-white/20 shadow-glass">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3.5 max-w-container-max mx-auto">
          <Link to="/" className="font-headline text-headline-md font-black tracking-tighter text-primary">
            AYXVIBE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-headline text-label-md px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-secondary bg-secondary/10 font-bold'
                    : 'text-on-surface-variant hover:text-secondary hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <PillButton
              variant="primary"
              className="px-5 py-2 !text-sm hidden sm:flex"
              onClick={() => navigate('/onboarding/path')}
            >
              Get Started
            </PillButton>

            {/* Hamburger Button — mobile only */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/30 border border-white/30 hover:bg-white/50 transition-all gap-[5px] p-2"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-full h-0.5 bg-primary rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-full h-0.5 bg-primary rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-full h-0.5 bg-primary rounded-full origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-white/20 bg-surface/60 backdrop-blur-[30px]"
            >
              <nav className="flex flex-col px-margin-mobile py-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 font-headline text-label-md px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(link.to)
                          ? 'text-secondary bg-secondary/10 font-bold'
                          : 'text-on-surface-variant hover:text-secondary hover:bg-white/20'
                      }`}
                    >
                      {link.label}
                      {isActive(link.to) && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                  className="pt-3 mt-1 border-t border-white/20"
                >
                  <PillButton
                    variant="primary"
                    className="w-full !py-3 !text-sm"
                    onClick={() => {
                      navigate('/onboarding/path')
                      setMobileMenuOpen(false)
                    }}
                  >
                    Get Started
                  </PillButton>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
export default PublicLayout
