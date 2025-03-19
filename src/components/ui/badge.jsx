import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge variants based on the design system
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[#0031AC] text-white",
        secondary: "bg-[#E6EEFF] text-[#0031AC]",
        outline: "text-[#0031AC] border border-[#0031AC]",
        destructive: "bg-[#DC3545] text-white",
        success: "bg-[#00A651] text-white",
        warning: "bg-[#FFC107] text-[#333333]",
        info: "bg-[#3366CC] text-white",
      },
      // Status badges for listings, applications, etc.
      status: {
        draft: "bg-gray-200 text-gray-700",
        pending: "bg-[#FFC107] text-[#333333]",
        published: "bg-[#00A651] text-white",
        rejected: "bg-[#DC3545] text-white",
        archived: "bg-[#717171] text-white",
        active: "bg-[#00A651] text-white",
        inactive: "bg-[#717171] text-white",
        new: "bg-[#0031AC] text-white",
        contacted: "bg-[#3366CC] text-white",
        converted: "bg-[#00A651] text-white",
        closed: "bg-[#333333] text-white",
        featured: "bg-[#FFC107] text-[#333333]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Badge component
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Badge style variant
 * @param {string} [props.status] - Status-specific styling
 */
function Badge({ className, variant, status, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant, status, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }