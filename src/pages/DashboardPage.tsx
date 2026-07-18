import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { GlassCard } from '../components/ui/GlassCard'
import { PillButton } from '../components/ui/PillButton'

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="py-6 flex flex-col gap-10">
      {/* Welcome Banner */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-primary to-primary-container p-8 md:p-10 rounded-[2rem] text-white shadow-glass relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-secondary/20 to-transparent blur-xl pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <span className="text-xs font-headline font-bold uppercase tracking-widest text-on-primary-container bg-white/20 px-3 py-1 rounded-full">
            Student Portal
          </span>
          <h1 className="font-headline text-[32px] md:text-[40px] font-black leading-tight">
            Hello, {user?.name || 'Alex Mercer'}!
          </h1>
          <p className="text-body-md text-white/80 max-w-xl">
            Welcome to your global career portal. Ready to build skills and unlock international opportunities?
          </p>
        </div>

        <PillButton
          variant="primary"
          onClick={() => navigate('/my-learning')}
          className="z-10 shrink-0 !bg-gradient-to-r !from-[#ff6b6b] !to-[#ff8e53] !shadow-lg flex items-center gap-1.5"
        >
          View My Progress
          <span className="material-symbols-outlined text-[18px]">trending_up</span>
        </PillButton>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Path & Milestones (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Active Path Card */}
          <GlassCard hoverable={false} className="p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/20">
              <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary select-none">explore</span>
                Active Pathway
              </h2>
              <span className="text-xs bg-secondary/15 text-secondary border border-secondary/15 px-3 py-1 rounded-full font-bold">
                {user?.path || 'Global Career Path'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Onboarding & Profile Setup</span>
                <span className="font-bold text-primary">25% Completed</span>
              </div>
              {/* Custom Progress Bar */}
              <div className="w-full h-3 bg-white/40 border border-white/25 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-white/40 p-5 rounded-2xl border border-white/20 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-label-md text-primary font-bold">Next Milestone</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Set up your destination preferences and basic background criteria to receive personalized university matching.
                  </p>
                </div>
                <PillButton
                  variant="secondary"
                  className="w-full !py-2 text-xs mt-4"
                  onClick={() => navigate('/onboarding/path')}
                >
                  Continue Onboarding
                </PillButton>
              </div>

              <div className="bg-white/40 p-5 rounded-2xl border border-white/20 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-label-md text-primary font-bold">AI Course Recommendations</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Master Advanced Prompt Engineering & automation workflows, highly valued for global remote hires.
                  </p>
                </div>
                <PillButton
                  variant="secondary"
                  className="w-full !py-2 text-xs mt-4"
                  onClick={() => navigate('/academy')}
                >
                  Browse Academy
                </PillButton>
              </div>
            </div>
          </GlassCard>

          {/* Action Items / Notifications */}
          <GlassCard hoverable={false} className="p-8 flex flex-col gap-5">
            <h3 className="font-headline text-headline-md text-primary font-bold">
              Action Items & Advisories
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-4 p-4 bg-white/40 border border-white/20 rounded-2xl">
                <span className="material-symbols-outlined text-amber-500 mt-1 select-none">warning</span>
                <div>
                  <h4 className="text-label-md text-on-surface font-bold">English Language Benchmark Pending</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Your destination choices require an IELTS Academic score of 6.5+. Access our mock tests and prep booklets now.
                  </p>
                  <Link to="/tests" className="text-xs text-secondary hover:underline font-bold mt-2 inline-block">
                    Prepare for Exams
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/40 border border-white/20 rounded-2xl">
                <span className="material-symbols-outlined text-secondary mt-1 select-none">mail</span>
                <div>
                  <h4 className="text-label-md text-on-surface font-bold">Advising Checklist Complete</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Congratulations! Your basic profile and path details are configured. Tap the AI Counsellor widget in the bottom-right corner to map out customized actions.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Quick Actions & Counseling (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Quick Links */}
          <GlassCard hoverable={false} className="p-6 flex flex-col gap-4">
            <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
              Quick Navigation
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/destinations" className="flex items-center gap-3 text-sm text-on-surface bg-white/50 border border-white/50 px-4 py-3 rounded-xl hover:bg-white/80 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[20px] select-none">public</span>
                Study Destinations
              </Link>
              <Link to="/search" className="flex items-center gap-3 text-sm text-on-surface bg-white/50 border border-white/50 px-4 py-3 rounded-xl hover:bg-white/80 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[20px] select-none">search</span>
                Programs Search
              </Link>
              <Link to="/academy" className="flex items-center gap-3 text-sm text-on-surface bg-white/50 border border-white/50 px-4 py-3 rounded-xl hover:bg-white/80 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[20px] select-none">menu_book</span>
                Academy Courses
              </Link>
            </div>
          </GlassCard>

          {/* Counsellor Profile Card */}
          <GlassCard hoverable={false} className="p-6 flex flex-col gap-5 border border-white/40">
            <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
              Your Advisor
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center font-bold text-secondary font-headline">
                MC
              </div>
              <div>
                <h4 className="text-label-md text-on-surface font-bold">Marcus Cooper</h4>
                <p className="text-xs text-on-surface-variant">Senior Overseas Career Counsellor</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Have specific questions regarding scholarships, VISA documentation, or application portals? Book a customized 1-on-1 video call.
            </p>

            <PillButton
              variant="primary"
              className="w-full !py-2.5 text-xs !bg-gradient-to-r !from-[#ff6b6b] !to-[#ff8e53]"
            >
              Book 1-on-1 Call
            </PillButton>
          </GlassCard>
        </div>

      </section>
    </div>
  )
}
export default DashboardPage
