import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea component 
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error] - Error state
 * @param {number} [props.minRows] - Minimum number of visible rows
 * @param {number} [props.maxRows] - Maximum number of visible rows
 * @param {boolean} [props.showCounter] - Whether to show character counter
 * @param {number} [props.maxLength] - Maximum character length
 */
const Textarea = React.forwardRef(({ 
  className, 
  error, 
  minRows = 3,
  maxRows,
  showCounter = false,
  maxLength,
  onChange,
  value,
  ...props 
}, ref) => {
  const [charCount, setCharCount] = React.useState(value?.length || 0)
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e)
    }
    setCharCount(e.target.value.length)
  }
  
  // Determine if counter should show warning state (over 90% of max)
  const counterWarning = maxLength && charCount > (maxLength * 0.9)
  
  // Determine if counter should show error state (at max)
  const counterError = maxLength && charCount >= maxLength
  
  // Calculate minimum height based on rows
  const minHeight = minRows ? `${minRows * 1.5}em` : 'auto'
  
  // Calculate maximum height based on rows (if provided)
  const maxHeight = maxRows ? `${maxRows * 1.5}em` : 'auto'
  
  return (
    <div className="relative flex flex-col">
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm",
          "placeholder:text-[#717171] focus:outline-none resize-y",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
          {
            "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
            "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
            "pb-8": showCounter,
          },
          className
        )}
        style={{ 
          minHeight, 
          maxHeight: maxHeight !== 'auto' ? maxHeight : undefined,
          overflowY: maxHeight !== 'auto' ? 'auto' : undefined 
        }}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      
      {showCounter && (
        <div 
          className={cn(
            "absolute bottom-2 right-3 text-xs", 
            counterError ? "text-[#DC3545] font-medium" : counterWarning ? "text-[#FFC107]" : "text-[#717171]"
          )}
        >
          {maxLength ? `${charCount}/${maxLength}` : charCount}
        </div>
      )}
    </div>
  )
})
Textarea.displayName = "Textarea"

/**
 * Autogrowing textarea that expands with content
 */
const AutogrowTextarea = React.forwardRef(({ 
  className, 
  error, 
  minRows = 3,
  maxRows = 10,
  showCounter = false,
  maxLength,
  onChange,
  value: initialValue = "",
  ...props 
}, ref) => {
  const [value, setValue] = React.useState(initialValue)
  const [charCount, setCharCount] = React.useState(initialValue?.length || 0)
  const textareaRef = React.useRef(null)
  
  // Use the passed ref if available, otherwise use our own
  const combinedRef = useCombinedRefs(ref, textareaRef)
  
  const handleChange = (e) => {
    setValue(e.target.value)
    setCharCount(e.target.value.length)
    
    if (onChange) {
      onChange(e)
    }
    
    // Adjust height
    adjustHeight()
  }
  
  const adjustHeight = () => {
    if (!textareaRef.current) return
    
    // Reset height to auto to get proper scrollHeight
    textareaRef.current.style.height = 'auto'
    
    // Calculate row heights
    const lineHeight = 1.5 * 16 // 1.5em line height assuming 16px font
    const minHeight = minRows * lineHeight
    const maxHeight = maxRows * lineHeight
    
    // Set height to scrollHeight, constrained between min and max
    const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, minHeight), maxHeight)
    textareaRef.current.style.height = `${newHeight}px`
    
    // Add scrollbar if content exceeds max height
    textareaRef.current.style.overflowY = textareaRef.current.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }
  
  // Adjust height on mount
  React.useEffect(() => {
    adjustHeight()
  }, [])
  
  // Adjust height when content changes
  React.useEffect(() => {
    adjustHeight()
  }, [value])
  
  // Determine counter styling
  const counterWarning = maxLength && charCount > (maxLength * 0.9)
  const counterError = maxLength && charCount >= maxLength
  
  return (
    <div className="relative flex flex-col">
      <textarea
        ref={combinedRef}
        className={cn(
          "flex w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm",
          "placeholder:text-[#717171] focus:outline-none resize-none overflow-hidden",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]",
          {
            "focus:ring-2 focus:ring-[#0031AC] focus:border-[#0031AC]": !error,
            "border-[#DC3545] focus:ring-2 focus:ring-[#DC3545] focus:border-[#DC3545]": error,
            "pb-8": showCounter,
          },
          className
        )}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        rows={minRows}
        {...props}
      />
      
      {showCounter && (
        <div 
          className={cn(
            "absolute bottom-2 right-3 text-xs", 
            counterError ? "text-[#DC3545] font-medium" : counterWarning ? "text-[#FFC107]" : "text-[#717171]"
          )}
        >
          {maxLength ? `${charCount}/${maxLength}` : charCount}
        </div>
      )}
    </div>
  )
})
AutogrowTextarea.displayName = "AutogrowTextarea"

/**
 * Utility function to combine refs
 */
function useCombinedRefs(...refs) {
  const targetRef = React.useRef()
  
  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return
      
      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])
  
  return targetRef
}

export { Textarea, AutogrowTextarea }