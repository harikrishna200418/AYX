import React from 'react'

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const baseStyles = 'font-headline text-label-md px-8 py-4 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'
  
  const variantStyles = variant === 'primary' 
    ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white border-none shadow-[0_4px_15px_rgba(255,107,107,0.4)] hover:shadow-[0_6px_20px_rgba(255,107,107,0.6)] hover:-translate-y-[2px]' 
    : 'bg-white/30 backdrop-blur-[10px] border border-secondary text-secondary hover:bg-white/50 hover:-translate-y-[1px]'

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
export default PillButton
