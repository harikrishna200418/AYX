import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDestination } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { PillButton } from '../components/ui/PillButton'
import { GlassTabs } from '../components/ui/GlassTabs'

export const CountryDetailsPage: React.FC = () => {
  const { country } = useParams<{ country: string }>()
  const navigate = useNavigate()
  const { destination, loading } = useDestination(country)
  const [activeSection, setActiveSection] = useState('about')

  if (loading) {
    return <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading destination details...</div>
  }

  if (!destination) {
    return (
      <div className="text-center py-20 max-w-md mx-auto px-margin-mobile">
        <span className="material-symbols-outlined text-error text-5xl mb-4">error</span>
        <h2 className="text-headline-md text-primary font-bold mb-2">Destination Not Found</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          We could not find the study destination you are looking for.
        </p>
        <PillButton variant="secondary" onClick={() => navigate('/destinations')}>
          Back to Destinations
        </PillButton>
      </div>
    )
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'universities', label: 'Top Universities' },
    { id: 'intakes', label: 'Intakes' },
    { id: 'requirements', label: 'Requirements' },
  ]

  return (
    <div className="flex flex-col gap-12 py-6">
      {/* Hero Section */}
      <section className="glass-panel rounded-3xl overflow-hidden relative flex flex-col md:flex-row min-h-[50vh] border border-white/40 shadow-glass">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center gap-6 z-10 relative">
          <div className="flex items-center gap-4">
            <span className="text-4xl shadow-sm rounded-full bg-white/20 p-2 border border-white/30 flex items-center justify-center select-none">
              {destination.flag}
            </span>
            <span className="text-label-md text-secondary font-headline font-bold uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full backdrop-blur-md">
              Study Destination
            </span>
          </div>
          
          <h1 className="text-display-lg text-primary tracking-tight font-black">{destination.name}</h1>
          <p className="text-body-lg text-on-surface-variant max-w-md">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <PillButton variant="primary" className="flex items-center gap-2" onClick={() => navigate('/onboarding/path')}>
              Apply Now
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </PillButton>
            <PillButton variant="secondary" className="flex items-center gap-2">
              Download Guide
              <span className="material-symbols-outlined text-sm">download</span>
            </PillButton>
          </div>

          <div className="flex gap-8 mt-6 border-t border-white/20 pt-6">
            <div>
              <div className="text-stats-xl text-primary font-extrabold">{destination.id === 'united-kingdom' ? '150+' : '200+'}</div>
              <div className="text-label-md text-on-surface-variant mt-1">Universities</div>
            </div>
            <div>
              <div className="text-stats-xl text-primary font-extrabold">{destination.id === 'germany' ? '1.5yr' : '2-3yr'}</div>
              <div className="text-label-md text-on-surface-variant mt-1">Post-Study Work</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 absolute md:relative inset-0 md:inset-auto h-full z-0 opacity-20 md:opacity-100">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover md:rounded-l-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:hidden"></div>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="flex justify-center w-full sticky top-[76px] z-20 py-2">
        <GlassTabs tabs={tabs} activeTab={activeSection} onChange={setActiveSection} />
      </div>

      {/* Bento Details Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left / Main Details Column */}
        <div className="md:col-span-8 flex flex-col gap-8">
          
          {/* About Section */}
          {activeSection === 'about' && (
            <GlassCard hoverable={false} className="p-8 md:p-10 flex flex-col gap-6">
              <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary select-none">info</span>
                Why Study in {destination.name}?
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                {destination.fullDescription}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/40 rounded-xl p-4 flex items-start gap-3 border border-white/20">
                  <span className="material-symbols-outlined text-tertiary-container mt-1 select-none">history_edu</span>
                  <div>
                    <h4 className="text-label-md text-on-surface font-bold">Academic Prestige</h4>
                    <p className="text-sm text-on-surface-variant mt-1">Gain a degree respected by global employers.</p>
                  </div>
                </div>
                <div className="bg-white/40 rounded-xl p-4 flex items-start gap-3 border border-white/20">
                  <span className="material-symbols-outlined text-secondary-container mt-1 select-none">trending_up</span>
                  <div>
                    <h4 className="text-label-md text-on-surface font-bold">High Employment</h4>
                    <p className="text-sm text-on-surface-variant mt-1">Excellent post-graduation visa career pathways.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Universities Section */}
          {activeSection === 'universities' && (
            <GlassCard hoverable={false} className="p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary select-none">school</span>
                  Top Partner Universities
                </h2>
              </div>
              
              {destination.universities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {destination.universities.map((uni) => (
                    <div key={uni.id} className="bg-white/50 border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                        {uni.ranking}
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-label-md text-primary text-lg font-bold mb-1">
                          {uni.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          {uni.location}
                        </p>
                      </div>

                      <div className="space-y-2 border-t border-white/40 pt-4 mt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">Avg. Tuition:</span>
                          <span className="font-semibold text-primary">{uni.tuitionFee}</span>
                        </div>
                        <div className="text-sm mt-2">
                          <span className="text-on-surface-variant font-bold block mb-1">Popular programs:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {uni.popularPrograms.map((p, i) => (
                              <span key={i} className="text-[11px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-on-surface-variant">
                  We have direct placement links with all public and private universities in {destination.name}. Book counselling to get a tailored list.
                </div>
              )}
            </GlassCard>
          )}

          {/* Intakes Section */}
          {activeSection === 'intakes' && (
            <GlassCard hoverable={false} className="p-8 flex flex-col gap-6">
              <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary select-none">calendar_month</span>
                Key Application Intakes
              </h2>
              
              <div className="relative pl-6 border-l-2 border-primary/20 space-y-8 mt-4 ml-3">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-primary w-4 h-4 rounded-full border-4 border-white shadow-sm" />
                  <h4 className="text-label-md text-primary font-bold">Autumn Intake (September / October)</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Primary intake for most universities. Widest range of courses, programs, and scholarship opportunities available. Applications close in January-June.
                  </p>
                  <span className="inline-block mt-2 text-xs bg-gradient-to-r from-error to-on-tertiary-container text-white px-2 py-1 rounded-md font-semibold">
                    Major Intake
                  </span>
                </div>
                
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-[#c5c5d3] w-4 h-4 rounded-full border-4 border-white" />
                  <h4 className="text-label-md text-on-surface font-bold">Spring Intake (January / February)</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Secondary intake. Good for students seeking flexible start timelines or who missed Autumn applications.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-[#c5c5d3] w-4 h-4 rounded-full border-4 border-white" />
                  <h4 className="text-label-md text-on-surface font-bold">Summer Intake (April / May)</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Limited intake. Primarily foundation pathways, English language prep, or specific executive modules.
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Requirements Section */}
          {activeSection === 'requirements' && (
            <GlassCard hoverable={false} className="p-8 flex flex-col gap-6">
              <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary select-none">fact_check</span>
                Eligibility & Core Requirements
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/40 p-5 rounded-2xl border border-white/20">
                  <h3 className="font-headline text-label-md text-primary font-bold mb-2">English Proficiency</h3>
                  <p className="text-sm text-on-surface-variant">
                    IELTS score of {destination.ieltsRequirement} is required. Alternatively, TOEFL iBT or PTE Academic equivalents are accepted.
                  </p>
                </div>
                <div className="bg-white/40 p-5 rounded-2xl border border-white/20">
                  <h3 className="font-headline text-label-md text-primary font-bold mb-2">Financial Proof</h3>
                  <p className="text-sm text-on-surface-variant">
                    You must show proof of funds to cover first year tuition fees plus a monthly living budget of approximately {destination.costOfLiving}.
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

        </div>

        {/* Right / Quick Info Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Quick Metrics */}
          <GlassCard hoverable={false} className="p-6 flex flex-col gap-5">
            <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
              At A Glance
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/25 text-sm">
                <span className="text-on-surface-variant">Visa Success Rate</span>
                <span className="font-bold text-secondary">{destination.visaSuccess}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/25 text-sm">
                <span className="text-on-surface-variant">IELTS Target</span>
                <span className="font-bold text-secondary">{destination.ieltsRequirement}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/25 text-sm">
                <span className="text-on-surface-variant">Est. Cost of Living</span>
                <span className="font-bold text-secondary">{destination.costOfLiving}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Work Permit Duration</span>
                <span className="font-bold text-secondary">{destination.id === 'germany' ? '18 months' : '24-36 months'}</span>
              </div>
            </div>
          </GlassCard>

          {/* High Demand Sectors */}
          <GlassCard hoverable={false} className="p-6 flex flex-col gap-4">
            <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
              High Demand Sectors
            </h3>
            
            <div className="flex flex-col gap-2">
              {destination.demandSectors.map((sector, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-on-surface bg-white/50 border border-white/50 px-3 py-2 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {sector}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Free Counselling Call To Action */}
          <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-3xl flex flex-col gap-4 shadow-glass">
            <h3 className="font-headline text-label-md font-bold uppercase tracking-wider text-on-primary-container">
              Ready to apply?
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Book a session with our country-specific advisors. We assist with applications, statement of purpose, and visa documentation.
            </p>
            <PillButton
              variant="primary"
              onClick={() => navigate('/onboarding/path')}
              className="w-full !py-2.5 !px-4 text-xs !bg-gradient-to-r !from-[#ff6b6b] !to-[#ff8e53]"
            >
              Get Free Counselling
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  )
}
export default CountryDetailsPage
