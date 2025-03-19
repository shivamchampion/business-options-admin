import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

/**
 * A custom input component for handling currency values
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - The numeric value
 * @param {Function} props.onChange - Value change handler
 * @param {string} props.currency - Currency code (default: 'INR')
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {React.Ref} props.innerRef - Forward ref
 */
export const CurrencyInput = ({
  value,
  onChange,
  currency = 'INR',
  placeholder = "Enter amount",
  className = "",
  disabled = false,
  innerRef,
  ...props
}) => {
  // Format the numeric value for display
  const [displayValue, setDisplayValue] = useState('');
  
  // Initialize the formatter
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Separate symbol for display in the input adornment
  const symbol = formatter.formatToParts(0).find(part => part.type === 'currency')?.value || '₹';
  
  // Update display value when the numeric value changes
  useEffect(() => {
    if (value === undefined || value === null) {
      setDisplayValue('');
    } else {
      // Display the raw number without currency symbol in the input
      setDisplayValue(value.toString());
    }
  }, [value]);

  // Handle input changes
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    // Only allow numeric input with optional decimal point
    if (inputValue === '' || /^[0-9]+(\.[0-9]*)?$/.test(inputValue)) {
      setDisplayValue(inputValue);
      
      // Parse the display value to a number for the actual value
      const numericValue = inputValue === '' ? 0 : parseFloat(inputValue);
      onChange(numericValue);
    }
  };

  // Handle focus to select all text
  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">{symbol}</span>
      </div>
      <Input
        ref={innerRef}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={`pl-8 ${className}`}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default CurrencyInput;