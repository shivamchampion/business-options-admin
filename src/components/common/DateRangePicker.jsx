import React, { useState, useEffect } from 'react';
import { format, isValid, isAfter, isBefore, startOfDay, endOfDay, addDays } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

// Custom DateRangePicker component
const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onRangeChange,
  minDate,
  maxDate,
  placeholder = 'Select date range',
  className = '',
  showResetButton = true,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState({ from: startDate, to: endDate });
  const [inputValue, setInputValue] = useState('');

  // Update internal state when props change
  useEffect(() => {
    setRange({ from: startDate, to: endDate });
    updateInputValue(startDate, endDate);
  }, [startDate, endDate]);

  // Format dates for display in input
  const updateInputValue = (from, to) => {
    if (from && to) {
      setInputValue(`${format(from, 'dd MMM yyyy')} - ${format(to, 'dd MMM yyyy')}`);
    } else if (from) {
      setInputValue(`${format(from, 'dd MMM yyyy')} - Select end date`);
    } else {
      setInputValue('');
    }
  };

  // Handle day selection in the calendar
  const handleDayClick = (day) => {
    const selectedDay = startOfDay(day);
    
    // Apply min/max date constraints
    if (minDate && isBefore(selectedDay, startOfDay(minDate))) {
      return;
    }
    
    if (maxDate && isAfter(selectedDay, startOfDay(maxDate))) {
      return;
    }

    let newRange = { ...range };

    // Logic for selecting range
    if (!range.from || (range.from && range.to)) {
      // Start a new range
      newRange = { from: selectedDay, to: undefined };
      if (onStartDateChange) onStartDateChange(selectedDay);
      if (onEndDateChange) onEndDateChange(null);
    } else {
      // Complete the range
      if (isBefore(selectedDay, range.from)) {
        newRange = { from: selectedDay, to: range.from };
      } else {
        newRange = { from: range.from, to: selectedDay };
      }
      
      if (onStartDateChange) onStartDateChange(newRange.from);
      if (onEndDateChange) onEndDateChange(newRange.to);
      
      // Close the calendar once range is selected
      setIsOpen(false);
    }

    setRange(newRange);
    updateInputValue(newRange.from, newRange.to);
    
    if (onRangeChange && newRange.from && newRange.to) {
      onRangeChange({
        startDate: newRange.from, 
        endDate: endOfDay(newRange.to)
      });
    }
  };

  // Reset the date range
  const handleReset = (e) => {
    e.stopPropagation();
    const newRange = { from: null, to: null };
    setRange(newRange);
    setInputValue('');
    
    if (onStartDateChange) onStartDateChange(null);
    if (onEndDateChange) onEndDateChange(null);
    if (onRangeChange) onRangeChange({ startDate: null, endDate: null });
  };

  // Predefined range options
  const setLastNDays = (days) => {
    const end = new Date();
    const start = addDays(end, -days);
    
    setRange({ from: start, to: end });
    updateInputValue(start, end);
    
    if (onStartDateChange) onStartDateChange(start);
    if (onEndDateChange) onEndDateChange(end);
    if (onRangeChange) onRangeChange({ startDate: start, endDate: endOfDay(end) });
    
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Input field */}
      <div 
        className={`flex items-center border border-gray-300 rounded-md bg-white 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-brand-blue'}
          ${isOpen ? 'ring-2 ring-brand-blue ring-opacity-50 border-brand-blue' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 flex items-center flex-grow">
          <CalendarIcon size={18} className="text-gray mr-2" />
          <input
            type="text"
            className="bg-transparent border-none focus:outline-none focus:ring-0 w-full cursor-pointer text-sm"
            placeholder={placeholder}
            value={inputValue}
            readOnly
            disabled={disabled}
          />
        </div>
        
        {showResetButton && (range.from || range.to) && (
          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-gray hover:text-error"
            disabled={disabled}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute mt-1 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setLastNDays(7)}
                className="px-2 py-1 bg-light-blue text-brand-blue rounded hover:bg-brand-blue hover:text-white"
              >
                Last 7 days
              </button>
              <button
                type="button"
                onClick={() => setLastNDays(30)}
                className="px-2 py-1 bg-light-blue text-brand-blue rounded hover:bg-brand-blue hover:text-white"
              >
                Last 30 days
              </button>
              <button
                type="button"
                onClick={() => setLastNDays(90)}
                className="px-2 py-1 bg-light-blue text-brand-blue rounded hover:bg-brand-blue hover:text-white"
              >
                Last 90 days
              </button>
            </div>
          </div>
          
          <DayPicker
            mode="range"
            selected={range}
            onDayClick={handleDayClick}
            numberOfMonths={2}
            defaultMonth={range.from || new Date()}
            disabled={[
              { before: minDate || undefined },
              { after: maxDate || undefined }
            ]}
            modifiersClassNames={{
              selected: 'bg-brand-blue text-white',
              today: 'font-bold border border-gray-300'
            }}
            styles={{
              caption: { color: '#333333' },
              head_cell: { color: '#717171' },
              day_selected: { backgroundColor: '#0031AC', color: 'white' },
              day_today: { fontWeight: 'bold', border: '1px solid #E6EEFF' },
              day_disabled: { color: '#d1d5db' },
              day_range_start: { backgroundColor: '#0031AC', color: 'white', borderRadius: '50%' },
              day_range_end: { backgroundColor: '#0031AC', color: 'white', borderRadius: '50%' },
              day_range_middle: { backgroundColor: '#E6EEFF', color: '#0031AC' }
            }}
            className="p-3"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;