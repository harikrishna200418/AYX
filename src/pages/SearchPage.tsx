import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassInput } from '../components/ui/GlassInput'
import { PillButton } from '../components/ui/PillButton'
import { GlassSelect } from '../components/ui/GlassSelect'
import { CourseSelectionModal } from '../components/ui/CourseSelectionModal'

interface Program {
  id: string
  title: string
  university: string
  country: string
  countryId: string
  level: 'bachelor' | 'master' | 'doctorate'
  field: string
  courses?: string[]
  tuition: string
  duration: string
  ielts: string
}

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'united-states', label: 'United States of America' },
  { value: 'australia', label: 'Australia' },
  { value: 'canada', label: 'Canada' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'new-zealand', label: 'New Zealand' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'austria', label: 'Austria' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'finland', label: 'Finland' },
  { value: 'italy', label: 'Italy' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'spain', label: 'Spain' },
  { value: 'lithuania', label: 'Lithuania' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'poland', label: 'Poland' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'mauritius', label: 'Mauritius' },
  { value: 'china', label: 'China' },
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'malta', label: 'Malta' },
  { value: 'japan', label: 'Japan' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'russia', label: 'Russia' },
  { value: 'south-korea', label: 'South Korea' },
  { value: 'india', label: 'India' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'monaco', label: 'Monaco' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'kazakhstan', label: 'Kazakhstan' },
  { value: 'saudi-arabia', label: 'Saudi Arabia' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'sri-lanka', label: 'Sri Lanka' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'luxembourg', label: 'Luxembourg' },
  { value: 'greece', label: 'Greece' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'slovenia', label: 'Slovenia' },
]

const levelOptions = [
  { value: '', label: 'All Levels' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'doctorate', label: 'Doctorate' },
]

const fieldOptions = [
  { value: '', label: 'All Fields' },
  { value: 'cs-it', label: 'Computer Science & IT' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'business', label: 'Business & Management' },
  { value: 'health', label: 'Health & Medical Sciences' },
  { value: 'science', label: 'Science' },
  { value: 'arts', label: 'Arts, Design & Architecture' },
  { value: 'law', label: 'Law' },
  { value: 'social', label: 'Social Sciences' },
  { value: 'education', label: 'Education' },
  { value: 'agriculture', label: 'Agriculture & Environment' },
  { value: 'media', label: 'Media & Communication' },
  { value: 'aviation', label: 'Aviation & Maritime' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'emerging', label: 'Emerging & Specialized Programs' },
]

export const FIELD_COURSES: Record<string, string[]> = {
  'cs-it': [
    'Computer Science', 'Software Engineering', 'Information Technology (IT)',
    'Artificial Intelligence (AI)', 'Machine Learning', 'Data Science',
    'Data Analytics', 'Cyber Security', 'Cloud Computing',
    'Information Systems', 'Blockchain Technology', 'Internet of Things (IoT)',
    'Game Development', 'Web Development', 'Mobile Application Development',
    'Computer Engineering', 'Human-Computer Interaction (HCI)', 'Digital Forensics'
  ],
  'engineering': [
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics Engineering', 'Chemical Engineering', 'Aerospace Engineering',
    'Aeronautical Engineering', 'Automotive Engineering', 'Robotics Engineering',
    'Biomedical Engineering', 'Environmental Engineering', 'Petroleum Engineering',
    'Mining Engineering', 'Marine Engineering', 'Industrial Engineering',
    'Manufacturing Engineering', 'Structural Engineering', 'Mechatronics Engineering',
    'Agricultural Engineering', 'Materials Engineering', 'Nuclear Engineering'
  ],
  'business': [
    'Business Administration', 'Master of Business Administration (MBA)',
    'International Business', 'Finance', 'Accounting', 'Marketing',
    'Human Resource Management (HRM)', 'Business Analytics',
    'Supply Chain Management', 'Operations Management', 'Project Management',
    'Entrepreneurship', 'Economics', 'Banking', 'Investment Management',
    'Hospitality Management', 'Tourism Management', 'Retail Management',
    'Digital Marketing'
  ],
  'health': [
    'Medicine (MBBS/MD)', 'Nursing', 'Dentistry', 'Pharmacy',
    'Physiotherapy', 'Occupational Therapy', 'Public Health',
    'Biomedical Science', 'Medical Laboratory Science', 'Radiography',
    'Nutrition and Dietetics', 'Optometry', 'Veterinary Medicine',
    'Speech Therapy', 'Healthcare Management'
  ],
  'science': [
    'Physics', 'Chemistry', 'Biology', 'Biotechnology', 'Biochemistry',
    'Microbiology', 'Genetics', 'Environmental Science', 'Mathematics',
    'Statistics', 'Geology', 'Astronomy', 'Marine Science', 'Forensic Science'
  ],
  'arts': [
    'Architecture', 'Interior Design', 'Urban Planning', 'Graphic Design',
    'Fashion Design', 'Product Design', 'Industrial Design', 'Animation',
    'Multimedia Design', 'Fine Arts', 'Visual Arts', 'Film Production',
    'Photography', 'Music', 'Performing Arts'
  ],
  'law': [
    'Law (LLB)', 'International Law', 'Corporate Law', 'Criminal Law',
    'Intellectual Property Law', 'Human Rights Law', 'Environmental Law',
    'Tax Law'
  ],
  'social': [
    'Psychology', 'Sociology', 'Political Science', 'International Relations',
    'Public Administration', 'Anthropology', 'Social Work', 'Criminology',
    'Gender Studies'
  ],
  'education': [
    'Education', 'Early Childhood Education', 'Primary Education',
    'Secondary Education', 'Special Education', 'Educational Leadership',
    'TESOL / TEFL', 'Curriculum and Instruction'
  ],
  'agriculture': [
    'Agriculture', 'Agribusiness', 'Horticulture', 'Forestry',
    'Fisheries', 'Animal Science', 'Food Science', 'Sustainable Agriculture'
  ],
  'media': [
    'Journalism', 'Mass Communication', 'Public Relations', 'Advertising',
    'Media Studies', 'Digital Media', 'Broadcasting', 'Communication Studies'
  ],
  'aviation': [
    'Aviation Management', 'Aeronautical Engineering', 'Pilot Training',
    'Air Traffic Management', 'Maritime Studies', 'Nautical Science',
    'Shipping & Logistics'
  ],
  'hospitality': [
    'Hotel Management', 'Hospitality Management', 'Tourism Management',
    'Event Management', 'Culinary Arts'
  ],
  'emerging': [
    'Artificial Intelligence', 'Machine Learning', 'Quantum Computing',
    'Renewable Energy', 'Sustainable Development', 'Climate Science',
    'Bioinformatics', 'Nanotechnology', 'Financial Technology (FinTech)',
    'Health Informatics', 'Sports Management', 'Sports Science',
    'Actuarial Science', 'Real Estate Management', 'Logistics and Supply Chain',
    'E-commerce', 'UX/UI Design'
  ]
}

const levelColors: Record<string, string> = {
  bachelor: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
  master: 'bg-secondary/10 text-secondary border border-secondary/20',
  doctorate: 'bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/20',
}

