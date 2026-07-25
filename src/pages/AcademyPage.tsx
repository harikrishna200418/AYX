import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
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
  TrendingUp,
  Users,
  Video,
} from 'lucide-react'
import { useCourses } from '../hooks/useDataHooks'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassTabs } from '../components/ui/GlassTabs'
import { PillButton } from '../components/ui/PillButton'
import { CourseDetailModal } from '../components/ui/CourseDetailModal'
import { Course } from '../data/mockData'
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
  courseCount: number
  level: string
  duration: string
}> = [
  {
    id: 'study-abroad',
    label: 'Study Abroad',
    title: 'Study Abroad Academy',
    description: 'Exam-focused coaching and Germany pathway support for students preparing for global admissions.',
    icon: Globe2,
    tracks: ['IELTS', 'PTE', 'TOEFL', 'GRE', 'GMAT', 'Duolingo English Test', 'German TestAS', 'APS Germany Guidance'],
    courseCount: 8,
    level: 'Beginner to Advanced',
    duration: '140 hrs',
  },
  {
    id: 'ai-tech',
    label: 'AI & Tech',
    title: 'AI & Technology Academy',
    description: 'Practical AI, productivity, design, analytics, and Python programmes for learners and working teams.',
    icon: Laptop,
    tracks: ['AI Tools', 'Prompt Engineering', 'AI for Business', 'AI for Students', 'Canva & AI Design', 'Microsoft Office with AI', 'Data Analytics', 'Python Fundamentals'],
    courseCount: 8,
    level: 'Beginner to Advanced',
    duration: '120 hrs',
  },
  {
    id: 'languages',
    label: 'Languages',
    title: 'Language Academy',
    description: 'Language fluency tracks for international education, workplace confidence, and client-facing careers.',
    icon: Languages,
    tracks: ['German', 'French', 'Japanese', 'Spoken English', 'Business English'],
    courseCount: 5,
    level: 'Beginner to Advanced',
    duration: '100 hrs',
  },
  {
    id: 'career-dev',
    label: 'Career Centre',
    title: 'Career Development Centre',
    description: 'Career documents, personal branding, communication, and interview readiness for global roles.',
    icon: BriefcaseBusiness,
    tracks: ['Resume Building', 'LinkedIn Branding', 'SOP & LOR Writing', 'Interview Skills', 'Communication Skills', 'Presentation Skills'],
    courseCount: 6,
    level: 'Beginner to Advanced',
    duration: '60 hrs',
  },
  {
    id: 'overseas-success',
    label: 'Overseas Success',
    title: 'Overseas Success Programme',
    description: 'End-to-end mentoring from counselling to visa readiness, internships, and pre-departure planning.',
    icon: Map,
    tracks: ['University Counselling', 'Scholarship Guidance', 'Visa Preparation', 'Internship Assistance', 'Career Planning', 'Pre-departure Orientation'],
    courseCount: 6,
    level: 'Guided Mentoring',
    duration: 'Ongoing support',
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

const whyAcademy = [
  {
    icon: Building2,
    title: 'Industry-Aligned Curriculum',
    description: 'Every track is built around what universities and employers actually screen for — not generic theory.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Learn from faculty in real time, with room to ask, practice, and get corrected on the spot.',
  },
  {
    icon: TrendingUp,
    title: 'Career-Focused Outcomes',
    description: 'Every division ties back to an outcome — an admit, a score, a job, or a completed transition abroad.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Learning',
    description: 'AI tools and workflows are built into how you learn, not just what you learn about.',
  },
  {
    icon: Award,
    title: 'Recognized Certifications',
    description: 'Finish with credentials that hold weight with universities, recruiters, and visa officers alike.',
  },
  {
    icon: Globe2,
    title: 'Global Opportunities',
    description: 'From test prep to visa readiness, every track points toward a real international pathway.',
  },
]

export const AcademyPage: React.FC = () => {
  const { courses, loading } = useCourses()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeDivision, setActiveDivision] = useState<AcademyDivisionId>('study-abroad')
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenCourseDetails = (course: Course) => {
    setSelectedCourseModal(course)
    setIsModalOpen(true)
  }

  const handleOpenCourseById = (courseId: string) => {
    const found = courses.find((c) => c.id === courseId)
    if (found) {
      handleOpenCourseDetails(found)
    } else {
      handleEnroll(courseId)
    }
  }

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
      <section className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/50 px-4 py-2 text-xs font-headline font-bold uppercase tracking-wider text-secondary">
          <Sparkles className="h-4 w-4" />
          AYXVIBE Academy
        </div>

        <div className="space-y-3">
          <h1 className="text-headline-md md:text-headline-lg text-primary font-bold">
            Empowering Skills. Enabling Global Careers.
          </h1>
          <p className="text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
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
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-headline-md text-primary font-bold">Why AYXVIBE Academy</h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            Built for outcomes, not just attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyAcademy.map((item) => {
            const Icon = item.icon
            return (
              <GlassCard key={item.title} hoverable={false} className="p-6 border border-white/40">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-body-lg font-headline font-bold text-primary mb-1.5">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.description}</p>
              </GlassCard>
            )
          })}
        </div>
      </section>

      {/* FEATURED SPOTLIGHT SECTION (from Image 1) */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-headline-md text-primary font-bold">Featured Spotlight</h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            Flagship specialization tracks designed with leading global institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Featured Card */}
          <div className="lg:col-span-7 flex flex-col">
            <GlassCard hoverable={false} className="p-0 overflow-hidden flex flex-col justify-between h-full border border-white/40 shadow-glass rounded-2xl relative bg-white/40 backdrop-blur-xl">
              <div className="relative h-60 md:h-64 w-full overflow-hidden bg-slate-900">
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-headline font-extrabold uppercase tracking-wider text-white shadow-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  New Release
                </div>
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="AI Leadership & Global Strategy"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              </div>

              <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-headline font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                    <span>12 Weeks</span>
                    <span>•</span>
                    <span>Certified Expert</span>
                  </div>
                  <h3 className="font-headline text-headline-sm md:text-headline-md font-bold text-primary">
                    Prompt Engineering & AI Workflows
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Strategic implementation of generative AI, prompt engineering, and automated workflows for multinational organizations and cross-border startups.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Student" />
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Student" />
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" alt="Student" />
                    </div>
                    <span className="text-xs font-headline font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                      +4.2k enrolled
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenCourseById('prompt-eng')}
                    className="h-11 w-11 rounded-full bg-secondary text-white flex items-center justify-center shadow-md hover:bg-secondary/90 transition-all hover:scale-105"
                    title="View Syllabus & Enroll"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Two Smaller Highlight Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <GlassCard
              hoverable={true}
              onClick={() => handleOpenCourseById('german-a1')}
              className="p-5 border border-white/40 flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80"
                alt="Language Mastery"
                className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h3 className="font-headline text-body-lg font-bold text-primary group-hover:text-secondary transition-colors">
                  German Language & TestAS Readiness
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  Master professional German for global university admits, APS documentation, and workplace fluency.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  <span className="bg-secondary/10 text-secondary text-[11px] font-headline font-bold px-2.5 py-1 rounded-full">
                    8-Week Intensive
                  </span>
                  <span className="bg-white/60 border border-white/40 text-on-surface-variant text-[11px] font-headline font-bold px-2.5 py-1 rounded-full">
                    Level B2-C1
                  </span>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              hoverable={true}
              onClick={() => handleOpenCourseById('resume-mastery')}
              className="p-5 border border-white/40 flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80"
                alt="Career Development"
                className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h3 className="font-headline text-body-lg font-bold text-primary group-hover:text-secondary transition-colors">
                  Resume, LinkedIn & Interview Blueprint
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  Create ATS-friendly resumes, optimize LinkedIn branding, and master executive interview readiness.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  <span className="bg-secondary/10 text-secondary text-[11px] font-headline font-bold px-2.5 py-1 rounded-full">
                    Self-Paced
                  </span>
                  <span className="bg-white/60 border border-white/40 text-on-surface-variant text-[11px] font-headline font-bold px-2.5 py-1 rounded-full">
                    Beginner to Pro
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
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

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1.5 text-xs font-headline font-bold">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {activeDivisionData.courseCount} Courses
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary/10 text-tertiary px-3 py-1.5 text-xs font-headline font-bold">
                  <Target className="h-3.5 w-3.5" />
                  {activeDivisionData.level}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-white/50 text-on-surface-variant px-3 py-1.5 text-xs font-headline font-bold">
                  {activeDivisionData.duration}
                </span>
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

      {/* COURSE CATALOG CARD REDESIGN (from Image 2) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-headline-md text-primary font-bold">Featured Course Catalog</h2>
            <p className="text-body-md text-on-surface-variant mt-1">
              Skill up with our most popular professional programs.
            </p>
          </div>

          <button
            onClick={() => setActiveCategory('all')}
            className="inline-flex items-center gap-1.5 text-sm font-headline font-bold text-secondary hover:text-primary transition-colors self-start md:self-auto"
          >
            View All Courses <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="w-full overflow-x-auto pb-2">
          <GlassTabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
        </div>

        {loading ? (
          <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <GlassCard
                key={course.id}
                hoverable={true}
                onClick={() => handleOpenCourseDetails(course)}
                className="p-0 overflow-hidden flex flex-col justify-between h-full border border-white/40 select-none cursor-pointer group"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.imageUrl ?? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-primary font-headline text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      View Syllabus
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full inline-block">
                      {categoryLabels[course.category] ?? 'Academy'}
                    </span>

                    <h3 className="font-headline text-body-lg font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-primary">{course.rating}</span>
                      <span>({course.studentsCount ?? '2.4k'} students)</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <img
                        src={course.instructorAvatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover border border-white/40 shrink-0"
                      />
                      <span className="text-xs font-headline font-medium text-on-surface-variant truncate">
                        {course.instructor}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenCourseDetails(course)
                      }}
                      className="w-full py-2.5 px-4 rounded-full border border-secondary text-secondary font-headline text-xs font-bold hover:bg-secondary hover:text-white transition-all shadow-sm"
                    >
                      View Syllabus & Enroll
                    </button>
                  </div>
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

      {/* Course Detail Modal */}
      <CourseDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourseModal}
        onEnroll={handleEnroll}
        isAuthenticated={isAuthenticated}
      />
    </div>
  )
}

export default AcademyPage
