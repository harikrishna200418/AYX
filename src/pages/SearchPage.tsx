import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassInput } from '../components/ui/GlassInput'
import { PillButton } from '../components/ui/PillButton'
import { GlassSelect } from '../components/ui/GlassSelect'

interface Program {
  id: string
  title: string
  university: string
  country: string
  countryId: string
  level: 'bachelor' | 'master' | 'doctorate'
  field: string
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

export const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedField, setSelectedField] = useState('')

  const programs: Program[] = [
    {
      id: 'oxford-ds-ai',
      title: 'MSc in Data Science and Artificial Intelligence',
      university: 'University of Oxford',
      country: 'United Kingdom',
      countryId: 'united-kingdom',
      level: 'master',
      field: 'cs-it',
      tuition: 'Â£36,000 / year',
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
      tuition: 'Â£38,500 / year',
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
      tuition: 'Â£71,000 / year',
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
      field: 'tech-ai',
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
      tuition: 'â‚¬0 (Tuition Free)',
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

      return matchSearch && matchCountry && matchLevel && matchField
    })
  }, [searchTerm, selectedCountry, selectedLevel, selectedField])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedLevel('')
    setSelectedField('')
  }

  return (
    <div className="py-6 flex flex-col gap-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-headline-lg text-primary font-bold mb-3">Global Program Directory</h1>
        <p className="text-body-md text-on-surface-variant">
          Discover and filter world-class courses in computing, AI, business, and engineering across top universities.
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

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filters Panel */}
        <aside className="lg:col-span-3 flex flex-col gap-6 z-20 relative">
          <GlassCard hoverable={false} overflowHidden={false} className="p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center pb-2 border-b border-white/20">
              <h3 className="font-headline text-label-md text-primary font-bold uppercase tracking-wider">
                Filters
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
            <GlassSelect
              label="Field of Study"
              options={fieldOptions}
              value={selectedField}
              onChange={setSelectedField}
            />
          </GlassCard>
        </aside>

        {/* Right Column: Search Results Grid */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="text-sm text-on-surface-variant">
            Showing <span className="font-bold text-primary">{filteredPrograms.length}</span> programs
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl p-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">search_off</span>
              <h3 className="text-headline-md text-primary font-bold mb-2">No Programs Found</h3>
              <p className="text-body-md text-on-surface-variant">Try refining your search terms or filter configurations.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredPrograms.map((prog) => (
                <GlassCard key={prog.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 select-none">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-2.5 py-0.5 rounded-full border border-secondary/10">
                        {prog.level}
                      </span>
                      <span className="text-xs font-headline font-bold text-on-surface-variant">
                        {prog.country}
                      </span>
                    </div>
                    
                    <h3 className="font-headline text-[18px] md:text-[20px] font-bold text-primary">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">account_balance</span>
                      {prog.university}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-white/20 pt-4 md:pt-0 gap-4 shrink-0">
                    <div className="text-left md:text-right space-y-1">
                      <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Est. Tuition</div>
                      <div className="text-sm font-bold text-primary">{prog.tuition}</div>
                    </div>
                    
                    <PillButton
                      variant="secondary"
                      className="!py-2 !px-5 !text-xs"
                      onClick={() => navigate(`/destinations/${prog.countryId}`)}
                    >
                      View University
                    </PillButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SearchPage
