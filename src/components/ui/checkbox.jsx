import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Checkbox component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error] - Error state
 */
const Checkbox = React.forwardRef(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#0031AC] data-[state=checked]:border-[#0031AC] data-[state=checked]:text-white",
      {
        "focus:ring-[#0031AC]": !error,
        "border-[#DC3545] focus:ring-[#DC3545]": error,
      },
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }