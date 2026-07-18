import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { AppShell } from './layouts/AppShell'

// Screens
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ChoosePathPage from './pages/ChoosePathPage'
import DestinationsPage from './pages/DestinationsPage'
import CountryDetailsPage from './pages/CountryDetailsPage'
import SearchPage from './pages/SearchPage'
import TestsPage from './pages/TestsPage'
import AcademyPage from './pages/AcademyPage'
import DashboardPage from './pages/DashboardPage'
import MyLearningPage from './pages/MyLearningPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:country" element={<CountryDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/academy" element={<AcademyPage />} />
        </Route>

        {/* Onboarding Flow (un-navigated public pages that lead to logged-in) */}
        <Route path="/onboarding/path" element={<ChoosePathPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
        </Route>

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
