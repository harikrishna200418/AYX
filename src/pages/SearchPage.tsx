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
  ranking?: string
  scholarship?: string
}

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'australia', label: '🇦🇺 Australia' },
  { value: 'united-states', label: '🇺🇸 United States of America' },
  { value: 'united-kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'canada', label: '🇨🇦 Canada' },
  { value: 'germany', label: '🇩🇪 Germany' },
  { value: 'new-zealand', label: '🇳🇿 New Zealand' },
  { value: 'singapore', label: '🇸🇬 Singapore' },
  { value: 'uae', label: '🇦🇪 United Arab Emirates' },
  { value: 'ireland', label: '🇮🇪 Ireland' },
  { value: 'france', label: '🇫🇷 France' },
  { value: 'sweden', label: '🇸🇪 Sweden' },
  { value: 'netherlands', label: '🇳🇱 Netherlands' },
  { value: 'switzerland', label: '🇨🇭 Switzerland' },
]

const universityOptions = [
  { value: '', label: 'All Universities' },
  { value: 'University of Melbourne', label: 'University of Melbourne (QS #13)' },
  { value: 'University of Sydney', label: 'University of Sydney (QS #18)' },
  { value: 'UNSW Sydney (University of New South Wales)', label: 'UNSW Sydney (QS #19)' },
  { value: 'Australian National University (ANU)', label: 'Australian National University (ANU) (QS #30)' },
  { value: 'Monash University', label: 'Monash University (QS #37)' },
  { value: 'University of Queensland (UQ)', label: 'University of Queensland (UQ) (QS #40)' },
  { value: 'University of Western Australia (UWA)', label: 'University of Western Australia (UWA) (QS #72)' },
  { value: 'University of Adelaide', label: 'University of Adelaide (QS #82)' },
  { value: 'University of Technology Sydney (UTS)', label: 'University of Technology Sydney (UTS) (QS #88)' },
  { value: 'RMIT University', label: 'RMIT University (QS #123)' },
  { value: 'Macquarie University', label: 'Macquarie University (QS #130)' },
  { value: 'Curtin University', label: 'Curtin University (QS #174)' },
  { value: 'Queensland University of Technology (QUT)', label: 'Queensland University of Technology (QUT) (QS #189)' },
  { value: 'Deakin University', label: 'Deakin University (QS #233)' },
  { value: 'Griffith University', label: 'Griffith University (QS #243)' },
  { value: 'Massachusetts Institute of Technology (MIT)', label: 'MIT (USA)' },
  { value: 'Harvard University', label: 'Harvard University (USA)' },
  { value: 'Stanford University', label: 'Stanford University (USA)' },
  { value: 'University of Oxford', label: 'University of Oxford (UK)' },
  { value: 'University of Cambridge', label: 'University of Cambridge (UK)' },
]

