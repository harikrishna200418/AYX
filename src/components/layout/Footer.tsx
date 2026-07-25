import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const Footer: React.FC = () => {
  const navigate = useNavigate()

  return (
    <footer className="relative z-10 bg-surface-container-low/40 backdrop-blur-[20px] w-full border-t border-white/20 pt-12 pb-8 text-on-surface">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="font-headline text-headline-md font-black tracking-tighter text-primary inline-block">
              AYXVIBE
            </Link>
            <p className="text-body-md text-on-surface-variant max-w-sm leading-relaxed">
              Empowering the next generation of global citizens through curated education, test prep, and career acceleration.
            </p>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
              Programs & Academy
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant font-headline">
              <li>
                <Link to="/academy?division=study-abroad" className="hover:text-secondary transition-colors">
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link to="/academy?division=ai-tech" className="hover:text-secondary transition-colors">
                  AI & Tech
                </Link>
              </li>
              <li>
                <Link to="/academy?division=languages" className="hover:text-secondary transition-colors">
                  Language Academy
                </Link>
              </li>
              <li>
                <Link to="/academy?division=overseas-success" className="hover:text-secondary transition-colors">
                  Success Programme
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-secondary transition-colors">
                  Test Prep Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant font-headline">
              <li>
                <Link to="/destinations" className="hover:text-secondary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-secondary transition-colors">
                  Career Centre
                </Link>
              </li>
              <li>
                <button onClick={() => navigate('/onboarding/path')} className="hover:text-secondary transition-colors text-left">
                  Build My Pathway
                </button>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary transition-colors">
                  Admissions Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
              Newsletter
            </h4>
            <p className="text-xs text-on-surface-variant">
              Stay updated with global opportunities and announcements.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-full bg-white/70 border border-white/50 p-1.5 shadow-sm">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent px-3 py-1.5 text-xs text-primary placeholder:text-on-surface-variant/60 focus:outline-none w-full"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 hover:bg-secondary/90 transition-all shadow-sm"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>
            © {new Date().getFullYear()} AYXVIBE. Empowering Global Careers.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Partner with Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
