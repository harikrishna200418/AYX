import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../components/ui/GlassCard'
import { GlassInput } from '../components/ui/GlassInput'
import { PillButton } from '../components/ui/PillButton'

interface Program {
  id: string
  title: string
  university: string
  country: string
  countryId: string
  level: 'bachelor' | 'master' | 'doctorate'
  field: 'tech-ai' | 'business' | 'engineering' | 'science'
  tuition: string
  duration: string
  ielts: string
}

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
      field: 'tech-ai',
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
      field: 'tech-ai',
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
      field: 'tech-ai',
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
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <GlassCard hoverable={false} className="p-6 flex flex-col gap-5 border border-white/40">
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
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface-variant font-headline uppercase">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-white/50 border border-[#c5c5d3]/40 rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
              >
                <option value="">All Countries</option>
                <option value="united-states">United States</option>
                <option value="united-kingdom">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="germany">Germany</option>
              </select>
            </div>

            {/* Degree Level */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface-variant font-headline uppercase">Degree Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-white/50 border border-[#c5c5d3]/40 rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
              >
                <option value="">All Levels</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="doctorate">Doctorate</option>
              </select>
            </div>

            {/* Field of Study */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface-variant font-headline uppercase">Field of Study</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full bg-white/50 border border-[#c5c5d3]/40 rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
              >
                <option value="">All Fields</option>
                <option value="tech-ai">AI & Computer Science</option>
                <option value="business">Business & MBA</option>
                <option value="engineering">Engineering</option>
                <option value="science">Applied Sciences</option>
              </select>
            </div>
          </GlassCard>
        </aside>

        {/* Right Column: Search Results Grid */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="text-sm text-on-surface-variant">
            Showing <span className="font-bold text-primary">{filteredPrograms.length}</span> programs
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 bg-white/20 rounded-2xl border border-white/20 p-8">
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
