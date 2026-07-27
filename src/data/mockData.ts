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

export interface CourseModule {
  id: string
  title: string
  duration: string
  topics: string[]
}

export interface Course {
  id: string
  title: string
  category: 'ai-tech' | 'languages' | 'career-dev' | 'study-abroad' | 'overseas-success'
  duration: string
  lessons: number
  rating: number
  instructor: string
  description: string
  enrolled: boolean
  progress: number
  imageUrl?: string
  studentsCount?: string
  instructorAvatar?: string
  level?: string
  instructorTitle?: string
  prerequisites?: string[]
  outcomes?: string[]
  modules?: CourseModule[]
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
      name: 'Massachusetts Institute of Technology (MIT)',
      ranking: 'QS Rank #1 Global',
      location: 'Cambridge, Massachusetts, USA',
      tuitionFee: '$58,240 - $65,000 / year',
      popularPrograms: ['MSc in Electrical Engineering & CS', 'MS in Artificial Intelligence', 'MBA (Sloan)'],
    },
    {
      id: 'harvard',
      name: 'Harvard University',
      ranking: 'QS Rank #4 Global',
      location: 'Cambridge, Massachusetts, USA',
      tuitionFee: '$56,550 - $74,910 / year',
      popularPrograms: ['Master of Business Administration (MBA)', 'LL.M. in Law', 'MPH in Public Health'],
    },
    {
      id: 'stanford',
      name: 'Stanford University',
      ranking: 'QS Rank #3 Global',
      location: 'Stanford, California, USA',
      tuitionFee: '$57,400 - $63,000 / year',
      popularPrograms: ['MS in Computer Science (AI)', 'MBA', 'MS in Management Science'],
    },
    {
      id: 'caltech',
      name: 'California Institute of Technology (Caltech)',
      ranking: 'QS Rank #6 Global',
      location: 'Pasadena, California, USA',
      tuitionFee: '$60,864 / year',
      popularPrograms: ['MS in Physics & Quantum Science', 'MS in Computer Science & Applied Math', 'PhD in Aerospace Engineering'],
    },
    {
      id: 'princeton',
      name: 'Princeton University',
      ranking: 'QS Rank #7 Global',
      location: 'Princeton, New Jersey, USA',
      tuitionFee: '$59,710 / year',
      popularPrograms: ['Master in Finance (MFin)', 'MSE in Computer Science', 'PhD in Economics'],
    },
    {
      id: 'uchicago',
      name: 'University of Chicago',
      ranking: 'QS Rank #11 Global',
      location: 'Chicago, Illinois, USA',
      tuitionFee: '$64,260 - $81,000 / year',
      popularPrograms: ['MBA (Chicago Booth)', 'MS in Financial Mathematics', 'MA in Public Policy'],
    },
    {
      id: 'yale',
      name: 'Yale University',
      ranking: 'QS Rank #16 Global',
      location: 'New Haven, Connecticut, USA',
      tuitionFee: '$62,250 - $71,425 / year',
      popularPrograms: ['MBA (Yale SOM)', 'Master of Laws (LLM)', 'MS in Computer Science'],
    },
    {
      id: 'columbia',
      name: 'Columbia University',
      ranking: 'QS Rank #23 Global',
      location: 'New York City, New York, USA',
      tuitionFee: '$65,340 / year',
      popularPrograms: ['MS in Business Analytics', 'MS in Data Science', 'MS in Financial Engineering'],
    },
    {
      id: 'upenn',
      name: 'University of Pennsylvania',
      ranking: 'QS Rank #12 Global',
      location: 'Philadelphia, Pennsylvania, USA',
      tuitionFee: '$63,452 - $84,874 / year',
      popularPrograms: ['MBA (Wharton)', 'MSE in Data Science', 'Master of Integrated Product Design'],
    },
    {
      id: 'cornell',
      name: 'Cornell University',
      ranking: 'QS Rank #13 Global',
      location: 'Ithaca, New York, USA',
      tuitionFee: '$63,200 / year',
      popularPrograms: ['MPS in Applied Statistics & Data Science', 'MS in Computer Science', 'Cornell Tech MBA'],
    },
    {
      id: 'duke',
      name: 'Duke University',
      ranking: 'QS Rank #57 Global',
      location: 'Durham, North Carolina, USA',
      tuitionFee: '$60,480 / year',
      popularPrograms: ['Master of Engineering Management', 'MBA (Fuqua)', 'MS in Biomedical Engineering'],
    },
    {
      id: 'jhu',
      name: 'Johns Hopkins University',
      ranking: 'QS Rank #28 Global',
      location: 'Baltimore, Maryland, USA',
      tuitionFee: '$60,480 / year',
      popularPrograms: ['Master of Public Health (MPH)', 'MS in Biotechnology', 'MS in Robotics'],
    },
    {
      id: 'northwestern',
      name: 'Northwestern University',
      ranking: 'QS Rank #47 Global',
      location: 'Evanston, Illinois, USA',
      tuitionFee: '$62,193 / year',
      popularPrograms: ['MBA (Kellogg)', 'MS in Information Technology', 'MS in Integrated Marketing Communications'],
    },
    {
      id: 'uc-berkeley',
      name: 'University of California, Berkeley (UC Berkeley)',
      ranking: 'QS Rank #10 Global',
      location: 'Berkeley, California, USA',
      tuitionFee: '$54,430 / year',
      popularPrograms: ['Master of Engineering (EECS)', 'MS in Information & Data Science', 'MBA (Haas)'],
    },
    {
      id: 'ucla',
      name: 'University of California, Los Angeles (UCLA)',
      ranking: 'QS Rank #29 Global',
      location: 'Los Angeles, California, USA',
      tuitionFee: '$52,800 / year',
      popularPrograms: ['MS in Computer Science', 'MS in Business Analytics', 'MBA (Anderson)'],
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
    title: 'Prompt Engineering and AI Workflows',
    category: 'ai-tech',
    duration: '4 weeks',
    lessons: 12,
    rating: 4.8,
    instructor: 'Dr. Arpit Sharma',
    instructorTitle: 'Principal AI Researcher & Ex-Googler',
    description: 'Use ChatGPT, Gemini, Copilot, and Claude to research, write, analyse, design, and automate everyday academic and business work.',
    enrolled: true,
    progress: 75,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    studentsCount: '4.2k',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    level: 'Certified Expert',
    prerequisites: ['Basic computer literacy', 'Familiarity with web browsers'],
    outcomes: [
      'Master Zero-shot, Few-shot, and Chain-of-Thought prompting',
      'Automate daily workflows with Custom GPTs and AI Agents',
      'Integrate LLM APIs into business pipelines',
      'Create high-converting content and technical documentation',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Foundations of Generative AI & Prompt Architecture',
        duration: '1 week (3 lessons)',
        topics: ['LLM Architecture Demystified', 'Prompt Engineering Principles', 'Tokenization & Context Windows'],
      },
      {
        id: 'm2',
        title: 'Module 2: Advanced Reasoning & Chain-of-Thought Frameworks',
        duration: '1 week (3 lessons)',
        topics: ['Few-Shot & Multi-Turn Prompting', 'Structured JSON Output Generation', 'Hallucination Mitigation'],
      },
      {
        id: 'm3',
        title: 'Module 3: Autonomous AI Agents & Custom GPTs',
        duration: '1 week (3 lessons)',
        topics: ['Building Custom GPTs & Actions', 'Agentic Workflows with LangChain Basics', 'API Key Integration'],
      },
      {
        id: 'm4',
        title: 'Module 4: Enterprise Productivity & Case Studies',
        duration: '1 week (3 lessons)',
        topics: ['AI for Academic Research & Writing', 'Automating Marketing & Code Reviews', 'Capstone Project'],
      },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Python Fundamentals',
    category: 'ai-tech',
    duration: '8 weeks',
    lessons: 24,
    rating: 4.7,
    instructor: 'Sarah Jenkins',
    instructorTitle: 'Senior Data Scientist @ TechCorp',
    description: 'Build a practical foundation in spreadsheets, dashboards, Python basics, and data storytelling for students and professionals.',
    enrolled: true,
    progress: 40,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    studentsCount: '1.8k',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    level: 'Intermediate',
    prerequisites: ['Basic math & statistics background'],
    outcomes: [
      'Perform data wrangling with Pandas and NumPy',
      'Create interactive dashboards in Tableau and PowerBI',
      'Write clean Python scripts for automated data extraction',
      'Present impactful visual data stories to executive stakeholders',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Excel & SQL Fundamentals for Analytics',
        duration: '2 weeks (6 lessons)',
        topics: ['Advanced Excel Formulas & Pivot Tables', 'Relational Databases & SQL Queries', 'Data Cleaning Techniques'],
      },
      {
        id: 'm2',
        title: 'Module 2: Python Programming Basics',
        duration: '2 weeks (6 lessons)',
        topics: ['Data Structures, Loops & Functions', 'NumPy Arrays & Pandas DataFrames', 'Handling Missing Values'],
      },
      {
        id: 'm3',
        title: 'Module 3: Data Visualization & Storytelling',
        duration: '2 weeks (6 lessons)',
        topics: ['Matplotlib & Seaborn Libraries', 'Dashboard Design in PowerBI/Tableau', 'Communicating Insights'],
      },
      {
        id: 'm4',
        title: 'Module 4: Exploratory Data Analysis Capstone',
        duration: '2 weeks (6 lessons)',
        topics: ['Real-World E-commerce Dataset Analysis', 'Predictive Modeling Intro', 'Final Portfolio Presentation'],
      },
    ],
  },
  {
    id: 'german-a1',
    title: 'German Language & TestAS Readiness',
    category: 'languages',
    duration: '6 weeks',
    lessons: 30,
    rating: 4.9,
    instructor: 'Hans Mueller',
    instructorTitle: 'Goethe-Certified Native Language Faculty',
    description: 'Build German language confidence with guided pathways for TestAS, APS Germany documentation, and study-abroad readiness.',
    enrolled: false,
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    studentsCount: '950',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    level: 'Level B2-C1',
    prerequisites: ['No prior German language knowledge required'],
    outcomes: [
      'Master conversational German for daily life and academic settings',
      'Pass TestAS core and subject-specific modules with top percentiles',
      'Prepare flawless APS documentation for German university admissions',
      'Understand German academic etiquette and student visa requirements',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: German A1 Phonetics & Basic Grammar',
        duration: '2 weeks (10 lessons)',
        topics: ['Alphabet, Numbers & Greetings', 'Nouns, Articles & Gender Rules', 'Present Tense Verb Conjugations'],
      },
      {
        id: 'm2',
        title: 'Module 2: Daily Life & Academic Vocabulary',
        duration: '2 weeks (10 lessons)',
        topics: ['University & Classroom Terminology', 'Shopping, Travel & Directions', 'Case System (Nominativ, Akkusativ, Dativ)'],
      },
      {
        id: 'm3',
        title: 'Module 3: TestAS Exam Format & Preparation Strategy',
        duration: '2 weeks (10 lessons)',
        topics: ['Core TestAS Pattern Solving', 'Engineering/Economics Module Practice', 'Timed Mock Exams & APS Review'],
      },
    ],
  },
  {
    id: 'resume-mastery',
    title: 'Resume, LinkedIn & Interview Skills',
    category: 'career-dev',
    duration: '2 weeks',
    lessons: 6,
    rating: 4.9,
    instructor: 'Priya Varma',
    instructorTitle: 'Global Talent Acquisition Lead',
    description: 'Create an ATS-friendly resume, sharpen LinkedIn branding, and prepare for interviews, presentations, and workplace communication.',
    enrolled: true,
    progress: 100,
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
    studentsCount: '3.1k',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    level: 'Career Ready',
    prerequisites: ['Open to students and professionals preparing for career transitions'],
    outcomes: [
      'Build a 90+ ATS score resume targeted for top tech & global firms',
      'Optimize LinkedIn profile for 5x inbound recruiter outreach',
      'Master the STAR method for behavioral & technical interview rounds',
      'Negotiate compensation packages with confidence',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: High-Impact ATS Resume Architecture',
        duration: '1 week (3 lessons)',
        topics: ['ATS Parsing Algorithms & Keyword Optimization', 'Action Verb Formulas & Metrics-Driven Bullet Points', 'Tailoring Resumes per Job Description'],
      },
      {
        id: 'm2',
        title: 'Module 2: LinkedIn Branding & Recruiter Inbound Strategy',
        duration: '1 week (3 lessons)',
        topics: ['Headline & About Section Blueprint', 'Network Outreach & Cold Email Templates', 'Mock Interviews & Salary Negotiation'],
      },
    ],
  },
  {
    id: 'ielts-bootcamp',
    title: 'IELTS, PTE, TOEFL & GRE Bootcamp',
    category: 'study-abroad',
    duration: '6 weeks',
    lessons: 18,
    rating: 4.6,
    instructor: 'Prof. David Vance',
    instructorTitle: 'Certified Test Prep Master Trainer',
    description: 'Prepare for major global entrance and language tests with mock tests, scoring rubrics, doubt clearing, and guided practice plans.',
    enrolled: false,
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    studentsCount: '5.6k',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    level: 'Advanced',
    prerequisites: ['Upper-intermediate English proficiency'],
    outcomes: [
      'Achieve 7.5+ Band in IELTS / 100+ in TOEFL / 320+ in GRE',
      'Master timed strategies for Reading Comprehension & Essay Writing',
      'Gain confidence in 1-on-1 Speaking interviews',
      'Access 20+ full-length computer-based practice mocks',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Listening & Speaking Mastery',
        duration: '2 weeks (6 lessons)',
        topics: ['Accent Recognition & Note-taking', 'Fluency, Coherence & Vocabulary for Speaking', 'Live Mock Speaking Sessions'],
      },
      {
        id: 'm2',
        title: 'Module 2: Reading Comprehension & Writing Task 1 & 2',
        duration: '2 weeks (6 lessons)',
        topics: ['Skimming, Scanning & Question Patterns', 'Academic Essay Structures & Data Descriptions', 'Grammar Precision & Cohesion'],
      },
      {
        id: 'm3',
        title: 'Module 3: GRE Quantitative & Verbal Strategy',
        duration: '2 weeks (6 lessons)',
        topics: ['Text Completion & Sentence Equivalence', 'Data Interpretation & Problem Solving', 'Full Simulation Mocks & Score Analysis'],
      },
    ],
  },
  {
    id: 'overseas-success',
    title: 'Overseas Success Mentoring Programme',
    category: 'overseas-success',
    duration: '10 weeks',
    lessons: 20,
    rating: 4.8,
    instructor: 'Elena Rostova',
    instructorTitle: 'Global Admissions Director & Career Advisor',
    description: 'Move from university shortlisting to scholarships, visa preparation, internships, career planning, and pre-departure orientation.',
    enrolled: false,
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    studentsCount: '2.9k',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    level: 'Guided Mentoring',
    prerequisites: ['Planning to study or work abroad in the next 12-24 months'],
    outcomes: [
      'Create a tailored 3-country university shortlist aligned with your budget',
      'Draft winning Statement of Purpose (SOP) & Letters of Recommendation (LOR)',
      'Prepare 100% compliant student visa financial documentation',
      'Access pre-departure accommodation and post-study work visa support',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: University Shortlisting & Scholarship Strategy',
        duration: '3 weeks (6 lessons)',
        topics: ['Country Comparison & Budget Planning', 'Scholarship Grants & Financial Assistance', 'Professor Outreach for Research Programs'],
      },
      {
        id: 'm2',
        title: 'Module 2: SOP, LOR & Application Review',
        duration: '3 weeks (6 lessons)',
        topics: ['Crafting Authentic Personal Statements', 'Securing Academic & Professional LORs', 'Application Portal Submissions'],
      },
      {
        id: 'm3',
        title: 'Module 3: Student Visa & Pre-Departure Readiness',
        duration: '4 weeks (8 lessons)',
        topics: ['Financial Proofs, Blocked Accounts & Loans', 'Embassy Visa Interview Preparation', 'Housing, Flight & Overseas Cultural Transition'],
      },
    ],
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
