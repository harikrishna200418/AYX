import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Magnetic } from './Magnetic'
import { cn } from '../../lib/utils'

interface PillButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'relative overflow-hidden font-headline text-label-md px-8 py-4 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variantStyles = variant === 'primary' 
    ? 'bg-primary-button text-white shadow-glow-primary hover:shadow-[0_0_30px_rgba(11,17,33,0.5)]' 
    : 'glass-panel text-secondary hover:text-white hover:bg-secondary border border-secondary/30'

  return (
    <Magnetic intensity={0.2}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variantStyles, className, "group")}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        {variant === 'primary' && (
          <div className="absolute inset-0 -z-0 bg-secondary-button opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[5px]" />
        )}
      </motion.button>
    </Magnetic>
  )
}
export default PillButton
