import React, { useState } from 'react'
import { useCourses } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassTabs } from '../components/ui/GlassTabs'
import { PillButton } from '../components/ui/PillButton'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export const AcademyPage: React.FC = () => {
  const { courses, loading } = useCourses()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Courses' },
    { id: 'ai-tech', label: 'AI & Tech' },
    { id: 'languages', label: 'Language' },
    { id: 'career-dev', label: 'Career Dev' },
    { id: 'study-abroad', label: 'Study Prep' },
  ]

  const filteredCourses = courses.filter((course) => {
    if (activeCategory === 'all') return true
    return course.category === activeCategory
  })

  const handleEnroll = (_courseId: string) => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/my-learning')
    }
  }

  return (
    <div className="py-6 flex flex-col gap-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-headline-lg text-primary font-bold mb-3">VIBE Academy Hub</h1>
        <p className="text-body-md text-on-surface-variant">
          Upskill with masterclasses led by global specialists and acquire credentials to land elite international opportunities.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center w-full">
        <GlassTabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <GlassCard key={course.id} hoverable={true} className="p-6 flex flex-col justify-between select-none h-full border border-white/40">
              
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                    {course.category === 'ai-tech' ? 'AI & Tech' : course.category === 'languages' ? 'Language' : course.category === 'career-dev' ? 'Career Dev' : 'Study Prep'}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-secondary font-bold">
                    <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {course.rating}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-headline text-[18px] md:text-[20px] font-bold text-primary leading-snug">
                    {course.title}
                  </h3>
                  <span className="text-xs text-on-surface-variant mt-1.5 block">
                    Instructor: <span className="font-bold text-primary">{course.instructor}</span>
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {course.description}
                </p>

                {/* Duration / Lessons info */}
                <div className="flex items-center gap-4 text-xs text-on-surface-variant border-t border-white/20 pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-outline">menu_book</span>
                    {course.lessons} Lessons
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <PillButton
                  variant={course.enrolled ? 'secondary' : 'primary'}
                  className="w-full !py-2.5 text-xs"
                  onClick={() => handleEnroll(course.id)}
                >
                  {course.enrolled && isAuthenticated ? 'Go to Classroom' : 'Enroll in Academy'}
                </PillButton>
              </div>

            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
export default AcademyPage
