import React, { useState, useMemo } from 'react'
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * YearPicker component for selecting a year
 * @param {Object} props - Component props
 * @param {number} [props.defaultYear] - Initially selected year
 * @param {number} [props.minYear] - Minimum selectable year
 * @param {number} [props.maxYear] - Maximum selectable year
 * @param {function} props.onYearChange - Callback when year is selected
 * @param {string} [props.className] - Additional CSS classes
 */
export const YearPicker = ({
  defaultYear = new Date().getFullYear(),
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
  onYearChange,
  className
}) => {
  const [selectedYear, setSelectedYear] = useState(defaultYear)
  const [isOpen, setIsOpen] = useState(false)

  // Generate array of years
  const years = useMemo(() => {
    return Array.from(
      { length: maxYear - minYear + 1 }, 
      (_, i) => maxYear - i
    )
  }, [minYear, maxYear])

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    onYearChange?.(year)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[140px] justify-start text-left font-normal",
            !selectedYear && "text-muted-foreground",
            className
          )}
        >
          {selectedYear}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="grid grid-cols-4 gap-2 p-2 max-h-[300px] overflow-y-auto">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              size="sm"
              onClick={() => handleYearSelect(year)}
              className="w-full"
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default YearPicker