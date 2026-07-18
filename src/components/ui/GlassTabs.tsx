import React from 'react'
import { motion } from 'framer-motion'

interface TabOption {
  id: string
  label: string
}

interface GlassTabsProps {
  tabs: TabOption[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export const GlassTabs: React.FC<GlassTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`
        inline-flex
        p-1.5
        rounded-full
        bg-white/30
        backdrop-blur-[15px]
        border
        border-white/20
        shadow-[0_10px_30px_rgba(30,58,138,0.04)]
        ${className}
      `}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative
              px-6
              py-2.5
              rounded-full
              font-headline
              text-label-md
              transition-colors
              duration-300
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-secondary/40
              z-10
              ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white/80 rounded-full shadow-[0_4px_12px_rgba(30,58,138,0.06)] border border-white/40 -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
export default GlassTabs
