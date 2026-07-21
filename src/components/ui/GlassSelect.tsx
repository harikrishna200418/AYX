import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface SelectOption {
  value: string
  label: string
}

interface GlassSelectProps {
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const GlassSelect: React.FC<GlassSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative flex flex-col gap-2 ${className}`} ref={containerRef}>
      {label && <label className="text-xs font-bold text-on-surface-variant font-headline uppercase">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full
          h-[42px]
          flex
          items-center
          justify-between
          px-3
          rounded-xl
          bg-white/50
          backdrop-blur-[10px]
          border
          transition-all
          duration-300
          text-sm
          font-medium
          text-on-surface
          outline-none
          ${isOpen 
            ? 'border-secondary/60 shadow-[0_0_12px_rgba(0,88,190,0.15)] bg-white/70' 
            : 'border-[#c5c5d3]/40 hover:border-[#c5c5d3]/60'
          }
        `}
      >
        <span className={!selectedOption ? 'text-on-surface-variant/70' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span 
          className={`material-symbols-outlined text-outline-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute 
              top-[calc(100%+6px)] 
              left-0 
              w-full 
              z-50 
              bg-white/80 
              backdrop-blur-xl 
              border 
              border-white/40 
              rounded-xl 
              shadow-glass-hover 
              overflow-hidden
              max-h-[250px]
              flex
              flex-col
            "
          >
            <div 
              className="overflow-y-auto w-full py-1.5 custom-scrollbar overscroll-contain" 
              style={{ scrollbarWidth: 'thin' }}
              data-lenis-prevent="true"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  className={`
                    w-[calc(100%-12px)]
                    mx-[6px]
                    my-[2px]
                    flex items-center justify-between
                    text-left 
                    px-3 
                    py-2 
                    rounded-lg
                    text-sm 
                    transition-all
                    hover:bg-primary/10
                    ${value === opt.value ? 'bg-primary/15 text-primary font-bold' : 'text-on-surface font-medium'}
                  `}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {value === opt.value && (
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default GlassSelect
