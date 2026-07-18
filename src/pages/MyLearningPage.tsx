import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourses } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { PillButton } from '../components/ui/PillButton'

export const MyLearningPage: React.FC = () => {
  const { courses, loading } = useCourses()
  const navigate = useNavigate()

  // Filter enrolled courses
  const enrolledCourses = courses.filter((c) => c.enrolled)

  // Mocks history for the trend charts
  const mockTestScores = [
    { date: 'June 10', score: 6.0, target: 7.0 },
    { date: 'June 20', score: 6.5, target: 7.0 },
    { date: 'June 30', score: 6.5, target: 7.0 },
    { date: 'July 10', score: 7.0, target: 7.0 },
  ]

  return (
    <div className="py-6 flex flex-col gap-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-headline-lg text-primary font-bold mb-3">My Learning Journey</h1>
        <p className="text-body-md text-on-surface-variant">
          Track your course masterclasses, exam preparation mock trends, and global transitions checklist.
        </p>
      </div>

      {/* Stats Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverable={false} className="p-6 text-center">
          <div className="text-stats-xl text-secondary mb-2">{enrolledCourses.length}</div>
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Enrolled Courses</div>
        </GlassCard>
        
        <GlassCard hoverable={false} className="p-6 text-center">
          <div className="text-stats-xl text-secondary mb-2">7.0</div>
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Latest Mock Band</div>
        </GlassCard>

        <GlassCard hoverable={false} className="p-6 text-center">
          <div className="text-stats-xl text-secondary mb-2">1/4</div>
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider">Steps Completed</div>
        </GlassCard>
      </section>

      {/* Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Classrooms (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary select-none">school</span>
            Active Classrooms
          </h2>

          {loading ? (
            <div className="text-on-surface-variant">Loading learning path...</div>
          ) : enrolledCourses.length === 0 ? (
            <GlassCard hoverable={false} className="p-8 text-center border border-white/40">
              <p className="text-body-md text-on-surface-variant mb-4">You have not enrolled in any courses yet.</p>
              <PillButton variant="primary" onClick={() => navigate('/academy')}>
                Explore Academy
              </PillButton>
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-5">
              {enrolledCourses.map((course) => (
                <GlassCard key={course.id} hoverable={true} className="p-6 flex flex-col gap-4 border border-white/40 select-none">
                  
                  {/* Category & Status */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                      {course.category === 'ai-tech' ? 'AI & Tech' : course.category === 'languages' ? 'Language' : course.category === 'career-dev' ? 'Career Dev' : 'Study Prep'}
                    </span>
                    
                    <span className={`font-bold font-headline ${course.progress === 100 ? 'text-green-600' : 'text-secondary'}`}>
                      {course.progress === 100 ? 'Completed' : `${course.progress}% Complete`}
                    </span>
                  </div>

                  {/* Title & Instructor */}
                  <div>
                    <h3 className="font-headline text-[18px] md:text-[20px] font-bold text-primary">
                      {course.title}
                    </h3>
                    <span className="text-xs text-on-surface-variant mt-1.5 block">
                      Instructor: <span className="font-bold text-primary">{course.instructor}</span>
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="w-full h-2.5 bg-white/40 border border-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                    <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                      {course.duration} ({course.lessons} lessons)
                    </span>
                    
                    <PillButton
                      variant={course.progress === 100 ? 'secondary' : 'primary'}
                      className="!py-2 !px-5 !text-xs shrink-0"
                    >
                      {course.progress === 100 ? 'Review Materials' : 'Resume Learning'}
                    </PillButton>
                  </div>

                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Mock Exam Trends & Charts (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h2 className="text-headline-md text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary select-none">monitoring</span>
            Test Prep Trends
          </h2>

          <GlassCard hoverable={false} className="p-6 flex flex-col gap-6 border border-white/40">
            <div>
              <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
                IELTS Academic Mock Scores
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1">
                Visualizing your latest band achievements against target.
              </p>
            </div>

            {/* Custom Premium Chart using CSS Flex and SVGs */}
            <div className="h-48 flex items-end justify-between px-2 pt-6 border-b border-white/30 relative">
              {/* Target Line overlay */}
              <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-error/50 z-0">
                <span className="absolute right-0 -top-3 text-[10px] font-bold text-error bg-[#eceef0] px-1 rounded">
                  Target (7.0)
                </span>
              </div>

              {mockTestScores.map((score, index) => {
                // Percentage based on a max scale of 9.0
                const scorePercent = (score.score / 9.0) * 100
                return (
                  <div key={index} className="flex flex-col items-center gap-2 z-10 w-1/4">
                    <span className="text-xs font-bold text-primary bg-white/80 border border-white/80 px-1.5 py-0.5 rounded shadow-sm">
                      {score.score}
                    </span>
                    {/* Bar */}
                    <div
                      className="w-8 bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-700"
                      style={{ height: `${scorePercent * 0.9}px` }}
                    />
                    <span className="text-[10px] text-on-surface-variant font-headline whitespace-nowrap">
                      {score.date}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs bg-white/40 border border-white/20 p-3 rounded-xl">
                <span className="material-symbols-outlined text-green-600 select-none">check_circle</span>
                <span>You hit your target score of 7.0 on July 10!</span>
              </div>
              
              <PillButton
                variant="secondary"
                className="w-full !py-2.5 text-xs"
                onClick={() => navigate('/tests')}
              >
                Access More Tests
              </PillButton>
            </div>

          </GlassCard>
        </div>

      </section>
    </div>
  )
}
export default MyLearningPage
