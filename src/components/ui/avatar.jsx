import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Avatar component
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * Avatar image component
 */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * Avatar fallback component
 */
const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-[#E6EEFF] text-[#0031AC]",
      className
    )}
    {...props}
  >
    {children || <User className="h-5 w-5" />}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Avatar with initials fallback
 */
const AvatarWithInitials = React.forwardRef(({ src, name, className, ...props }, ref) => {
  const getInitials = (name) => {
    if (!name) return ""
    
    return name
      .split(" ")
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }
  
  return (
    <Avatar ref={ref} className={className} {...props}>
      <AvatarImage src={src} alt={name || "Avatar"} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
})
AvatarWithInitials.displayName = "AvatarWithInitials"

export { Avatar, AvatarImage, AvatarFallback, AvatarWithInitials }