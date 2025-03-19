import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.orientation] - Orientation of the separator ('horizontal' or 'vertical')
 * @param {string} [props.decorative] - Whether the separator is purely decorative
 */
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[#D1D5DB]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

/**
 * Separator with title component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} props.title - Text to display within the separator
 * @param {string} [props.titleClassName] - Additional CSS classes for the title text
 */
const SeparatorWithTitle = React.forwardRef(
  ({ className, title, titleClassName, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn(
        "flex items-center w-full my-4",
        className
      )}
      {...props}
    >
      <Separator className="flex-1" />
      <span className={cn(
        "px-3 text-sm font-medium text-[#717171]", 
        titleClassName
      )}>
        {title}
      </span>
      <Separator className="flex-1" />
    </div>
  )
)
SeparatorWithTitle.displayName = "SeparatorWithTitle"

export { Separator, SeparatorWithTitle }