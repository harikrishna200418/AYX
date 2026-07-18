import React, { useState } from 'react'

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: string
  id: string
  rightElement?: React.ReactNode
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  icon,
  id,
  rightElement,
  className = '',
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  return (
    <div
      className={`
        relative
        w-full
        h-[60px]
        flex
        items-center
        px-4
        py-2
        rounded-xl
        bg-white/40
        backdrop-blur-[10px]
        border
        transition-all
        duration-300
        ${isFocused 
          ? 'border-secondary/60 shadow-[0_0_12px_rgba(0,88,190,0.15)] bg-white/70' 
          : 'border-[#c5c5d3]/30 hover:border-[#c5c5d3]/50'
        }
        ${className}
      `}
    >
      {icon && (
        <span className="material-symbols-outlined text-outline-variant mr-3 select-none">
          {icon}
        </span>
      )}
      
      <div className="relative flex-grow h-full">
        <input
          id={id}
          className="
            w-full
            h-full
            bg-transparent
            border-none
            focus:ring-0
            text-on-surface
            font-body
            text-body-md
            outline-none
            pt-4
            pb-0
            peer
          "
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            text-outline
            font-headline
            text-label-md
            transition-all
            duration-200
            pointer-events-none
            origin-left
            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:scale-100
            peer-focus:top-[0.25rem]
            peer-focus:translate-y-0
            peer-focus:scale-[0.85]
            peer-focus:text-primary
            peer-[:not(:placeholder-shown)]:top-[0.25rem]
            peer-[:not(:placeholder-shown)]:translate-y-0
            peer-[:not(:placeholder-shown)]:scale-[0.85]
            peer-[:not(:placeholder-shown)]:text-primary
          `}
        >
          {label}
        </label>
      </div>

      {rightElement && (
        <div className="flex items-center ml-2 z-10">
          {rightElement}
        </div>
      )}
    </div>
  )
}
export default GlassInput
