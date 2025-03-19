import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Progress component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes for the outer container
 * @param {string} [props.value] - Current progress value (0-100)
 * @param {string} [props.max] - Maximum progress value (default: 100)
 * @param {string} [props.variant] - Visual variant of the progress bar (default, success, warning, danger)
 * @param {boolean} [props.showValue] - Whether to show the numerical value
 * @param {string} [props.size] - Size of the progress bar (sm, md, lg)
 * @param {string} [props.textClassName] - Additional CSS classes for the text value
 * @param {string} [props.barClassName] - Additional CSS classes for the progress bar itself
 */
const Progress = React.forwardRef(({ 
  className, 
  value, 
  max = 100, 
  variant = "default",
  showValue = false,
  size = "md",
  textClassName,
  barClassName,
  ...props 
}, ref) => {
  const percentage = value !== null ? Math.min(Math.max(value, 0), max) : null

  // Determine variant-specific classes
  const variantClasses = {
    default: "bg-[#0031AC]",
    success: "bg-[#00A651]",
    warning: "bg-[#FFC107]",
    danger: "bg-[#DC3545]",
  }

  // Determine size-specific classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={percentage}
        className={cn(
          "w-full overflow-hidden rounded-full bg-[#E6EEFF]", 
          sizeClasses[size] || sizeClasses.md
        )}
      >
        <div
          className={cn(
            "h-full transition-all", 
            variantClasses[variant] || variantClasses.default,
            barClassName
          )}
          style={{ width: `${(percentage / max) * 100}%` }}
        />
      </div>
      
      {showValue && (
        <div className={cn(
          "absolute top-1/2 left-0 w-full -translate-y-1/2 text-center text-xs font-medium",
          textClassName
        )}>
          {percentage}%
        </div>
      )}
    </div>
  )
})
Progress.displayName = "Progress"

/**
 * Step progress component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} props.currentStep - Current active step (1-based)
 * @param {number} props.totalSteps - Total number of steps
 * @param {string[]} [props.labels] - Labels for each step
 * @param {boolean} [props.clickable] - Whether steps are clickable
 * @param {Function} [props.onStepClick] - Callback when a step is clicked
 */
const StepProgress = React.forwardRef(({
  className,
  currentStep,
  totalSteps,
  labels = [],
  clickable = false,
  onStepClick,
  ...props
}, ref) => {
  const handleStepClick = (step) => {
    if (clickable && onStepClick) {
      onStepClick(step)
    }
  }

  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber <= currentStep
          const isCurrentStep = stepNumber === currentStep
          
          return (
            <React.Fragment key={stepNumber}>
              {/* Step circle */}
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isActive ? "bg-[#0031AC] text-white" : "bg-[#E6EEFF] text-[#717171]",
                  isCurrentStep && "ring-4 ring-[#E6EEFF]",
                  clickable && "cursor-pointer"
                )}
                onClick={() => handleStepClick(stepNumber)}
                aria-current={isCurrentStep ? "step" : undefined}
              >
                {stepNumber}
                
                {/* Step label */}
                {labels[index] && (
                  <span className={cn(
                    "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium",
                    isActive ? "text-[#0031AC]" : "text-[#717171]"
                  )}>
                    {labels[index]}
                  </span>
                )}
              </div>
              
              {/* Connector line */}
              {index < totalSteps - 1 && (
                <div className="relative flex-1 mx-2">
                  <div className="absolute top-1/2 w-full h-0.5 bg-[#E6EEFF]" />
                  <div 
                    className={cn(
                      "absolute top-1/2 h-0.5 bg-[#0031AC] transition-all",
                      stepNumber < currentStep ? "w-full" : stepNumber === currentStep ? "w-1/2" : "w-0"
                    )} 
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
})
StepProgress.displayName = "StepProgress"

export { Progress, StepProgress }