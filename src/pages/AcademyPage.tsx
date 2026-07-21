import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Languages,
  Laptop,
  Map,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { useCourses } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassTabs } from '../components/ui/GlassTabs'
import { PillButton } from '../components/ui/PillButton'
import { useAuthStore } from '../store/authStore'

type AcademyDivisionId = 'study-abroad' | 'ai-tech' | 'languages' | 'career-dev' | 'overseas-success'

const categoryLabels: Record<string, string> = {
  'ai-tech': 'AI & Technology',
  languages: 'Language',
  'career-dev': 'Career Development',
  'study-abroad': 'Study Abroad',
  'overseas-success': 'Overseas Success',
}

const divisions: Array<{
  id: AcademyDivisionId
  label: string
  title: string
  description: string
  icon: React.ElementType
  tracks: string[]
}> = [
  {
    id: 'study-abroad',
    label: 'Study Abroad',
    title: 'Study Abroad Academy',
    description: 'Exam-focused coaching and Germany pathway support for students preparing for global admissions.',
    icon: Globe2,
    tracks: ['IELTS', 'PTE', 'TOEFL', 'GRE', 'GMAT', 'Duolingo English Test', 'German TestAS', 'APS Germany Guidance'],
  },
  {
    id: 'ai-tech',
    label: 'AI & Tech',
    title: 'AI & Technology Academy',
    description: 'Practical AI, productivity, design, analytics, and Python programmes for learners and working teams.',
    icon: Laptop,
    tracks: ['AI Tools', 'Prompt Engineering', 'AI for Business', 'AI for Students', 'Canva & AI Design', 'Microsoft Office with AI', 'Data Analytics', 'Python Fundamentals'],
  },
  {
    id: 'languages',
    label: 'Languages',
    title: 'Language Academy',
    description: 'Language fluency tracks for international education, workplace confidence, and client-facing careers.',
    icon: Languages,
    tracks: ['German', 'French', 'Japanese', 'Spoken English', 'Business English'],
  },
  {
    id: 'career-dev',
    label: 'Career Centre',
    title: 'Career Development Centre',
    description: 'Career documents, personal branding, communication, and interview readiness for global roles.',
    icon: BriefcaseBusiness,
    tracks: ['Resume Building', 'LinkedIn Branding', 'SOP & LOR Writing', 'Interview Skills', 'Communication Skills', 'Presentation Skills'],
  },
  {
    id: 'overseas-success',
    label: 'Overseas Success',
    title: 'Overseas Success Programme',
    description: 'End-to-end mentoring from counselling to visa readiness, internships, and pre-departure planning.',
    icon: Map,
    tracks: ['University Counselling', 'Scholarship Guidance', 'Visa Preparation', 'Internship Assistance', 'Career Planning', 'Pre-departure Orientation'],
  },
]

const audience = [
  'School students: Grades 9-12',
  'Degree students',
  'Engineering students',
  'Working professionals',
  'Nurses and healthcare professionals',
  'Job seekers',
  'Corporate clients',
]

const businessModel = [
  'Offline classroom training',
  'Live online classes',
  'Corporate training',
  'College partnerships',
  'Weekend workshops',
  'One-to-one mentoring',
  'Franchise centres',
]

const futureExpansion = [
  'AI Lab',
  'Language Testing Centre',
  'Corporate Training Division',
  'Government Skill Development Projects',
  'International Certification Centre',
]

export const AcademyPage: React.FC = () => {
  const { courses, loading } = useCourses()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeDivision, setActiveDivision] = useState<AcademyDivisionId>('study-abroad')

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'study-abroad', label: 'Study Abroad' },
    { id: 'ai-tech', label: 'AI & Tech' },
    { id: 'languages', label: 'Language' },
    { id: 'career-dev', label: 'Career' },
    { id: 'overseas-success', label: 'Overseas' },
  ]

  const activeDivisionData = divisions.find((division) => division.id === activeDivision) ?? divisions[0]

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

  const ActiveDivisionIcon = activeDivisionData.icon

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-14 max-w-container-max mx-auto">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/50 px-4 py-2 text-xs font-headline font-bold uppercase tracking-wider text-secondary">
            <Sparkles className="h-4 w-4" />
            AYXVIBE Academy
          </div>

          <div className="space-y-4">
            <h1 className="text-headline-lg md:text-display-lg text-primary font-bold">
              Empowering Skills. Enabling Global Careers.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              A unified academy for study abroad exams, AI skills, languages, career development, and overseas success mentoring.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <PillButton variant="primary" className="!px-6 !py-3" onClick={() => navigate('/onboarding/path')}>
              <span className="inline-flex items-center gap-2">
                Start Counselling <ArrowRight className="h-4 w-4" />
              </span>
            </PillButton>
            <PillButton variant="secondary" className="!px-6 !py-3" onClick={() => setActiveCategory('all')}>
              Explore Courses
            </PillButton>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { value: '5', label: 'Training divisions' },
            { value: '34+', label: 'Skill tracks' },
            { value: '7', label: 'Audience segments' },
            { value: '360', label: 'Career pathway support' },
          ].map((stat) => (
            <GlassCard key={stat.label} hoverable={false} className="p-5 border border-white/40">
              <div className="text-stats-xl text-secondary mb-2">{stat.value}</div>
              <div className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className="text-headline-md text-primary font-bold">Training Divisions</h2>
            <p className="text-body-md text-on-surface-variant mt-2 max-w-2xl">
              Each division can work as a standalone academy vertical or combine into a complete global career pathway.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {divisions.map((division) => {
              const Icon = division.icon
              const isActive = division.id === activeDivision

              return (
                <button
                  key={division.id}
                  onClick={() => setActiveDivision(division.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-headline font-bold transition-colors ${
                    isActive
                      ? 'border-secondary bg-secondary text-white'
                      : 'border-white/50 bg-white/50 text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {division.label}
                </button>
              )
            })}
          </div>
        </div>

        <GlassCard hoverable={false} className="p-6 md:p-8 border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <ActiveDivisionIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-headline-md text-primary font-bold">{activeDivisionData.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-2">{activeDivisionData.description}</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {activeDivisionData.tracks.map((track) => (
                <div
                  key={track}
                  className="flex items-center gap-3 rounded-lg border border-white/50 bg-white/45 px-4 py-3 text-sm font-headline font-semibold text-primary"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-tertiary" />
                  {track}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-headline-md text-primary font-bold">Academy Courses</h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Featured programmes shaped around the academy divisions.
            </p>
          </div>
          <div className="w-full overflow-x-auto pb-2 lg:w-auto">
            <GlassTabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <GlassCard key={course.id} hoverable={true} className="p-6 flex flex-col justify-between select-none h-full border border-white/40">
                <div className="space-y-4">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                      {categoryLabels[course.category] ?? 'Academy'}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-secondary font-bold">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      {course.rating}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline text-[18px] md:text-[20px] font-bold text-primary leading-snug">
                      {course.title}
                    </h3>
                    <span className="text-xs text-on-surface-variant mt-1.5 block">
                      Faculty: <span className="font-bold text-primary">{course.instructor}</span>
                    </span>
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-xs text-on-surface-variant border-t border-white/20 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-outline" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-outline" />
                      {course.lessons} Lessons
                    </div>
                  </div>
                </div>

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
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard hoverable={false} className="p-6 border border-white/40">
          <Users className="h-6 w-6 text-secondary mb-4" />
          <h2 className="text-headline-md text-primary font-bold mb-4">Target Audience</h2>
          <div className="space-y-3">
            {audience.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-tertiary" />
                {item}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hoverable={false} className="p-6 border border-white/40">
          <Building2 className="h-6 w-6 text-secondary mb-4" />
          <h2 className="text-headline-md text-primary font-bold mb-4">Business Model</h2>
          <div className="space-y-3">
            {businessModel.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-tertiary" />
                {item}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hoverable={false} className="p-6 border border-white/40">
          <Rocket className="h-6 w-6 text-secondary mb-4" />
          <h2 className="text-headline-md text-primary font-bold mb-4">Future Expansion</h2>
          <div className="space-y-3">
            {futureExpansion.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-tertiary" />
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="rounded-2xl bg-primary text-white px-6 py-8 md:px-10 md:py-10 shadow-glow-primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="text-xs font-headline font-bold uppercase tracking-wider text-tertiary-container mb-3">
              Vision
            </div>
            <p className="text-body-lg md:text-headline-md font-headline leading-relaxed">
              To become India's leading global career and skill development academy, empowering students and professionals with the knowledge, language proficiency, AI skills, and international opportunities needed to succeed worldwide.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <PillButton variant="secondary" className="!px-6 !py-3" onClick={() => navigate('/signup')}>
              Build My Pathway
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AcademyPage