export const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Modal State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [activeModalField, setActiveModalField] = useState('')

  const programs: Program[] = [
    {
      id: 'oxford-ds-ai',
      title: 'MSc in Data Science and Artificial Intelligence',
      university: 'University of Oxford',
      country: 'United Kingdom',
      countryId: 'united-kingdom',
      level: 'master',
      field: 'cs-it',
      courses: ['Data Science', 'Artificial Intelligence (AI)'],
      tuition: '£36,000 / year',
      duration: '12 Months',
      ielts: '7.5',
    },
    {
      id: 'cambridge-ml',
      title: 'MPhil in Machine Learning and Machine Intelligence',
      university: 'University of Cambridge',
      country: 'United Kingdom',
      countryId: 'united-kingdom',
      level: 'master',
      field: 'cs-it',
      courses: ['Machine Learning'],
      tuition: '£38,500 / year',
      duration: '11 Months',
      ielts: '7.5',
    },
    {
      id: 'mit-eecs',
      title: 'MSc in Electrical Engineering and Computer Science',
      university: 'Massachusetts Institute of Technology',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'engineering',
      courses: ['Computer Engineering', 'Computer Science'],
      tuition: '$58,240 / year',
      duration: '2 Years',
      ielts: '7.0',
    },
    {
      id: 'stanford-cs',
      title: 'MS in Computer Science (Artificial Intelligence specialization)',
      university: 'Stanford University',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'cs-it',
      courses: ['Computer Science', 'Artificial Intelligence (AI)'],
      tuition: '$57,400 / year',
      duration: '2 Years',
      ielts: '7.0',
    },
    {
      id: 'oxford-mba',
      title: 'Oxford Master of Business Administration (MBA)',
      university: 'University of Oxford',
      country: 'United Kingdom',
      countryId: 'united-kingdom',
      level: 'master',
      field: 'business',
      courses: ['Master of Business Administration (MBA)', 'Business Administration'],
      tuition: '£71,000 / year',
      duration: '12 Months',
      ielts: '7.5',
    },
    {
      id: 'utoronto-cs',
      title: 'BSc in Computer Science & Robotics',
      university: 'University of Toronto',
      country: 'Canada',
      countryId: 'canada',
      level: 'bachelor',
      field: 'cs-it',
      courses: ['Computer Science'],
      tuition: '$48,000 CAD / year',
      duration: '4 Years',
      ielts: '6.5',
    },
    {
      id: 'tum-mech',
      title: 'MSc in Mechanical Engineering & Robotics',
      university: 'Technical University of Munich',
      country: 'Germany',
      countryId: 'germany',
      level: 'master',
      field: 'engineering',
      courses: ['Mechanical Engineering', 'Robotics Engineering'],
      tuition: '€0 (Tuition Free)',
      duration: '2 Years',
      ielts: '6.5',
    },
  ]

  const filteredPrograms = useMemo(() => {
    return programs.filter((prog) => {
      const matchSearch =
        prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.university.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCountry = selectedCountry ? prog.countryId === selectedCountry : true
      const matchLevel = selectedLevel ? prog.level === selectedLevel : true
      const matchField = selectedField ? prog.field === selectedField : true
      const matchCourse = selectedCourses.length > 0
        ? (prog.courses && prog.courses.some(c => selectedCourses.includes(c)))
        : true

      return matchSearch && matchCountry && matchLevel && matchField && matchCourse
    })
  }, [searchTerm, selectedCountry, selectedLevel, selectedField, selectedCourses])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedLevel('')
    setSelectedField('')
    setSelectedCourses([])
  }

  const activeFilterCount = [selectedCountry, selectedLevel, selectedField].filter(Boolean).length + selectedCourses.length

  const FiltersPanel = (
    <GlassCard hoverable={false} overflowHidden={false} className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-white/20">
        <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs text-secondary hover:text-primary font-bold hover:underline transition-all"
        >
          Reset All
        </button>
      </div>

      {/* Country Selector */}
      <GlassSelect
        label="Country"
        options={countryOptions}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />

      {/* Degree Level */}
      <GlassSelect
        label="Degree Level"
        options={levelOptions}
        value={selectedLevel}
        onChange={setSelectedLevel}
      />

      {/* Field of Study */}
      <div className="flex flex-col gap-2">
        <GlassSelect
          label="Field of Study"
          options={fieldOptions}
          value={selectedField}
          onChange={(val) => {
            setSelectedField(val)
            if (val && FIELD_COURSES[val]) {
              setActiveModalField(val)
              setIsCourseModalOpen(true)
              if (val !== activeModalField) {
                setSelectedCourses([])
              }
            } else {
              setSelectedCourses([])
            }
          }}
        />
        {selectedCourses.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {selectedCourses.map(course => (
              <div key={course} className="flex items-center gap-1.5 bg-secondary/10 text-secondary text-[11px] font-medium px-2.5 py-1 rounded-full border border-secondary/20">
                <span>{course}</span>
                <button
                  onClick={() => setSelectedCourses(prev => prev.filter(c => c !== course))}
                  className="hover:text-white transition-colors flex items-center justify-center bg-secondary/20 hover:bg-secondary/60 rounded-full p-0.5"
                >
                  <span className="material-symbols-outlined text-[11px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  )

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 md:py-12 max-w-container-max mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/50 px-4 py-1.5 text-xs font-headline font-bold uppercase tracking-wider text-secondary">
          <span className="material-symbols-outlined text-[14px]">school</span>
          Global Program Directory
        </div>
        <h1 className="text-headline-md md:text-headline-lg text-primary font-bold">
          Find Your Perfect Program
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Discover and filter world-class courses across top global universities.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-2xl w-full mx-auto">
        <GlassInput
          id="search-bar"
          type="text"
          label="Search programs or universities..."
          icon="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          id="filter-toggle"
          onClick={() => setFiltersOpen((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white/60 border border-white/40 shadow-glass font-headline font-bold text-sm text-primary hover:bg-white/80 transition-all"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </span>
          <motion.span
            animate={{ rotate: filtersOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="material-symbols-outlined text-[20px] text-on-surface-variant"
          >
            expand_more
          </motion.span>
        </button>

        {/* Collapsible Filter Panel on mobile */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-3"
            >
              {FiltersPanel}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filters Panel (desktop only) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 z-20">
          {FiltersPanel}
        </aside>

        {/* Right Column: Search Results Grid */}
        <div className="lg:col-span-9 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">
              Showing <span className="font-bold text-primary">{filteredPrograms.length}</span>{' '}
              {filteredPrograms.length === 1 ? 'program' : 'programs'}
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-secondary hover:underline font-bold transition-all"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredPrograms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 glass-panel rounded-2xl p-8 border border-white/30"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-secondary text-4xl">search_off</span>
              </div>
              <h3 className="text-headline-sm text-primary font-bold mb-2">No Programs Found</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs mx-auto mb-6">
                Try broadening your search or adjusting your filter selections.
              </p>
              <PillButton variant="secondary" className="!text-sm !py-2 !px-6" onClick={handleResetFilters}>
                Reset Filters
              </PillButton>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredPrograms.map((prog, i) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <GlassCard className="p-5 md:p-6 group hover:shadow-glass-hover transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Left: Info */}
                      <div className="flex-grow space-y-2.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${levelColors[prog.level]}`}>
                            {prog.level}
                          </span>
                          <span className="text-xs font-headline font-semibold text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                            {prog.country}
                          </span>
                        </div>

                        <h3 className="font-headline text-[16px] sm:text-[18px] font-bold text-primary leading-snug group-hover:text-secondary transition-colors duration-200">
                          {prog.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant font-medium flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-outline">account_balance</span>
                          {prog.university}
                        </p>

                        {/* Metadata Badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[12px]">schedule</span>
                            {prog.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[12px]">record_voice_over</span>
                            IELTS {prog.ielts}+
                          </span>
                        </div>
                      </div>

                      {/* Right: Tuition + CTA */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/20">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Est. Tuition</div>
                          <div className="text-sm font-bold text-primary mt-0.5">{prog.tuition}</div>
                        </div>
                        <PillButton
                          variant="secondary"
                          className="!py-2 !px-5 !text-xs shrink-0"
                          onClick={() => navigate(`/destinations/${prog.countryId}`)}
                        >
                          View Details
                        </PillButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CourseSelectionModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        fieldLabel={fieldOptions.find(f => f.value === activeModalField)?.label || ''}
        courses={activeModalField ? FIELD_COURSES[activeModalField] : []}
        initialSelectedCourses={selectedCourses}
        onApply={(courses) => setSelectedCourses(courses)}
      />
    </div>
  )
}
export default SearchPage
