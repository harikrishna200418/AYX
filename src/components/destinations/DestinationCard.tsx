import React from 'react'
import { Link } from 'react-router-dom'
import type { Destination } from '../../types/destination'

interface DestinationCardProps {
  dest: Destination
  isFeatured?: boolean
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ dest, isFeatured = false }) => {
  const gridClass = isFeatured
    ? 'md:col-span-2 lg:col-span-2 row-span-2 min-h-[400px]'
    : 'h-[400px]'

  return (
    <Link
      to={`/destinations/${dest.id}`}
      className={`glass-card rounded-[2rem] overflow-hidden flex flex-col group relative select-none ${gridClass}`}
    >
      {isFeatured ? (
        /* Hero Style Card for Featured Destinations */
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              src={dest.imageUrl}
              alt={dest.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          </div>
          
          {/* Top elements */}
          <div className="absolute top-6 right-6 z-10">
            <span className="bg-gradient-to-r from-error to-[#ff8988] shadow-[0_4px_12px_rgba(186,26,26,0.3)] text-white font-headline text-label-md px-4 py-1.5 rounded-full flex items-center transform transition-transform duration-300 hover:scale-105">
              <span className="material-symbols-outlined text-[16px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              Featured Path
            </span>
          </div>
          <div className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-md font-headline font-bold text-white text-lg">
            {dest.flag} {dest.name}
          </div>

          {/* Bottom Copy */}
          <div className="mt-auto relative z-10 p-8 text-white">
            <h3 className="font-headline text-[32px] md:text-[40px] font-bold mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
              {dest.name}
            </h3>
            <p className="text-body-lg text-white/90 max-w-xl line-clamp-2 md:line-clamp-none">
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
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-surface/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className="mt-auto h-[60%] bg-white/60 backdrop-blur-xl p-6 rounded-t-[2rem] relative z-10 flex flex-col border-t border-white/50 justify-between transition-colors duration-300 group-hover:bg-white/80">
            {/* Floating Flag */}
            <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg border border-white/50 flex items-center justify-center text-2xl font-bold transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
              {dest.flag}
            </div>
            
            <div>
              <h3 className="font-headline text-headline-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors duration-300">
                {dest.name}
              </h3>
              <p className="text-body-md text-sm text-on-surface-variant line-clamp-3 group-hover:text-on-surface transition-colors duration-300">
                {dest.description}
              </p>
            </div>
            
            <div className="flex items-center text-secondary font-headline text-label-md group-hover:translate-x-1.5 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Explore Opportunities</span>
              <span className="material-symbols-outlined text-[18px] ml-1 transform transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
            </div>
          </div>
        </>
      )}
    </Link>
  )
}
