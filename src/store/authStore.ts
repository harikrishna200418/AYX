import { create } from 'zustand'

export interface UserProfile {
  name: string
  email: string
  path?: string // Selected onboarding path
}

interface AuthState {
  isAuthenticated: boolean
  user: UserProfile | null
  onboardingPath: string | null
  login: (email: string, name?: string) => Promise<boolean>
  logout: () => void
  setOnboardingPath: (path: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize from sessionStorage or defaults
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(sessionStorage.getItem('user') || 'null'),
  onboardingPath: sessionStorage.getItem('onboardingPath') || null,

  login: async (email: string, name = 'Alex Mercer') => {
    // Mock login operation
    return new Promise((resolve) => {
      setTimeout(() => {
        const path = sessionStorage.getItem('onboardingPath') || 'Global Career Aspirant'
        const mockUser: UserProfile = { name, email, path }
        
        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('user', JSON.stringify(mockUser))
        
        set({
          isAuthenticated: true,
          user: mockUser,
        })
        resolve(true)
      }, 500)
    })
  },

  logout: () => {
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('onboardingPath')
    set({
      isAuthenticated: false,
      user: null,
      onboardingPath: null,
    })
  },

  setOnboardingPath: (path: string) => {
    sessionStorage.setItem('onboardingPath', path)
    set((state) => {
      const updatedUser = state.user ? { ...state.user, path } : null
      if (updatedUser) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser))
      }
      return {
        onboardingPath: path,
        user: updatedUser,
      }
    })
  },
}))
