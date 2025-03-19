import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type] - Input type (text, email, password, etc.)
 * @param {boolean} [props.error] - Error state
 */
const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm",
        "placeholder:text-[#717171] focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
        {
          "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
          "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

/**
 * Textarea component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error] - Error state
 */
const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm",
        "placeholder:text-[#717171] focus:outline-none resize-y",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
        {
          "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
          "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

/**
 * Currency Input component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.currency] - Currency symbol
 * @param {boolean} [props.error] - Error state
 */
const CurrencyInput = React.forwardRef(
  ({ className, currency = "₹", error, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <span className="absolute left-3 text-[#717171]">{currency}</span>
        <input
          type="number"
          className={cn(
            "flex h-10 w-full rounded-md border border-[#D1D5DB] bg-white pl-7 pr-3 py-2 text-sm",
            "placeholder:text-[#717171] focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
            {
              "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
              "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

/**
 * Percentage Input component
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error] - Error state
 */
const PercentageInput = React.forwardRef(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="number"
          className={cn(
            "flex h-10 w-full rounded-md border border-[#D1D5DB] bg-white pl-3 pr-8 py-2 text-sm",
            "placeholder:text-[#717171] focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
            {
              "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
              "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
            },
            className
          )}
          ref={ref}
          min="0"
          max="100"
          step="0.1"
          {...props}
        />
        <span className="absolute right-3 text-[#717171]">%</span>
      </div>
    )
  }
)
PercentageInput.displayName = "PercentageInput"

export { Input, Textarea, CurrencyInput, PercentageInput }