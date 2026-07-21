import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean
  overflowHidden?: boolean
  className?: string
  children: React.ReactNode
  delay?: number
}

export const GlassCard: React.FC<GlassCardProps> = ({
  hoverable = true,
  overflowHidden = true,
  className = '',
  children,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverable ? { y: -4, scale: 1.01 } : {}}
      className={cn(
        "relative rounded-2xl glass-panel shadow-glass transition-colors duration-500",
        overflowHidden && "overflow-hidden",
        hoverable && "hover:bg-white/50 hover:shadow-glass-hover cursor-pointer group",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      {hoverable && (
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </motion.div>
  )
}
