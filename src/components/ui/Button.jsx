import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Button variants following the design system
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0031AC] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#0031AC] text-white hover:bg-[#002C9D] active:bg-[#00287A]",
        secondary: "bg-white text-[#0031AC] border border-[#0031AC] hover:bg-[#E6EEFF] active:bg-[#D1DFFF]",
        tertiary: "bg-transparent text-[#0031AC] hover:bg-[#E6EEFF] active:bg-[#D1DFFF]",
        destructive: "bg-[#DC3545] text-white hover:bg-[#C82333] active:bg-[#B21F2D]",
        success: "bg-[#00A651] text-white hover:bg-[#009247] active:bg-[#007E3D]",
        warning: "bg-[#FFC107] text-[#333333] hover:bg-[#E5AD06] active:bg-[#CC9A06]",
        ghost: "bg-transparent hover:bg-gray-100 text-[#333333]",
        link: "bg-transparent text-[#0031AC] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Button style variant
 * @param {string} [props.size] - Button size
 * @param {boolean} [props.disabled] - Disabled state
 * @param {React.ElementType} [props.asChild] - Render as different element
 */
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants };
export default Button;