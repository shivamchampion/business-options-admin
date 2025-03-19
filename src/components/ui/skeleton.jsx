import { cn } from "@/lib/utils"

/**
 * Skeleton component for loading states
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#E6EEFF]", className)}
      {...props}
    />
  )
}

/**
 * Text skeleton - simulates a line of text with loading effect
 */
function TextSkeleton({ className, lines = 1, lastLineWidth = "100%", ...props }) {
  return (
    <div className="flex flex-col space-y-2" {...props}>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4 w-full", className)}
        />
      ))}
      {lines > 0 && (
        <Skeleton
          className={cn("h-4", className)}
          style={{ width: lastLineWidth }}
        />
      )}
    </div>
  )
}

/**
 * Card skeleton - simulates a card with title, content, and optional actions
 */
function CardSkeleton({ 
  className, 
  hasHeader = true, 
  contentLines = 3, 
  hasActions = false,
  ...props 
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#D1D5DB] bg-white shadow-sm p-6 space-y-4",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
      
      <div className="space-y-2">
        <TextSkeleton lines={contentLines} lastLineWidth="80%" />
      </div>
      
      {hasActions && (
        <div className="flex justify-end space-x-2 pt-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      )}
    </div>
  )
}

/**
 * Avatar skeleton - simulates a user avatar
 */
function AvatarSkeleton({ className, size = "md", ...props }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }
  
  return (
    <Skeleton
      className={cn(
        "rounded-full",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    />
  )
}

/**
 * Table skeleton - simulates a table with rows and columns
 */
function TableSkeleton({ 
  className, 
  rows = 5, 
  columns = 4, 
  hasHeader = true, 
  ...props 
}) {
  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      {hasHeader && (
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, TextSkeleton, CardSkeleton, AvatarSkeleton, TableSkeleton }