import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassInput } from '../components/ui/GlassInput'
import { PillButton } from '../components/ui/PillButton'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !agreeTerms) return
    setLoading(true)

    try {
      // Mock signup -> just logs in the user with their name
      const success = await login(email, name)
      if (success) {
        navigate('/onboarding/path')
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
          <div className="mb-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-glow-primary border border-white/20 relative">
              <span className="absolute inset-[-8px] rounded-full bg-primary/20 animate-pulse -z-10" />
              <span className="material-symbols-outlined text-on-primary text-3xl font-light">flight_takeoff</span>
            </div>
            <h1 className="text-headline-lg text-primary tracking-tighter text-center">Create Account</h1>
            <p className="text-body-md text-on-surface-variant mt-2 text-center">Build skills, enable your global career.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <GlassInput
              id="name"
              type="text"
              label="Full Name"
              icon="person"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            {/* Terms Row */}
            <div className="flex items-start text-sm select-none">
              <label className="flex items-center cursor-pointer group mt-0.5">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#c5c5d3] text-secondary focus:ring-secondary/35 bg-white/50 w-4 h-4 mr-2"
                  required
                />
              </label>
              <span className="text-on-surface-variant">
                I agree to the{' '}
                <a href="#" className="font-headline text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-headline text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </a>.
              </span>
            </div>

            {/* Submit Button */}
            <PillButton
              type="submit"
              disabled={loading || !agreeTerms}
              className="w-full h-14 flex items-center justify-center gap-2 mt-8 text-label-md bg-gradient-to-r from-error to-on-tertiary-container shadow-glow-error hover:shadow-[0_0_20px_rgba(186,26,26,0.5)] border-none"
            >
              <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </PillButton>
          </form>

          <p className="mt-8 text-body-md text-on-surface-variant text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-headline hover:underline">
              Log In
            </Link>
          </p>
        </GlassCard>
      </main>
    </div>
  )
}
export default SignupPage
