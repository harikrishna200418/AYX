import React from 'react'
import { useTests } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { PillButton } from '../components/ui/PillButton'

export const TestsPage: React.FC = () => {
  const { tests, loading } = useTests()

  return (
    <div className="py-6 flex flex-col gap-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-headline-lg text-primary font-bold mb-3">Test Preparation Directory</h1>
        <p className="text-body-md text-on-surface-variant">
          Excel in your academic and professional English language benchmarks. Access curated study resources and structure guides.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading tests...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {tests.map((test) => (
            <GlassCard key={test.id} hoverable={true} className="p-8 flex flex-col gap-6 select-none h-full border border-white/40 justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-secondary/15 rounded-2xl flex items-center justify-center text-secondary border border-secondary/10">
                    <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <span className="text-[10px] bg-gradient-to-r from-error to-[#ff8988] text-white px-2 py-0.5 rounded-full font-headline font-bold">
                    Official Exam
                  </span>
                </div>
                
                {/* Titles */}
                <div>
                  <h3 className="font-headline text-[24px] font-black text-primary leading-tight">
                    {test.name}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mt-1 leading-snug">
                    {test.fullName}
                  </span>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {test.description}
                </p>

                {/* Details Table */}
                <div className="bg-white/40 p-4 rounded-xl border border-white/30 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Exam Format:</span>
                    <span className="font-semibold text-primary">{test.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Duration:</span>
                    <span className="font-semibold text-primary">{test.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Score Range:</span>
                    <span className="font-semibold text-primary">{test.scoreRange}</span>
                  </div>
                </div>

                {/* Exam Sections */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-headline block">
                    Core Sections
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {test.sections.map((sec, idx) => (
                      <span key={idx} className="text-xs bg-white/60 border border-white/60 text-on-surface px-2.5 py-1 rounded-full">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prep Materials */}
              <div className="border-t border-white/20 pt-6 mt-6 space-y-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-headline block">
                  Free Prep Materials
                </span>
                
                <div className="flex flex-col gap-2">
                  {test.resources.map((res, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/40 border border-white/20 hover:bg-white/60 transition-colors">
                      <div className="flex items-center gap-2 truncate">
                        <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">
                          {res.type === 'guide' ? 'menu_book' : res.type === 'video' ? 'play_circle' : 'assignment'}
                        </span>
                        <span className="font-medium text-primary truncate">{res.title}</span>
                      </div>
                      <span className="material-symbols-outlined text-outline hover:text-secondary cursor-pointer text-[16px] shrink-0">
                        download
                      </span>
                    </div>
                  ))}
                </div>

                <PillButton variant="primary" className="w-full !py-2.5 text-xs mt-2">
                  Book Free Mock Exam
                </PillButton>
              </div>

            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
export default TestsPage
