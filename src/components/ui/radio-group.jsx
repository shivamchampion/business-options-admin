import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Radio Group root component
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * Radio Group item component
 */
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-[#D1D5DB] text-[#0031AC]",
        "focus:outline-none focus:ring-2 focus:ring-[#0031AC] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-[#0031AC] data-[state=checked]:bg-white",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-[#0031AC] text-[#0031AC]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * Radio Group item with label component
 */
const RadioGroupItemWithLabel = React.forwardRef(({ className, label, description, ...props }, ref) => {
  return (
    <div className="flex items-start space-x-2">
      <RadioGroupItem ref={ref} {...props} className={cn("mt-0.5", className)} />
      <div className="grid gap-1">
        <label
          htmlFor={props.id || props.value}
          className="text-sm font-medium leading-none text-[#333333] cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-[#717171]">{description}</p>
        )}
      </div>
    </div>
  )
})
RadioGroupItemWithLabel.displayName = "RadioGroupItemWithLabel"

/**
 * Radio Group card component - styled as a card with more content space
 */
const RadioGroupCard = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "peer sr-only",
          className
        )}
        {...props}
      />
      <label
        htmlFor={props.id || props.value}
        className={cn(
          "flex flex-col items-start rounded-lg border border-[#D1D5DB] p-4 hover:border-[#0031AC] cursor-pointer",
          "peer-data-[state=checked]:border-[#0031AC] peer-data-[state=checked]:bg-[#E6EEFF]",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        )}
      >
        {children}
      </label>
    </div>
  )
})
RadioGroupCard.displayName = "RadioGroupCard"

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel, RadioGroupCard }