const levelOptions = [
  { value: '', label: 'All Levels' },
  { value: 'bachelor', label: 'Bachelor Degree' },
  { value: 'master', label: 'Master Degree' },
  { value: 'doctorate', label: 'Doctorate / PhD' },
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

const topAustralianPills = [
  { id: '', label: 'All Universities' },
  { id: 'University of Melbourne', label: 'Unimelb (QS #13)' },
  { id: 'University of Sydney', label: 'USYD (QS #18)' },
  { id: 'UNSW Sydney (University of New South Wales)', label: 'UNSW (QS #19)' },
  { id: 'Australian National University (ANU)', label: 'ANU (QS #30)' },
  { id: 'Monash University', label: 'Monash (QS #37)' },
  { id: 'University of Queensland (UQ)', label: 'UQ (QS #40)' },
  { id: 'University of Western Australia (UWA)', label: 'UWA (QS #72)' },
  { id: 'University of Adelaide', label: 'Adelaide (QS #82)' },
  { id: 'University of Technology Sydney (UTS)', label: 'UTS (QS #88)' },
  { id: 'RMIT University', label: 'RMIT (QS #123)' },
  { id: 'Macquarie University', label: 'Macquarie (QS #130)' },
  { id: 'Curtin University', label: 'Curtin (QS #174)' },
  { id: 'Queensland University of Technology (QUT)', label: 'QUT (QS #189)' },
  { id: 'Deakin University', label: 'Deakin (QS #233)' },
  { id: 'Griffith University', label: 'Griffith (QS #243)' },
]

export const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Modal State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [activeModalField, setActiveModalField] = useState('')

  const programs: Program[] = [
    // ---------------- AUSTRALIA UNIVERSITIES (15 Universities) ----------------
    {
      id: 'unimelb-ds',
      title: 'Master of Data Science',
      university: 'University of Melbourne',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Data Science', 'Data Analytics', 'Machine Learning'],
      tuition: '$48,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #13 Global',
      scholarship: 'Melbourne International Excellence Scholarship Available'
    },
    {
      id: 'unimelb-comm',
      title: 'Bachelor of Commerce (Finance & Business Analytics)',
      university: 'University of Melbourne',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'business',
      courses: ['Finance', 'Economics', 'Business Analytics'],
      tuition: '$45,000 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #13 Global'
    },
    {
      id: 'unimelb-mba',
      title: 'Melbourne Master of Business Administration (MBA)',
      university: 'University of Melbourne',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'business',
      courses: ['Master of Business Administration (MBA)', 'Business Administration'],
      tuition: '$54,000 AUD / year',
      duration: '1.5 Years',
      ielts: '7.0',
      ranking: 'QS Rank #13 Global'
    },
    {
      id: 'usyd-cs',
      title: 'Bachelor of Advanced Computing (Computer Science)',
      university: 'University of Sydney',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'cs-it',
      courses: ['Computer Science', 'Software Engineering', 'Artificial Intelligence (AI)'],
      tuition: '$46,000 AUD / year',
      duration: '4 Years',
      ielts: '6.5',
      ranking: 'QS Rank #18 Global'
    },
    {
      id: 'usyd-mgmt',
      title: 'Master of Management & Global Logistics',
      university: 'University of Sydney',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'business',
      courses: ['International Business', 'Supply Chain Management'],
      tuition: '$47,000 AUD / year',
      duration: '1.5 Years',
      ielts: '7.0',
      ranking: 'QS Rank #18 Global'
    },
    {
      id: 'usyd-llm',
      title: 'Master of Laws (LL.M.)',
      university: 'University of Sydney',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'law',
      courses: ['Law (LLB)', 'International Law', 'Corporate Law'],
      tuition: '$49,000 AUD / year',
      duration: '1 Year',
      ielts: '7.0',
      ranking: 'QS Rank #18 Global'
    },
    {
      id: 'unsw-it',
      title: 'Master of Information Technology (Artificial Intelligence)',
      university: 'UNSW Sydney (University of New South Wales)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Information Technology (IT)', 'Artificial Intelligence (AI)', 'Cyber Security'],
      tuition: '$48,500 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #19 Global',
      scholarship: 'UNSW Academic Excellence Scholarship'
    },
    {
      id: 'unsw-mba',
      title: 'AGSM Full-Time Master of Business Administration (MBA)',
      university: 'UNSW Sydney (University of New South Wales)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'business',
      courses: ['Master of Business Administration (MBA)', 'Entrepreneurship'],
      tuition: '$52,000 AUD / year',
      duration: '1 Year',
      ielts: '7.0',
      ranking: 'QS Rank #19 Global'
    },
    {
      id: 'unsw-eng',
      title: 'Bachelor of Engineering (Honours - Civil & Structural)',
      university: 'UNSW Sydney (University of New South Wales)',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'engineering',
      courses: ['Civil Engineering', 'Structural Engineering'],
      tuition: '$47,000 AUD / year',
      duration: '4 Years',
      ielts: '6.5',
      ranking: 'QS Rank #19 Global'
    },
    {
      id: 'anu-comp',
      title: 'Master of Computing (Artificial Intelligence & Machine Learning)',
      university: 'Australian National University (ANU)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Computer Science', 'Artificial Intelligence (AI)', 'Machine Learning'],
      tuition: '$45,500 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #30 Global',
      scholarship: 'ANU Global Diversity Scholarship'
    },
    {
      id: 'anu-ir',
      title: 'Master of International Relations & Public Policy',
      university: 'Australian National University (ANU)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'social',
      courses: ['International Relations', 'Political Science', 'Public Administration'],
      tuition: '$44,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #30 Global'
    },
    {
      id: 'monash-cyber',
      title: 'Master of Cybersecurity & Cloud Computing',
      university: 'Monash University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Cyber Security', 'Cloud Computing', 'Digital Forensics'],
      tuition: '$43,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #37 Global'
    },
    {
      id: 'monash-pharm',
      title: 'Bachelor of Pharmacy (Honours) / Master of Pharmacy',
      university: 'Monash University',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'health',
      courses: ['Pharmacy', 'Biomedical Science', 'Medicine (MBBS/MD)'],
      tuition: '$44,500 AUD / year',
      duration: '4 Years',
      ielts: '7.0',
      ranking: 'QS Rank #37 Global'
    },
    {
      id: 'uq-biotech',
      title: 'Master of Biotechnology & Molecular Bioengineering',
      university: 'University of Queensland (UQ)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'science',
      courses: ['Biotechnology', 'Biomedical Science', 'Genetics'],
      tuition: '$41,500 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #40 Global'
    },
    {
      id: 'uq-med',
      title: 'Doctor of Medicine (MD)',
      university: 'University of Queensland (UQ)',
      country: 'Australia',
      countryId: 'australia',
      level: 'doctorate',
      field: 'health',
      courses: ['Medicine (MBBS/MD)', 'Public Health'],
      tuition: '$82,000 AUD / year',
      duration: '4 Years',
      ielts: '7.0',
      ranking: 'QS Rank #40 Global'
    },
    {
      id: 'uwa-eng',
      title: 'Master of Professional Engineering (Mining & Renewable Resources)',
      university: 'University of Western Australia (UWA)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'engineering',
      courses: ['Mining Engineering', 'Renewable Energy', 'Mechanical Engineering'],
      tuition: '$41,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #72 Global'
    },
    {
      id: 'uwa-data',
      title: 'Bachelor of Science (Data Science Major)',
      university: 'University of Western Australia (UWA)',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'cs-it',
      courses: ['Data Science', 'Data Analytics', 'Statistics'],
      tuition: '$38,000 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #72 Global'
    },
    {
      id: 'adelaide-ai',
      title: 'Master of Artificial Intelligence & Machine Learning',
      university: 'University of Adelaide',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Artificial Intelligence (AI)', 'Machine Learning', 'Computer Science'],
      tuition: '$40,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #82 Global'
    },
    {
      id: 'adelaide-dent',
      title: 'Bachelor of Dental Surgery (BDS)',
      university: 'University of Adelaide',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'health',
      courses: ['Dentistry', 'Medicine (MBBS/MD)'],
      tuition: '$68,000 AUD / year',
      duration: '5 Years',
      ielts: '7.0',
      ranking: 'QS Rank #82 Global'
    },
    {
      id: 'uts-design',
      title: 'Master of Interaction Design & UX Architecture',
      university: 'University of Technology Sydney (UTS)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'arts',
      courses: ['UX/UI Design', 'Human-Computer Interaction (HCI)', 'Graphic Design'],
      tuition: '$38,500 AUD / year',
      duration: '1.5 Years',
      ielts: '6.5',
      ranking: 'QS Rank #88 Global'
    },
    {
      id: 'uts-cyber',
      title: 'Bachelor of Computing Science (Cyber Security)',
      university: 'University of Technology Sydney (UTS)',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'cs-it',
      courses: ['Cyber Security', 'Computer Science', 'Information Systems'],
      tuition: '$40,000 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #88 Global'
    },
    {
      id: 'rmit-arch',
      title: 'Bachelor of Architectural Design',
      university: 'RMIT University',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'arts',
      courses: ['Architecture', 'Urban Planning', 'Interior Design'],
      tuition: '$37,000 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #123 Global'
    },
    {
      id: 'rmit-it',
      title: 'Master of Information Technology & Cloud Architecture',
      university: 'RMIT University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Information Technology (IT)', 'Cloud Computing', 'Web Development'],
      tuition: '$36,500 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #123 Global'
    },
    {
      id: 'macquarie-acc',
      title: 'Master of Professional Accounting & Finance',
      university: 'Macquarie University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'business',
      courses: ['Accounting', 'Finance', 'Banking'],
      tuition: '$38,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #130 Global'
    },
    {
      id: 'macquarie-media',
      title: 'Master of Media & Communication',
      university: 'Macquarie University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'media',
      courses: ['Media Studies', 'Public Relations', 'Digital Media'],
      tuition: '$35,000 AUD / year',
      duration: '1.5 Years',
      ielts: '6.5',
      ranking: 'QS Rank #130 Global'
    },
    {
      id: 'curtin-mining',
      title: 'Bachelor of Engineering (Mining Engineering)',
      university: 'Curtin University',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'engineering',
      courses: ['Mining Engineering', 'Materials Engineering'],
      tuition: '$36,500 AUD / year',
      duration: '4 Years',
      ielts: '6.5',
      ranking: 'QS Rank #174 Global'
    },
    {
      id: 'curtin-analytics',
      title: 'Master of Predictive Analytics',
      university: 'Curtin University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Data Analytics', 'Business Analytics', 'Data Science'],
      tuition: '$35,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #174 Global'
    },
    {
      id: 'qut-it',
      title: 'Master of Information Technology (Computer Science)',
      university: 'Queensland University of Technology (QUT)',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Computer Science', 'Software Engineering'],
      tuition: '$34,500 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #189 Global'
    },
    {
      id: 'qut-creative',
      title: 'Bachelor of Creative Industries & Digital Design',
      university: 'Queensland University of Technology (QUT)',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'arts',
      courses: ['Multimedia Design', 'Graphic Design', 'Animation'],
      tuition: '$33,000 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #189 Global'
    },
    {
      id: 'deakin-ai',
      title: 'Master of Artificial Intelligence',
      university: 'Deakin University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'cs-it',
      courses: ['Artificial Intelligence (AI)', 'Machine Learning'],
      tuition: '$34,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #233 Global'
    },
    {
      id: 'deakin-sports',
      title: 'Bachelor of Exercise & Sport Science',
      university: 'Deakin University',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'emerging',
      courses: ['Sports Science', 'Sports Management'],
      tuition: '$32,500 AUD / year',
      duration: '3 Years',
      ielts: '6.5',
      ranking: 'QS Rank #233 Global'
    },
    {
      id: 'griffith-tourism',
      title: 'Master of International Tourism & Hospitality',
      university: 'Griffith University',
      country: 'Australia',
      countryId: 'australia',
      level: 'master',
      field: 'hospitality',
      courses: ['Tourism Management', 'Hospitality Management'],
      tuition: '$33,000 AUD / year',
      duration: '2 Years',
      ielts: '6.5',
      ranking: 'QS Rank #243 Global'
    },
    {
      id: 'griffith-medlab',
      title: 'Bachelor of Medical Laboratory Science',
      university: 'Griffith University',
      country: 'Australia',
      countryId: 'australia',
      level: 'bachelor',
      field: 'health',
      courses: ['Medical Laboratory Science', 'Biomedical Science'],
      tuition: '$34,000 AUD / year',
      duration: '4 Years',
      ielts: '6.5',
      ranking: 'QS Rank #243 Global'
    },

    // ---------------- GLOBAL UNIVERSITIES (USA, UK, Canada, Germany) ----------------
    {
      id: 'mit-eecs',
      title: 'MSc in Electrical Engineering and Computer Science',
      university: 'Massachusetts Institute of Technology (MIT)',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'engineering',
      courses: ['Computer Engineering', 'Computer Science'],
      tuition: '$58,240 / year',
      duration: '2 Years',
      ielts: '7.0',
      ranking: 'QS Rank #1 Global'
    },
    {
      id: 'mit-ai',
      title: 'MS in Artificial Intelligence & Machine Learning',
      university: 'Massachusetts Institute of Technology (MIT)',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'cs-it',
      courses: ['Artificial Intelligence (AI)', 'Machine Learning'],
      tuition: '$60,500 / year',
      duration: '2 Years',
      ielts: '7.5',
      ranking: 'QS Rank #1 Global'
    },
    {
      id: 'harvard-mba',
      title: 'Master of Business Administration (MBA)',
      university: 'Harvard University',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'business',
      courses: ['Master of Business Administration (MBA)', 'Business Administration'],
      tuition: '$74,910 / year',
      duration: '2 Years',
      ielts: '7.5',
      ranking: 'QS Rank #4 Global'
    },
    {
      id: 'harvard-mph',
      title: 'Master of Public Health (MPH) in Global Health',
      university: 'Harvard University',
      country: 'United States',
      countryId: 'united-states',
      level: 'master',
      field: 'health',
      courses: ['Public Health', 'Healthcare Management'],
      tuition: '$56,550 / year',
      duration: '1 Year',
      ielts: '7.5',
      ranking: 'QS Rank #4 Global'
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
      ranking: 'QS Rank #3 Global'
    },
    {
      id: 'stanford-bs',
      title: 'BSc in Symbolic Systems & AI',
      university: 'Stanford University',
      country: 'United States',
      countryId: 'united-states',
      level: 'bachelor',
      field: 'cs-it',
      courses: ['Computer Science', 'Human-Computer Interaction (HCI)'],
      tuition: '$56,169 / year',
      duration: '4 Years',
      ielts: '7.0',
      ranking: 'QS Rank #3 Global'
    },
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
      ranking: 'QS Rank #1 UK'
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
      ranking: 'QS Rank #2 UK'
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
      ranking: 'QS Rank #21 Global'
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
      ranking: 'QS Rank #37 Global'
    },
  ]

  const filteredPrograms = useMemo(() => {
    return programs.filter((prog) => {
      const matchSearch =
        prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.country.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCountry = selectedCountry ? prog.countryId === selectedCountry : true
      const matchUniversity = selectedUniversity ? prog.university === selectedUniversity : true
      const matchLevel = selectedLevel ? prog.level === selectedLevel : true
      const matchField = selectedField ? prog.field === selectedField : true
      const matchCourse = selectedCourses.length > 0
        ? (prog.courses && prog.courses.some(c => selectedCourses.includes(c)))
        : true

      return matchSearch && matchCountry && matchUniversity && matchLevel && matchField && matchCourse
    })
  }, [searchTerm, selectedCountry, selectedUniversity, selectedLevel, selectedField, selectedCourses])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedUniversity('')
    setSelectedLevel('')
    setSelectedField('')
    setSelectedCourses([])
  }

  const activeFilterCount = [selectedCountry, selectedUniversity, selectedLevel, selectedField].filter(Boolean).length + selectedCourses.length

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
        onChange={(val) => {
          setSelectedCountry(val)
          // If country changed away from australia, clear uni if needed
        }}
      />

      {/* University Selector */}
      <GlassSelect
        label="University"
        options={universityOptions}
        value={selectedUniversity}
        onChange={setSelectedUniversity}
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
    <div className="px-margin-mobile md:px-margin-desktop pt-10 md:pt-14 pb-16 md:pb-24 max-w-container-max mx-auto flex flex-col gap-8">
      {/* Header with spacious padding and rich badge styling */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/70 backdrop-blur-md px-4 py-1.5 text-xs font-headline font-bold uppercase tracking-wider text-secondary shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary">school</span>
          Global Program Directory & Top Universities
        </div>
        <h1 className="text-headline-md sm:text-headline-lg md:text-display-lg font-black text-primary tracking-tight leading-tight">
          Find Your <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Perfect Program</span>
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Explore top undergraduate and postgraduate courses across Australia’s Group of Eight & global leader universities.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="max-w-2xl w-full mx-auto shadow-glass-hover rounded-2xl transition-all duration-300">
        <GlassInput
          id="search-bar"
          type="text"
          label="Search programs, fields, or universities (e.g. Melbourne, Sydney, UNSW, Data Science)..."
          icon="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Australia Universities Quick Selector Strip */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
            <span className="text-base">🇦🇺</span> Explore Australian Universities
          </span>
          {selectedUniversity && (
            <button
              onClick={() => setSelectedUniversity('')}
              className="text-xs text-secondary hover:underline font-bold"
            >
              Clear University Filter
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide pt-1">
          {topAustralianPills.map((pill) => {
            const isSelected = selectedUniversity === pill.id || (pill.id === '' && !selectedUniversity)
            return (
              <button
                key={pill.id || 'all'}
                onClick={() => {
                  setSelectedUniversity(pill.id)
                  if (pill.id !== '') {
                    setSelectedCountry('australia')
                  }
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-secondary text-white shadow-md scale-105'
                    : 'bg-white/60 hover:bg-white/90 text-on-surface-variant border border-white/40'
                }`}
              >
                {pill.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          id="filter-toggle"
          onClick={() => setFiltersOpen((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white/70 border border-white/50 shadow-glass font-headline font-bold text-sm text-primary hover:bg-white/90 transition-all"
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
          {/* Active Filter Tag Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-primary">
                Showing <span className="text-secondary font-extrabold">{filteredPrograms.length}</span> {filteredPrograms.length === 1 ? 'program' : 'programs'}
              </span>

              {selectedCountry && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-secondary/15 text-secondary px-2.5 py-1 rounded-full border border-secondary/30">
                  Country: {countryOptions.find(c => c.value === selectedCountry)?.label}
                  <button onClick={() => setSelectedCountry('')} className="hover:opacity-80">
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              )}

              {selectedUniversity && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/15 text-primary px-2.5 py-1 rounded-full border border-primary/30">
                  Uni: {selectedUniversity.split(' ')[0]}...
                  <button onClick={() => setSelectedUniversity('')} className="hover:opacity-80">
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              )}

              {selectedLevel && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-tertiary/15 text-tertiary px-2.5 py-1 rounded-full border border-tertiary/30">
                  Level: {selectedLevel}
                  <button onClick={() => setSelectedLevel('')} className="hover:opacity-80">
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              )}

              {selectedField && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-accent-orange/15 text-accent-orange px-2.5 py-1 rounded-full border border-accent-orange/30">
                  Field: {fieldOptions.find(f => f.value === selectedField)?.label}
                  <button onClick={() => setSelectedField('')} className="hover:opacity-80">
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-secondary hover:underline font-bold transition-all shrink-0"
              >
                Clear all filters
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
                Reset All Filters
              </PillButton>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredPrograms.map((prog, i) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <GlassCard className="p-5 md:p-6 group hover:shadow-glass-hover transition-all duration-300 relative overflow-hidden border border-white/60">
                    {/* Top gradient indicator line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Left: Info */}
                      <div className="flex-grow space-y-3 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${levelColors[prog.level]}`}>
                            {prog.level}
                          </span>
                          
                          {prog.ranking && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-headline font-bold text-primary bg-amber-500/10 border border-amber-500/30 text-amber-800 px-2.5 py-0.5 rounded-full">
                              <span className="material-symbols-outlined text-[12px] text-amber-600">military_tech</span>
                              {prog.ranking}
                            </span>
                          )}

                          <span className="text-xs font-headline font-semibold text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                            {prog.country}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-headline text-[17px] sm:text-[19px] font-bold text-primary leading-snug group-hover:text-secondary transition-colors duration-200">
                            {prog.title}
                          </h3>
                          <p className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5 mt-1">
                            <span className="material-symbols-outlined text-[16px] text-secondary">account_balance</span>
                            {prog.university}
                          </p>
                        </div>

                        {prog.scholarship && (
                          <div className="text-xs bg-emerald-500/10 text-emerald-800 font-medium px-3 py-1.5 rounded-xl border border-emerald-500/20 inline-flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                            {prog.scholarship}
                          </div>
                        )}

                        {/* Metadata Badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-on-surface-variant bg-surface-container/80 px-2.5 py-1 rounded-full border border-white/40">
                            <span className="material-symbols-outlined text-[13px]">schedule</span>
                            {prog.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-on-surface-variant bg-surface-container/80 px-2.5 py-1 rounded-full border border-white/40">
                            <span className="material-symbols-outlined text-[13px]">record_voice_over</span>
                            IELTS {prog.ielts}+
                          </span>
                          {prog.countryId === 'australia' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                              <span className="material-symbols-outlined text-[13px]">badge</span>
                              Subclass 485 Visa Eligible
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Tuition + CTA */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/20">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Est. Tuition</div>
                          <div className="text-base font-extrabold text-primary mt-0.5">{prog.tuition}</div>
                        </div>
                        <PillButton
                          variant="secondary"
                          className="!py-2 !px-5 !text-xs shrink-0 shadow-sm hover:shadow-md"
                          onClick={() => navigate(`/destinations/${prog.countryId}`)}
                        >
                          Explore University
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
