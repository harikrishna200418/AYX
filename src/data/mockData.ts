export interface University {
  id: string
  name: string
  ranking: string
  location: string
  tuitionFee: string
  popularPrograms: string[]
}

export interface Destination {
  id: string // e.g. 'united-kingdom', 'united-states'
  name: string
  description: string
  fullDescription: string
  region: 'na' | 'eu' | 'ap'
  popularity: 'high' | 'emerging'
  budget: 'eco' | 'mid' | 'prem'
  flag: string
  imageUrl: string
  visaSuccess: string
  workPermit: string
  costOfLiving: string
  ieltsRequirement: string
  demandSectors: string[]
  universities: University[]
}

export interface Course {
  id: string
  title: string
  category: 'ai-tech' | 'languages' | 'career-dev' | 'study-abroad'
  duration: string
  lessons: number
  rating: number
  instructor: string
  description: string
  enrolled: boolean
  progress: number
}

export interface TestPrep {
  id: string
  name: string
  fullName: string
  description: string
  format: string
  duration: string
  scoreRange: string
  sections: string[]
  resources: { title: string; type: 'guide' | 'practice-test' | 'video' }[]
}

export const mockUniversities: Record<string, University[]> = {
  'united-kingdom': [
    {
      id: 'oxford',
      name: 'University of Oxford',
      ranking: 'QS Rank #1',
      location: 'Oxford, England',
      tuitionFee: '£28,000 - £45,000 / year',
      popularPrograms: ['MBA', 'MSc in Computer Science', 'MSc in Finance'],
    },
    {
      id: 'cambridge',
      name: 'University of Cambridge',
      ranking: 'QS Rank #2',
      location: 'Cambridge, England',
      tuitionFee: '£30,000 - £48,000 / year',
      popularPrograms: ['MPhil in Machine Learning', 'MBA', 'BA in Law'],
    },
    {
      id: 'icl',
      name: 'Imperial College London',
      ranking: 'QS Rank #6',
      location: 'London, England',
      tuitionFee: '£32,000 - £42,000 / year',
      popularPrograms: ['MSc in Computing (AI)', 'MSc in Business Analytics'],
    },
  ],
  'united-states': [
    {
      id: 'mit',
      name: 'Massachusetts Institute of Technology',
      ranking: 'QS Rank #1 Global',
      location: 'Cambridge, USA',
      tuitionFee: '$58,000 - $65,000 / year',
      popularPrograms: ['MSc in Electrical Engineering & CS', 'MBA'],
    },
    {
      id: 'stanford',
      name: 'Stanford University',
      ranking: 'QS Rank #3 Global',
      location: 'Stanford, USA',
      tuitionFee: '$56,000 - $63,000 / year',
      popularPrograms: ['MS in Computer Science', 'MBA'],
    },
  ],
}

