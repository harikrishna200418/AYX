import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDestinations } from '../hooks/useDataHooks'
import { PillButton } from '../components/ui/PillButton'
import { DestinationCard } from '../components/destinations/DestinationCard'

export const DestinationsPage: React.FC = () => {
  const { destinations, loading } = useDestinations()
  const [regionFilter, setRegionFilter] = useState('')
  const [popularityFilter, setPopularityFilter] = useState('')
  const [budgetFilter, setBudgetFilter] = useState('')

  const handleResetFilters = () => {
    setRegionFilter('')
    setPopularityFilter('')
    setBudgetFilter('')
  }

  const filteredDestinations = destinations.filter((dest) => {
    if (regionFilter && dest.region !== regionFilter) return false
    if (popularityFilter) {
      if (popularityFilter === 'high' && !dest.isPopular) return false
      if (popularityFilter === 'emerging' && dest.isPopular) return false
    }
    if (budgetFilter) {
      if (budgetFilter === 'eco' && !dest.isAffordable) return false
      if (budgetFilter === 'prem' && dest.isAffordable) return false
    }
    return true
  })

  return (
    <div className="relative min-h-screen pb-16">
      {/* Airline Trails background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[120%] border-t border-dashed border-[#00236f]/10 transform rotate-12" />
        <div className="absolute top-[60%] left-[-10%] w-[120%] border-t border-dashed border-[#00236f]/10 transform -rotate-[10deg]" />
        <div className="absolute top-[80%] left-[-10%] w-[120%] border-t border-dashed border-[#00236f]/10 transform rotate-[5deg]" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        {/* Title Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-display-lg text-primary mb-6">Choose Your Horizon</h1>
          <p className="text-body-lg text-on-surface-variant mb-12">
            Select your ideal destination to begin your global career transition. Filter by region, demand, and opportunities.
          </p>

          {/* Filter Panel */}
          <div className="bg-white/30 backdrop-blur-[15px] border border-white/20 rounded-full p-2.5 flex flex-col md:flex-row gap-3 items-center w-full max-w-4xl mx-auto shadow-glass">
            {/* Region */}
            <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-white/30 pb-2.5 md:pb-0">
              <span className="material-symbols-outlined text-outline mr-3 select-none">public</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body text-body-md py-2 cursor-pointer outline-none"
              >
                <option value="">Select Region</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="Middle East">Middle East</option>
              </select>
            </div>

            {/* Popularity */}
            <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-white/30 pb-2.5 md:pb-0">
              <span className="material-symbols-outlined text-outline mr-3 select-none">trending_up</span>
              <select
                value={popularityFilter}
                onChange={(e) => setPopularityFilter(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body text-body-md py-2 cursor-pointer outline-none"
              >
                <option value="">Popularity</option>
                <option value="high">High Demand</option>
                <option value="emerging">Emerging</option>
              </select>
            </div>

            {/* Budget */}
            <div className="flex-1 flex items-center px-4 w-full pb-2.5 md:pb-0 md:mr-2">
              <span className="material-symbols-outlined text-outline mr-3 select-none">account_balance_wallet</span>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body text-body-md py-2 cursor-pointer outline-none"
              >
                <option value="">Budget Range</option>
                <option value="eco">Economical</option>
                <option value="mid">Mid-Range</option>
                <option value="prem">Premium</option>
              </select>
            </div>

            <PillButton
              variant="primary"
              onClick={handleResetFilters}
              className="w-full md:w-auto px-6 py-2.5 !text-sm flex items-center justify-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Clear
            </PillButton>
          </div>
        </section>

        {/* Destination Grid */}
        {loading ? (
          <div className="text-center py-20 text-body-lg text-on-surface-variant">Loading destinations...</div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 p-8">
            <span className="material-symbols-outlined text-primary text-5xl mb-4">search_off</span>
            <h3 className="text-headline-md text-primary font-bold mb-2">No Destinations Found</h3>
            <p className="text-body-md text-on-surface-variant mb-6">No countries match your current filter selection.</p>
            <PillButton variant="secondary" onClick={handleResetFilters}>
              Reset Filters
            </PillButton>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest, index) => {
              // Standardize: Make first element span multiple columns if it's the United States
              const isUS = dest.id === 'united-states'

              return (
                <DestinationCard 
                  key={dest.id} 
                  dest={dest} 
                  isFeatured={isUS} 
                />
              )
            })}
          </section>
        )}
      </div>
    </div>
  )
}
export default DestinationsPage
