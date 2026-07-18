import React from 'react'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  className?: string
  children: React.ReactNode
}

export const GlassCard: React.FC<GlassCardProps> = ({
  hoverable = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`
        glass-panel
        rounded-xl
        shadow-glass
        transition-all
        duration-300
        ease-out
        ${hoverable ? 'hover:bg-white/60 hover:backdrop-blur-[30px] hover:-translate-y-1 hover:shadow-glass-hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
