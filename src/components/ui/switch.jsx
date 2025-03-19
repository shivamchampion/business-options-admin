import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch component 
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Visual variant of the switch (default, success)
 */
const Switch = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "data-[state=checked]:bg-[#0031AC]",
    success: "data-[state=checked]:bg-[#00A651]",
  }
  
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0031AC] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-[#D1D5DB]",
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0",
          "transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

/**
 * Switch with label component
 * 
 * @param {object} props - Component props
 * @param {string} props.label - Text label for the switch
 * @param {string} [props.description] - Optional description text
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {Function} [props.onCheckedChange] - Change handler function
 */
const SwitchWithLabel = React.forwardRef(({ 
  label, 
  description, 
  className,
  checked,
  onCheckedChange,
  ...props 
}, ref) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="space-y-1">
        <div className="text-sm font-medium leading-none text-[#333333]">
          {label}
        </div>
        {description && (
          <div className="text-xs text-[#717171]">
            {description}
          </div>
        )}
      </div>
      <Switch 
        ref={ref} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
        {...props}
      />
    </div>
  )
})
SwitchWithLabel.displayName = "SwitchWithLabel"

export { Switch, SwitchWithLabel }