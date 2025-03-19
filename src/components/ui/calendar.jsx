import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

/**
 * Calendar component based on react-day-picker
 * 
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {object} [props.classNames] - Class names for specific parts
 * @param {React.ReactNode} [props.components] - Custom components
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-[#333333]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-[#717171] rounded-md w-9 font-normal text-xs",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md",
          "hover:bg-[#E6EEFF] focus:bg-[#E6EEFF] focus:outline-none"
        ),
        day_selected:
          "bg-[#0031AC] text-white hover:bg-[#0031AC] hover:text-white focus:bg-[#0031AC] focus:text-white",
        day_today: "bg-[#E6EEFF] text-[#0031AC]",
        day_outside: "text-[#717171] opacity-50",
        day_disabled: "text-[#717171] opacity-30",
        day_range_middle:
          "aria-selected:bg-[#E6EEFF] aria-selected:text-[#0031AC]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        ...components,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }