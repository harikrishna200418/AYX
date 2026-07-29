import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { Stepper } from '../components/ui/Stepper'
import { GlassCard } from '../components/ui/GlassCard'

interface OnboardingPath {
  id: string
  title: string
  description: string
  icon: string
  tag: string
  color: string
}

export const ChoosePathPage: React.FC = () => {
  const navigate = useNavigate()
  const { setOnboardingPath, login, isAuthenticated } = useAuthStore()

  const paths: OnboardingPath[] = [
    {
      id: 'Study Abroad',
      title: 'Study Abroad Academy',
      description: 'Prepare for IELTS/TOEFL/PTE, short-list universities, apply for visas, and manage your transition abroad.',
      icon: 'flight_takeoff',
      tag: 'Global Degree',
      color: 'from-secondary/20 to-secondary/5',
    },
    {
      id: 'AI & Tech Skills',
      title: 'AI & Tech Skills Academy',
      description: 'Master Prompt Engineering, Data Analytics, Python coding, and AI tools demanded by modern global employers.',
      icon: 'memory',
      tag: 'Future-Proof Skills',
      color: 'from-tertiary/20 to-tertiary/5',
    },
    {
      id: 'Language Learning',
      title: 'Language Learning Academy',
      description: 'Learn German, French, Japanese, or Business English to unlock careers in major global economies.',
      icon: 'translate',
      tag: 'Multilingual Career',
      color: 'from-on-tertiary-container/15 to-on-tertiary-container/5',
    },
    {
      id: 'Career Development',
      title: 'Career Development Centre',
      description: 'Receive top resume tailoring, LinkedIn audits, interview preparations, and guidance for international offers.',
      icon: 'trending_up',
      tag: 'Professional Growth',
      color: 'from-primary/10 to-primary/5',
    },
  ]

  const handleSelectPath = async (pathId: string) => {
    setOnboardingPath(pathId)
    if (!isAuthenticated && !sessionStorage.getItem('isAuthenticated')) {
      await login('user@ayxvibe.com', 'Alex Mercer')
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-on-surface flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-secondary/10 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-radial from-primary/10 to-transparent blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-radial from-tertiary/5 to-transparent blur-[60px]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Stepper Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mb-10"
        >
          <Stepper currentStep={1} totalSteps={4} />
          <p className="text-center font-headline text-label-md text-secondary mt-3 tracking-widest uppercase text-xs font-bold">
            Step 1: Choose Your Path
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10 space-y-3"
        >
          <h1 className="text-headline-md md:text-headline-lg text-primary font-bold">
            What brings you to AYXVIBE?
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Select the primary area of development you want to focus on. We'll customize your
            dashboard, course catalog, and guidance resources.
          </p>
        </motion.div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
          {paths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard
                onClick={() => handleSelectPath(path.id)}
                className="p-6 md:p-8 flex flex-col text-left cursor-pointer group select-none relative overflow-hidden h-full"
              >
                {/* Card gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Decorative left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

                <div className="flex items-start gap-4 mb-4 relative">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-2xl font-light">
                      {path.icon}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary font-headline font-bold uppercase tracking-wider bg-secondary/10 px-2.5 py-0.5 rounded-full">
                      {path.tag}
                    </span>
                    <h3 className="font-headline text-[17px] md:text-[18px] font-bold text-primary mt-1.5 leading-snug">
                      {path.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed flex-grow relative">
                  {path.description}
                </p>

                <div className="mt-5 flex items-center text-secondary text-label-md font-headline text-sm font-bold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 relative">
                  Continue with this path
                  <span className="material-symbols-outlined text-[15px] ml-1.5">arrow_forward</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Skip hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 text-xs text-on-surface-variant/60 font-headline"
        >
          You can change your path anytime from your dashboard.
        </motion.p>
      </div>
    </div>
  )
}
export default ChoosePathPage
