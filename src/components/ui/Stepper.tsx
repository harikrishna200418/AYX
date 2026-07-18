import React from 'react'

interface StepperProps {
  currentStep: number // 1-indexed
  totalSteps: number
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 w-full justify-center ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1
        const isCompleted = stepNum <= currentStep

        return (
          <div
            key={stepNum}
            className={`
              h-3
              flex-1
              rounded-full
              transition-all
              duration-500
              ease-out
              ${isCompleted 
                ? 'bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(0,88,190,0.2)]' 
                : 'bg-white/20 border border-white/10 backdrop-blur-sm'
              }
            `}
            aria-current={stepNum === currentStep ? 'step' : undefined}
            title={`Step ${stepNum} of ${totalSteps}`}
          />
        )
      })}
    </div>
  )
}
export default Stepper
