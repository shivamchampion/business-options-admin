import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Popover root component
 */
const Popover = PopoverPrimitive.Root

/**
 * Popover trigger component
 */
const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * Popover content component
 */
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-[#D1D5DB] bg-white p-4 shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/**
 * Popover heading component
 */
const PopoverHeading = React.forwardRef(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("mb-2 text-sm font-medium text-[#333333]", className)}
    {...props}
  />
))
PopoverHeading.displayName = "PopoverHeading"

/**
 * Popover description component
 */
const PopoverDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#717171]", className)}
    {...props}
  />
))
PopoverDescription.displayName = "PopoverDescription"

/**
 * Tooltip component - A simplified popover for short text tooltips
 */
const Tooltip = ({ content, align = "center", sideOffset = 4, children, className, contentClassName, ...props }) => (
  <Popover {...props}>
    <PopoverTrigger className={className}>{children}</PopoverTrigger>
    <PopoverContent
      align={align}
      sideOffset={sideOffset}
      className={cn("w-auto max-w-[250px] min-w-[80px] p-2", contentClassName)}
    >
      <p className="text-xs text-[#333333]">{content}</p>
    </PopoverContent>
  </Popover>
)
Tooltip.displayName = "Tooltip"

export { Popover, PopoverTrigger, PopoverContent, PopoverHeading, PopoverDescription, Tooltip }