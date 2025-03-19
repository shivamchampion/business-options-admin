import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

/**
 * Form component - provider wrapper around react-hook-form
 */
const Form = FormProvider

/**
 * FormField component
 */
const FormField = ({ name, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Slot {...props} {...field} />
      )}
    />
  )
}

/**
 * FormItem component
 */
const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

/**
 * FormLabel component
 */
const FormLabel = React.forwardRef(({ className, required, children, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(required && "after:content-['*'] after:ml-0.5 after:text-[#DC3545]", className)}
    {...props}
  >
    {children}
  </Label>
))
FormLabel.displayName = "FormLabel"

/**
 * FormControl component
 */
const FormControl = React.forwardRef(({ ...props }, ref) => (
  <Slot ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

/**
 * FormDescription component
 */
const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#717171]", className)}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

/**
 * FormMessage component
 */
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = props
  
  return (
    <div
      ref={ref}
      className={cn("flex items-center text-sm font-medium text-[#DC3545]", className)}
      {...props}
    >
      {error && <AlertCircle className="mr-1 h-4 w-4" />}
      {children}
    </div>
  )
})
FormMessage.displayName = "FormMessage"

/**
 * FormSection component - organizes form fields into logical sections
 */
const FormSection = React.forwardRef(({ className, title, description, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6 p-6 bg-white rounded-lg border border-[#D1D5DB] shadow-sm", className)}
    {...props}
  >
    {title && (
      <h3 className="text-lg font-semibold mb-2 text-[#333333]">{title}</h3>
    )}
    {description && (
      <p className="text-sm text-[#717171] mb-4">{description}</p>
    )}
    <div className="space-y-4">
      {children}
    </div>
  </div>
))
FormSection.displayName = "FormSection"

/**
 * FormRow component - for horizontal layout of form fields
 */
const FormRow = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
FormRow.displayName = "FormRow"

/**
 * FormActions component - container for form action buttons
 */
const FormActions = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row mt-6 pt-6 border-t border-[#D1D5DB] justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
FormActions.displayName = "FormActions"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormRow,
  FormActions,
}