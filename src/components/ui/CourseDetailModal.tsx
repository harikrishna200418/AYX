import React, { useState } from 'react'
import {
  X,
  Sparkles,
  GraduationCap,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCheck,
  BookOpen,
  Award,
  ArrowRight,
} from 'lucide-react'
import { Course } from '../../data/mockData'
import { PillButton } from './PillButton'

interface CourseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
  onEnroll: (courseId: string) => void
  isAuthenticated: boolean
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  isOpen,
  onClose,
  course,
  onEnroll,
  isAuthenticated,
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null)

  if (!isOpen || !course) return null

  const toggleModule = (id: string) => {
    setExpandedModuleId((prev) => (prev === id ? null : id))
  }

  const categoryLabels: Record<string, string> = {
    'ai-tech': 'AI & Technology',
    languages: 'Language Academy',
    'career-dev': 'Career Development',
    'study-abroad': 'Study Abroad',
    'overseas-success': 'Overseas Success',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-surface/90 backdrop-blur-2xl border border-white/40 shadow-glass rounded-3xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-on-surface my-auto">
        {/* Header Hero Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 shrink-0 overflow-hidden">
          <img
            src={course.imageUrl ?? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/30 shadow-md"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Overlay Info */}
          <div className="absolute bottom-4 left-6 right-6 z-10 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-headline font-extrabold uppercase tracking-wider text-secondary bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                {categoryLabels[course.category] ?? 'Academy'}
              </span>
              {course.level && (
                <span className="text-[11px] font-headline font-bold text-white bg-white/20 border border-white/30 backdrop-blur-md px-3 py-1 rounded-full">
                  {course.level}
                </span>
              )}
            </div>

            <h2 className="text-headline-sm sm:text-headline-md font-headline font-bold text-white leading-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/50 border border-white/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 fill-amber-500" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-medium">Rating</div>
                <div className="font-headline font-bold text-primary text-sm">{course.rating} / 5.0</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/50 border border-white/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-medium">Duration</div>
                <div className="font-headline font-bold text-primary text-sm">{course.duration}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/50 border border-white/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-medium">Lessons</div>
                <div className="font-headline font-bold text-primary text-sm">{course.lessons} Modules</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/50 border border-white/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-medium">Enrolled</div>
                <div className="font-headline font-bold text-primary text-sm">{course.studentsCount ?? '2.4k'} Students</div>
              </div>
            </div>
          </div>

          {/* Description & Instructor */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-3">
              <h3 className="font-headline text-body-lg font-bold text-primary">About this Course</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="md:col-span-4 p-4 rounded-2xl bg-white/60 border border-white/50 space-y-3">
              <div className="text-xs font-headline font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <UserCheck className="h-4 w-4" /> Lead Instructor
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                  alt={course.instructor}
                  className="h-12 w-12 rounded-full object-cover border border-white shadow-sm"
                />
                <div>
                  <div className="font-headline font-bold text-primary text-sm">{course.instructor}</div>
                  <div className="text-xs text-on-surface-variant">{course.instructorTitle ?? 'Faculty Mentor'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* What You Will Learn / Outcomes */}
          {course.outcomes && course.outcomes.length > 0 && (
            <div className="space-y-3 p-5 rounded-2xl bg-secondary/5 border border-secondary/15">
              <h3 className="font-headline text-body-lg font-bold text-primary flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" /> Learning Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-on-surface font-headline font-medium">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus & Curriculum Breakdown */}
          {course.modules && course.modules.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-body-lg font-bold text-primary">Syllabus Breakdown</h3>
                <span className="text-xs font-headline text-on-surface-variant font-medium">
                  {course.modules.length} Detailed Modules
                </span>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod, index) => {
                  const isExpanded = expandedModuleId === mod.id || (expandedModuleId === null && index === 0)

                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/60 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-headline font-bold text-secondary">{mod.duration}</span>
                          <h4 className="font-headline text-sm font-bold text-primary">{mod.title}</h4>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-on-surface-variant shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-on-surface-variant shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/30 space-y-2 bg-white/20">
                          <div className="text-[11px] font-headline font-bold text-on-surface-variant uppercase tracking-wider">
                            Key Topics Covered:
                          </div>
                          <ul className="space-y-1.5 text-xs text-on-surface-variant">
                            {mod.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Prerequisites & Requirements
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((req, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-headline font-medium text-on-surface-variant bg-white/60 border border-white/50 px-3 py-1.5 rounded-full"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-6 bg-white/70 border-t border-white/40 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-on-surface-variant font-medium">Programme Status</div>
            <div className="font-headline font-bold text-primary text-sm">
              {course.enrolled && isAuthenticated ? 'Already Enrolled' : 'Open for Immediate Enrollment'}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-outline/30 text-on-surface-variant font-headline text-xs font-bold hover:bg-black/5 transition-all"
            >
              Close
            </button>
            <PillButton
              variant="primary"
              className="w-1/2 sm:w-auto !px-6 !py-2.5 text-xs font-bold"
              onClick={() => {
                onClose()
                onEnroll(course.id)
              }}
            >
              <span className="inline-flex items-center gap-2">
                {course.enrolled && isAuthenticated ? 'Go to Classroom' : 'Enroll Now'}
                <ArrowRight className="h-4 w-4" />
              </span>
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailModal
