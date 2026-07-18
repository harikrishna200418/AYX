import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LiquidBackground } from '../components/ui/LiquidBackground'
import { PillButton } from '../components/ui/PillButton'
import { GlassCard } from '../components/ui/GlassCard'

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <LiquidBackground>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
          <h1 className="text-display-lg text-primary mb-6 max-w-4xl mx-auto leading-tight">
            Empowering Skills.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container">
              Enabling Global Careers.
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Your journey to global success starts here. We provide the tools, network, and guidance to transition your career across borders seamlessly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-3xl mx-auto">
            <PillButton
              variant="secondary"
              onClick={() => navigate('/destinations')}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 0" }}>public</span>
              Explore Countries
            </PillButton>
            <PillButton
              variant="secondary"
              onClick={() => navigate('/academy')}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 0" }}>menu_book</span>
              Browse Courses
            </PillButton>
            <PillButton
              variant="secondary"
              onClick={() => navigate('/search')}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 0" }}>psychology</span>
              Programs Search
            </PillButton>
            <PillButton
              variant="primary"
              onClick={() => navigate('/onboarding/path')}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
              Book Free Counselling
            </PillButton>
          </div>

          {/* Trust Bar / Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <GlassCard hoverable={false} className="p-6 text-center">
              <div className="text-stats-xl text-secondary mb-2">22+</div>
              <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Countries</div>
            </GlassCard>
            <GlassCard hoverable={false} className="p-6 text-center">
              <div className="text-stats-xl text-secondary mb-2">1000+</div>
              <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Partners</div>
            </GlassCard>
            <GlassCard hoverable={false} className="p-6 text-center">
              <div className="text-stats-xl text-secondary mb-2">50K+</div>
              <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Students</div>
            </GlassCard>
            <GlassCard hoverable={false} className="p-6 text-center">
              <div className="text-stats-xl text-secondary mb-2">98%</div>
              <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Visa Success</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Training Divisions */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white/20 backdrop-blur-md border-y border-white/10 relative">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg text-primary mb-4 font-bold">Comprehensive Pathways</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Tailored programs designed to equip you with the skills demanded by global markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <GlassCard
              onClick={() => navigate('/destinations')}
              className="p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
              </div>
              <h3 className="text-headline-md text-on-surface mb-3 font-semibold">Study Abroad</h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                Navigate international education opportunities with expert guidance.
              </p>
            </GlassCard>

            <GlassCard
              onClick={() => navigate('/academy')}
              className="p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
              </div>
              <h3 className="text-headline-md text-on-surface mb-3 font-semibold">AI & Tech</h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                Master future-proof technical skills in our advanced academies.
              </p>
            </GlassCard>

            <GlassCard
              onClick={() => navigate('/academy')}
              className="p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>translate</span>
              </div>
              <h3 className="text-headline-md text-on-surface mb-3 font-semibold">Language</h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                Achieve fluency and cultural competence for global integration.
              </p>
            </GlassCard>

            <GlassCard
              onClick={() => navigate('/academy')}
              className="p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              </div>
              <h3 className="text-headline-md text-on-surface mb-3 font-semibold">Career Dev</h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                Build a resilient professional profile and leadership skills.
              </p>
            </GlassCard>

            <GlassCard
              onClick={() => navigate('/onboarding/path')}
              className="p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="text-headline-md text-on-surface mb-3 font-semibold">Overseas Success</h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                End-to-end support for settling and thriving in your new country.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </LiquidBackground>
  )
}
export default WelcomePage