export const mockDestinations: Destination[] = [
  {
    id: 'united-states',
    name: 'United States',
    description: 'The epicenter of tech innovation and business leadership. Unrivaled opportunities for STEM professionals.',
    fullDescription: 'The United States remains the worlds premier destination for higher education and global career transitions. With major economic and technological hubs in Silicon Valley, New York, Boston, and Seattle, students gain access to world-class university research, industrial partners, and OPT (Optional Practical Training) work authorization that kickstarts international careers.',
    region: 'na',
    popularity: 'high',
    budget: 'prem',
    flag: '🇺🇸',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsTt-491ZzqxVCMb2e3J7flaKMEi4P7hYlJ0c1emnGGII1FM3HYfZOc17gVHJTT1Y91bT6tMCOYNptm9jcqXMd6UJoo1_PUDpyqtRTyVeDTOP4CBN7zPEOgBChEptbcC1_ZGOq2yG9YVxeeEpqGko9ZsIdKW8kdwhGaMQpRoo9VI9jRakDoXMbMEMB9h4iFV6ckI0JcqPrtOGjwDPedQouoHLqbPWJ3HZVNZFgR_eyZVnpWrWyP8s',
    visaSuccess: '92%',
    workPermit: 'Up to 36 months (STEM OPT)',
    costOfLiving: '$1,200 - $2,200 / month',
    ieltsRequirement: '6.5 - 7.5',
    demandSectors: ['Software Engineering', 'AI & Machine Learning', 'Biotechnology', 'Investment Banking'],
    universities: mockUniversities['united-states'] || [],
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    description: 'A historic hub for finance, consulting, and creative industries with excellent post-study work routes.',
    fullDescription: 'The United Kingdom blends hundreds of years of academic excellence with a progressive Graduate Route visa, allowing students to live and work in the UK for 2 years (3 years for PhD) after graduating. From the historic collegiate campuses of Oxford and Cambridge to the bustling innovation labs of London, the UK provides standard launching pads for global leadership.',
    region: 'eu',
    popularity: 'high',
    budget: 'mid',
    flag: '🇬🇧',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAfqtbsfhTWpTJ-y7QoU9pXS5jVsVNnJ-k1RWY7WEjpjLUeOzftf7CyqpW2Lh0_O0FdvPGGGzkpGPTkSnZWzSCMfxOTBU47_IRq3zFEDPUBH5xtUPfQNGPd3zLyzAhJUKGlfvAHf9dHNtnI2g9afjQy4VZwpqk1sr-NkDkamyES6KS9QwDOtoP5y8fnkPjh6JbhlRhPciD0vsgkN1DpBdiReNUJiYUyi9NVjeMl2ulT9SNZwG0Rg3Y',
    visaSuccess: '96%',
    workPermit: '24 Months (Graduate Route)',
    costOfLiving: '£1,000 - £1,800 / month',
    ieltsRequirement: '6.0 - 7.0',
    demandSectors: ['Finance & FinTech', 'Management Consulting', 'Data Science', 'Healthcare & Medicine'],
    universities: mockUniversities['united-kingdom'] || [],
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'Welcoming immigration policies and a booming tech scene make it a premier choice for skilled workers.',
    fullDescription: 'Canada offers some of the most stable and welcoming immigration pathways in the world. With its Post-Graduation Work Permit (PGWP) and Express Entry systems, studying in Canada is a direct pathway to Permanent Residency (PR). Tech clusters in Toronto, Vancouver, and Waterloo offer vibrant opportunities in software, AI, and environmental engineering.',
    region: 'na',
    popularity: 'high',
    budget: 'mid',
    flag: '🇨🇦',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtZfdu2al1SOSCkFMXFJ7-SFkmL6v_bd8pMobqY-losdo6VTPeSkw97BiZ17KgVMkkOBMx-5oWHFE6Pad7kk5VNmJrcWut4yYGmq3IaYRxZ7Tq1zZErWmNiAUr8ZMyw8LRGyZFFWwENGqZu5z6hmufBLqZSps6y0EyNAAqF96cZoIINwzktWVwMqYVQCDJL5HTpIu7OkXAAKKCxhkC9Dehh9ikP3jyfEaQ7UWzAu6uWn8388k31Vna',
    visaSuccess: '94%',
    workPermit: 'Up to 3 years (PGWP)',
    costOfLiving: '$1,100 - $1,800 CAD / month',
    ieltsRequirement: '6.5 (no band below 6.0)',
    demandSectors: ['Software Engineering', 'Information Technology', 'Civil & Environmental Engineering', 'Cybersecurity'],
    universities: [],
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'High quality of life paired with strong demand in healthcare, engineering, and IT sectors.',
    fullDescription: 'Australia boasts a stunning climate, vibrant cities, and top-tier universities. Post-study work rights are extremely generous, and its skilled migration programs value local Australian qualifications highly, providing robust pathways for long-term career establishment.',
    region: 'ap',
    popularity: 'high',
    budget: 'mid',
    flag: '🇦🇺',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM2_SUz-q65Zj6pOVtJ_8Bp8v9Ef2cLtpiDvNWzlGbQ9KEdXJi6uNcS8RSIqefDLGhmbwv__DaZBe51Nk8vBFQw7RQUo5qdShLdXFwhSH9uHkUXBfvS06fi4KrtievMKoWEaVOEah3LvLfu4J-XvKmLPitSg4aM5RkYAno-3wwpytZgrlWL7x_Mi-4eWENHlXHqjUrdPstB5Pdrv1MsbtjN6K4_f6rHw4pXSCI6QpBDJultAtDwgcj',
    visaSuccess: '95%',
    workPermit: '2 to 4 years (Subclass 485)',
    costOfLiving: '$1,300 - $2,000 AUD / month',
    ieltsRequirement: '6.0 - 7.0',
    demandSectors: ['Civil & Structural Engineering', 'Mining & Resources', 'Nursing & Public Health', 'IT Systems'],
    universities: [],
  },
  {
    id: 'germany',
    name: 'Germany',
    description: 'Europes economic powerhouse, offering incredible opportunities in engineering and manufacturing.',
    fullDescription: 'Germany features tuition-free education at public universities, world-renowned technical curriculums (TU9), and an exceptionally strong industrial economy. Graduates can remain for 18 months to secure a career matching their degree, making it a highly economical and secure choice.',
    region: 'eu',
    popularity: 'emerging',
    budget: 'eco',
    flag: '🇩🇪',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjO7urF7QkT5gwoVCAK_LU6XPFjEECxtV6JH8QqxyHyoy16LiLEK7Bc7YGnuWqoq25KO4Dz8wcDqjHXL_5FDxigMgdUEexZEXKyN2HR5ksCQ_1-smcVZiyY8juxcPswjcIF6D6tK48ij4ob_1-5W4ec2JgrmqP1m7pR1c8eOAUcg89lPUP_uUmgfguI5EOBWZfoqbPi-Yw_XAcJk4P8A2DZF2Qiczb2Lusku5lJ7Z5acmMHpfvXRUA',
    visaSuccess: '98%',
    workPermit: '18 Months Jobseeker Visa',
    costOfLiving: '€850 - €1,200 / month',
    ieltsRequirement: '6.0 - 6.5 (or TestDaF German)',
    demandSectors: ['Automotive Engineering', 'Mechanical & Electrical', 'AI Research', 'Renewable Energy'],
    universities: [],
  },
]

