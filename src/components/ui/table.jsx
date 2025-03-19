import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Table container component
 */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    >
      {props.children}
    </table>
  </div>
))
Table.displayName = "Table"

/**
 * Table header component
 */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props}>
    {props.children}
  </thead>
))
TableHeader.displayName = "TableHeader"

/**
 * Table body component
 */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  >
    {props.children}
  </tbody>
))
TableBody.displayName = "TableBody"

/**
 * Table footer component
 */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-[#F9FAFB] font-medium text-[#333333]", className)}
    {...props}
  >
    {props.children}
  </tfoot>
))
TableFooter.displayName = "TableFooter"

/**
 * Table row component
 */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[#E5E7EB] transition-colors hover:bg-[#F9FAFB] data-[state=selected]:bg-[#E6EEFF]",
      className
    )}
    {...props}
  >
    {props.children}
  </tr>
))
TableRow.displayName = "TableRow"

/**
 * Table head component
 */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-[#333333]",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  >
    {props.children}
  </th>
))
TableHead.displayName = "TableHead"

/**
 * Table sortable head component
 */
const TableSortableHead = React.forwardRef(({ 
  className, 
  children, 
  direction = null, // 'asc', 'desc', or null
  onClick,
  ...props 
}, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-[#333333] cursor-pointer select-none",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    onClick={onClick}
    {...props}
  >
    <div className="flex items-center space-x-1">
      <span>{children}</span>
      <span className="flex flex-col h-4">
        <span className={cn(
          "h-2 w-2 border-t-4 border-l-2 border-r-2 border-transparent border-t-[#D1D5DB]",
          direction === 'asc' && "border-t-[#0031AC]"
        )} />
        <span className={cn(
          "h-2 w-2 border-b-4 border-l-2 border-r-2 border-transparent border-b-[#D1D5DB]",
          direction === 'desc' && "border-b-[#0031AC]"
        )} />
      </span>
    </div>
  </th>
))
TableSortableHead.displayName = "TableSortableHead"

/**
 * Table cell component
 */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  >
    {props.children}
  </td>
))
TableCell.displayName = "TableCell"

/**
 * Table caption component
 */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-[#717171]", className)}
    {...props}
  >
    {props.children}
  </caption>
))
TableCaption.displayName = "TableCaption"

/**
 * Table pagination component
 */
const TablePagination = React.forwardRef(({ 
  className, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between py-4", className)}
    {...props}
  >
    <div className="text-sm text-[#717171]">
      Page {currentPage} of {totalPages}
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-[#0031AC] focus:ring-offset-2",
          currentPage <= 1 
            ? "bg-[#F3F4F6] text-[#D1D5DB] cursor-not-allowed" 
            : "bg-white text-[#333333] border border-[#D1D5DB] hover:bg-[#F9FAFB]"
        )}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-[#0031AC] focus:ring-offset-2",
          currentPage >= totalPages 
            ? "bg-[#F3F4F6] text-[#D1D5DB] cursor-not-allowed" 
            : "bg-white text-[#333333] border border-[#D1D5DB] hover:bg-[#F9FAFB]"
        )}
      >
        Next
      </button>
    </div>
  </div>
))
TablePagination.displayName = "TablePagination"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableSortableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination,
}