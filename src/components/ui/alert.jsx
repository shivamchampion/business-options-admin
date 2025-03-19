import * as React from "react"
import { cva } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Alert variants based on the design system
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-white border-[#D1D5DB] text-[#333333]",
        info: "bg-[#E6EEFF] border-[#3366CC] text-[#0031AC] [&>svg]:text-[#3366CC]",
        success: "bg-[#E6FFF4] border-[#00A651] text-[#006631] [&>svg]:text-[#00A651]",
        warning: "bg-[#FFF8E6] border-[#FFC107] text-[#856404] [&>svg]:text-[#FFC107]",
        destructive: "bg-[#FFEBEE] border-[#DC3545] text-[#C82333] [&>svg]:text-[#DC3545]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Alert component
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Alert style variant
 * @param {boolean} [props.dismissible] - Whether the alert can be dismissed
 * @param {Function} [props.onDismiss] - Callback when alert is dismissed
 */
const Alert = React.forwardRef(
  ({ className, variant, children, dismissible = false, onDismiss, ...props }, ref) => {
    const [dismissed, setDismissed] = React.useState(false)
    
    if (dismissed) return null

    const handleDismiss = () => {
      setDismissed(true)
      if (onDismiss) onDismiss()
    }

    let Icon = null
    switch (variant) {
      case "info":
        Icon = Info
        break
      case "success":
        Icon = CheckCircle
        break
      case "warning":
        Icon = AlertTriangle
        break
      case "destructive":
        Icon = AlertCircle
        break
      default:
        // No icon for default
        break
    }

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5" />}
        <div className={cn("flex flex-1", Icon ? "ml-7" : "")}>
          {children}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-[#717171] hover:text-[#333333]"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

/**
 * Alert title component
 */
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * Alert description component
 */
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }