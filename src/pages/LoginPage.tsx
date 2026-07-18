import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassInput } from '../components/ui/GlassInput'
import { PillButton } from '../components/ui/PillButton'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Redirect target
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)

    try {
      // Mock log in
      const success = await login(email, 'Alex Mercer')
      if (success) {
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-[#f7f9fb] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-[#b6c4ff]/30 to-transparent blur-[60px] blob-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#ffdad6]/30 to-transparent blur-[80px] blob-float" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-radial from-[#dce1ff]/20 to-transparent blur-[70px] blob-float" style={{ animationDelay: '2s' }} />
      </div>

      <main className="w-full max-w-[480px] z-10 relative">
        <GlassCard hoverable={false} className="p-8 md:p-12 flex flex-col items-center">
          {/* Logo Area */}
          <div className="mb-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-glow-primary border border-white/20 relative">
              {/* Logo ring pulse effect */}
              <span className="absolute inset-[-8px] rounded-full bg-primary/20 animate-pulse -z-10" />
              <span className="material-symbols-outlined text-on-primary text-3xl font-light">flight_takeoff</span>
            </div>
            <h1 className="text-headline-lg text-primary tracking-tighter text-center">AYXVIBE</h1>
            <p className="text-body-md text-on-surface-variant mt-2 text-center">Your global journey begins here.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <GlassInput
              id="email"
              type="email"
              label="Email address"
              icon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <GlassInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              icon="lock"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-outline hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined select-none text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              }
            />

            {/* Options Row */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group select-none">
                <input type="checkbox" className="rounded border-[#c5c5d3] text-secondary focus:ring-secondary/35 bg-white/50 w-4 h-4 mr-2" />
                <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
              </label>
              <a href="#" className="font-headline text-secondary hover:text-primary transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <PillButton
              type="submit"
              disabled={loading}
              className="w-full h-14 flex items-center justify-center gap-2 mt-8 text-label-md bg-gradient-to-r from-error to-on-tertiary-container shadow-glow-error hover:shadow-[0_0_20px_rgba(186,26,26,0.5)] border-none"
            >
              <span>{loading ? 'Logging In...' : 'Log In'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </PillButton>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center my-8">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#c5c5d3]/30 to-transparent"></div>
            <span className="px-4 text-body-md text-[#757682] text-xs uppercase tracking-wider">or continue with</span>
            <div className="flex-grow h-px bg-gradient-to-r from-[#c5c5d3]/30 via-[#c5c5d3]/30 to-transparent"></div>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center gap-4 w-full">
            {['google', 'apple', 'linkedin'].map((social) => (
              <button
                key={social}
                type="button"
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/40 border border-white/80 hover:bg-white/70 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200"
                onClick={() => login('mock@ayxvibe.com').then(() => navigate(from, { replace: true }))}
              >
                {social === 'google' && (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                )}
                {social === 'apple' && (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.93 3.78 2.29-3.21 1.94-2.58 6.43.5 7.74-.75 1.25-1.57 2.44-2.93 2.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                  </svg>
                )}
                {social === 'linkedin' && (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>

          <p className="mt-8 text-body-md text-on-surface-variant text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-secondary font-headline hover:underline">
              Sign up
            </Link>
          </p>
        </GlassCard>
      </main>
    </div>
  )
}
export default LoginPage