export const mockCourses: Course[] = [
  {
    id: 'prompt-eng',
    title: 'Advanced Prompt Engineering & AI Workflows',
    category: 'ai-tech',
    duration: '4 weeks',
    lessons: 12,
    rating: 4.8,
    instructor: 'Dr. Sarah Jenkins',
    description: 'Master the art of prompt engineering for LLMs, automate complex enterprise workflows, and build autonomous agents.',
    enrolled: true,
    progress: 75,
  },
  {
    id: 'data-analytics',
    title: 'Applied Data Analytics with Python',
    category: 'ai-tech',
    duration: '8 weeks',
    lessons: 24,
    rating: 4.7,
    instructor: 'Marcus Chen',
    description: 'Learn data analysis, visualization, and basic machine learning modeling using Pandas, NumPy, and Scikit-Learn.',
    enrolled: true,
    progress: 40,
  },
  {
    id: 'german-a1',
    title: 'German A1 - Absolute Beginner Intensive',
    category: 'languages',
    duration: '6 weeks',
    lessons: 30,
    rating: 4.9,
    instructor: 'Herr Jonas Werner',
    description: 'Build essential vocabulary, grammar foundations, and speaking confidence needed for the German APS certification.',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'resume-mastery',
    title: 'Global Resume & LinkedIn Strategy',
    category: 'career-dev',
    duration: '2 weeks',
    lessons: 6,
    rating: 4.9,
    instructor: 'Elena Rostova',
    description: 'Optimize your professional profile for international ATS software, write impactful bullet points, and network on LinkedIn.',
    enrolled: true,
    progress: 100,
  },
  {
    id: 'ielts-bootcamp',
    title: 'IELTS Academic Intensive Prep',
    category: 'study-abroad',
    duration: '6 weeks',
    lessons: 18,
    rating: 4.6,
    instructor: 'Coach David Vance',
    description: 'Targeted preparation for all 4 modules: Speaking, Reading, Writing, and Listening. Mock tests and grading rubrics included.',
    enrolled: false,
    progress: 0,
  },
]

export const mockTests: TestPrep[] = [
  {
    id: 'ielts',
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    description: 'The standard test preferred by UK, Canada, Australia, and New Zealand universities, and recognized by thousands of US programs.',
    format: 'Computer-delivered or Paper-based',
    duration: '2 hours 45 minutes',
    scoreRange: '0 - 9.0 Band Scale',
    sections: ['Listening (30 mins)', 'Reading (60 mins)', 'Writing (60 mins)', 'Speaking (11-14 mins)'],
    resources: [
      { title: 'IELTS Academic Writing Task 1 & 2 Blueprint', type: 'guide' },
      { title: 'Full Practice Test 1 - Reading & Listening (Interactive)', type: 'practice-test' },
      { title: 'Speaking Mock Exam - Band 8.5 Student Video Walkthrough', type: 'video' },
    ],
  },
  {
    id: 'toefl',
    name: 'TOEFL iBT',
    fullName: 'Test of English as a Foreign Language',
    description: 'The premier English language test preferred by US universities and widely accepted globally.',
    format: '100% Computer-delivered',
    duration: '2 hours',
    scoreRange: '0 - 120 Total Score',
    sections: ['Reading (35 mins)', 'Listening (36 mins)', 'Speaking (16 mins)', 'Writing (29 mins)'],
    resources: [
      { title: 'TOEFL Integrated Writing Framework', type: 'guide' },
      { title: 'Listening Comprehension Drill - Lecture & Campus Conversations', type: 'practice-test' },
    ],
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    fullName: 'Pearson Test of English Academic',
    description: 'A fully computer-scored test with fast results (usually within 48 hours), accepted by Australian, UK, and Canadian authorities.',
    format: '100% AI-graded Computer Test',
    duration: '2 hours',
    scoreRange: '10 - 90 Points Scale',
    sections: ['Speaking & Writing (54-67 mins)', 'Reading (29-30 mins)', 'Listening (30-43 mins)'],
    resources: [
      { title: 'AI Scoring Engine Explainer & PTE Rubric Hacks', type: 'guide' },
      { title: 'Speaking Describe Image & Retell Lecture Practice Drill', type: 'practice-test' },
    ],
  },
]
