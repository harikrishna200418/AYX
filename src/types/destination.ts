export interface University {
  id: string
  name: string
  ranking: string
  location: string
  tuitionFee: string
  popularPrograms: string[]
}

export interface Destination {
  id: string
  name: string
  description: string
  fullDescription: string
  region: string
  flag: string
  imageUrl: string
  popularCourses: string[]
  topUniversities: string[]
  averageTuitionFees: string
  livingCost: string
  language: string
  currency: string
  workRights: string
  postStudyWorkVisa: string
  intakes: string[]
  visaProcessingTime: string
  employmentRate: string
  scholarshipsAvailable: string
  numberOfUniversities: string

  // Legacy / computed fields used by cards & detail page
  visaSuccess: string
  workPermit: string
  costOfLiving: string
  ieltsRequirement: string
  demandSectors: string[]
  universities: University[]

  // Scoring / filter helpers
  popularityScore: number
  tuitionScore: number
  isEnglishSpeaking: boolean
  isAffordable: boolean
  isPopular: boolean
}
