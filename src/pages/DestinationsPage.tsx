import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDestinations } from '../hooks/useDataHooks'
import { PillButton } from '../components/ui/PillButton'

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
    if (popularityFilter && dest.popularity !== popularityFilter) return false
    if (budgetFilter && dest.budget !== budgetFilter) return false
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
                <option value="na">North America</option>
                <option value="eu">Europe</option>
                <option value="ap">Asia Pacific</option>
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
            {filteredDestinations.map((dest) => {
              // Standardize: Make first element span multiple columns if it's the United States
              const isUS = dest.id === 'united-states'
              const gridClass = isUS
                ? 'md:col-span-2 lg:col-span-2 row-span-2 min-h-[400px]'
                : 'h-[400px]'

              return (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className={`glass-card rounded-[2rem] overflow-hidden flex flex-col group relative select-none ${gridClass}`}
                >
                  {isUS ? (
                    /* Hero Style Card for US */
                    <>
                      <div className="absolute inset-0 w-full h-full">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
                      </div>
                      
                      {/* Top elements */}
                      <div className="absolute top-6 right-6 z-10">
                        <span className="bg-gradient-to-r from-error to-[#ff8988] shadow-[0_4px_12px_rgba(186,26,26,0.3)] text-white font-headline text-label-md px-4 py-1.5 rounded-full flex items-center">
                          <span className="material-symbols-outlined text-[16px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                          Featured Path
                        </span>
                      </div>
                      <div className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-md font-headline font-bold text-white text-lg">
                        {dest.flag} {dest.name}
                      </div>

                      {/* Bottom Copy */}
                      <div className="mt-auto relative z-10 p-8 text-white">
                        <h3 className="font-headline text-[32px] md:text-[40px] font-bold mb-2 tracking-tight">
                          {dest.name}
                        </h3>
                        <p className="text-body-lg text-white/90 max-w-xl">
                          {dest.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 border-t border-white/20 pt-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-white/70">work</span>
                            <span className="font-headline font-bold">Visa Rate: {dest.visaSuccess}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-white/70">school</span>
                            <span className="font-headline font-bold">{dest.workPermit}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Standard Card Style */
                    <>
                      <div className="absolute inset-0 w-full h-[45%] overflow-hidden">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-surface/80" />
                      </div>
                      
                      <div className="mt-auto h-[60%] bg-white/60 backdrop-blur-xl p-6 rounded-t-[2rem] relative z-10 flex flex-col border-t border-white/50 justify-between">
                        {/* Floating Flag */}
                        <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg border border-white/50 flex items-center justify-center text-2xl font-bold">
                          {dest.flag}
                        </div>
                        
                        <div>
                          <h3 className="font-headline text-headline-md text-primary font-bold mb-2">
                            {dest.name}
                          </h3>
                          <p className="text-body-md text-sm text-on-surface-variant line-clamp-3">
                            {dest.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center text-secondary font-headline text-label-md group-hover:translate-x-1.5 transition-all duration-300">
                          Explore Opportunities{' '}
                          <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                        </div>
                      </div>
                    </>
                  )}
                </Link>
              )
            })}
          </section>
        )}
      </div>
    </div>
  )
}
export default DestinationsPage
