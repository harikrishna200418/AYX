import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Stepper } from '../components/ui/Stepper'
import { GlassCard } from '../components/ui/GlassCard'

interface OnboardingPath {
  id: string
  title: string
  description: string
  icon: string
  tag: string
}

export const ChoosePathPage: React.FC = () => {
  const navigate = useNavigate()
  const { setOnboardingPath } = useAuthStore()

  const paths: OnboardingPath[] = [
    {
      id: 'Study Abroad',
      title: 'Study Abroad Academy',
      description: 'Prepare for IELTS/TOEFL/PTE, short-list universities, apply for visas, and manage your transition abroad.',
      icon: 'flight_takeoff',
      tag: 'Global Degree',
    },
    {
      id: 'AI & Tech Skills',
      title: 'AI & Tech Skills Academy',
      description: 'Master Prompt Engineering, Data Analytics, Python coding, and AI tools demanded by modern global employers.',
      icon: 'memory',
      tag: 'Future-Proof Skills',
    },
    {
      id: 'Language Learning',
      title: 'Language Learning Academy',
      description: 'Learn German, French, Japanese, or Business English to unlock careers in major global economies.',
      icon: 'translate',
      tag: 'Multilingual Career',
    },
    {
      id: 'Career Development',
      title: 'Career Development Centre',
      description: 'Receive top resume tailoring, LinkedIn audits, interview preparations, and guidance for international offers.',
      icon: 'trending_up',
      tag: 'Professional Growth',
    },
  ]

  const handleSelectPath = (pathId: string) => {
    setOnboardingPath(pathId)
    // Go to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-on-surface flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-secondary/10 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-radial from-primary/10 to-transparent blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Stepper Header */}
        <div className="w-full max-w-md mb-12">
          <Stepper currentStep={1} totalSteps={4} />
          <p className="text-center font-headline text-label-md text-secondary mt-3">STEP 1: CHOOSE YOUR PATH</p>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-headline-lg text-primary font-bold mb-4">What brings you to AYXVIBE?</h1>
          <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
            Select the primary area of development you want to focus on. We will customize your dashboard, course catalog, and guidance resources.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {paths.map((path) => (
            <GlassCard
              key={path.id}
              onClick={() => handleSelectPath(path.id)}
              className="p-6 md:p-8 flex flex-col text-left cursor-pointer group select-none relative overflow-hidden"
            >
              {/* Decorative side accent glow */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl font-light">
                    {path.icon}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-headline font-bold uppercase tracking-wider bg-secondary/10 px-2 py-0.5 rounded-full">
                    {path.tag}
                  </span>
                  <h3 className="font-headline text-[18px] font-bold text-primary mt-1">
                    {path.title}
                  </h3>
                </div>
              </div>

              <p className="text-body-md text-sm text-on-surface-variant leading-relaxed flex-grow">
                {path.description}
              </p>

              <div className="mt-6 flex items-center text-secondary text-label-md font-headline opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                Continue with this path <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ChoosePathPage
