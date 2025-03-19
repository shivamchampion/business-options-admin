import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Tabs root component
 */
const Tabs = TabsPrimitive.Root

/**
 * Tabs list component
 */
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-[#F9FAFB] p-1 text-[#717171]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * Tabs trigger component
 */
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0031AC] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-[#0031AC] data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Tabs content component
 */
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0031AC] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

/**
 * Styled tabs component with different visual variants
 */
const StyledTabs = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const variantClasses = {
    default: "bg-[#F9FAFB] p-1",
    underline: "border-b border-[#D1D5DB] pb-0 space-x-2",
    pills: "space-x-1"
  }
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center",
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
})
StyledTabs.displayName = "StyledTabs"

/**
 * Styled tabs trigger with different visual variants
 */
const StyledTabsTrigger = React.forwardRef(({ 
  className, 
  variant = "default", 
  ...props 
}, ref) => {
  const variantClasses = {
    default: "data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm",
    underline: "border-b-2 border-transparent data-[state=active]:border-[#0031AC] rounded-none",
    pills: "data-[state=active]:bg-[#0031AC] data-[state=active]:text-white rounded-full"
  }
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0031AC] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-[#0031AC]",
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
})
StyledTabsTrigger.displayName = "StyledTabsTrigger"

export { Tabs, TabsList, TabsTrigger, TabsContent, StyledTabs, StyledTabsTrigger }