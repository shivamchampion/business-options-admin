import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with tailwind-merge and clsx
 * @param {...any} inputs - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to a slug (URL-friendly format)
 * @param {string} str - Input string to convert
 * @returns {string} Slug version of the input string
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Formats date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} [format='default'] - Format type
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'default') {
  const d = new Date(date)
  
  switch(format) {
    case 'short':
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    case 'long':
      return d.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    default:
      return d.toLocaleDateString('en-US')
  }
}

/**
 * Truncates a string to a specified length
 * @param {string} str - String to truncate
 * @param {number} [length=100] - Maximum length
 * @param {string} [suffix='...'] - Suffix to add if truncated
 * @returns {string} Truncated string
 */
export function truncate(str, length = 100, suffix = '...') {
  if (str.length <= length) return str
  return str.substring(0, length) + suffix
}

/**
 * Converts currency to formatted string
 * @param {number} amount - Amount to format
 * @param {string} [currency='USD'] - Currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Generates a unique ID
 * @returns {string} Unique identifier
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}