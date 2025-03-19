import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Label variants based on the design system
 */
const labelVariants = cva(
  "text-sm font-medium leading-none text-[#333333] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
      error: {
        true: "text-[#DC3545]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * Label component
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Label content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.size] - Label size variant
 * @param {boolean} [props.error] - Error state
 */
const Label = React.forwardRef(({ className, size, error, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, error, className }))}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }