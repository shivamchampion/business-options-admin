import React, { useState, useRef, useEffect } from 'react';
import { Check, X, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * A custom select component that allows selecting multiple options
 * 
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options in format [{value: 'value', label: 'Label'}]
 * @param {Array} props.value - Array of selected values
 * @param {Function} props.onChange - Handler for when selections change
 * @param {string} props.placeholder - Placeholder text when no options are selected
 * @param {number} props.maxSelected - Maximum number of options that can be selected
 * @param {boolean} props.disabled - Whether the input is disabled
 */
export const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  maxSelected = null,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Convert options to a map for easier lookup
  const optionsMap = options.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {});

  // Handle adding an option
  const handleSelect = (selectedValue) => {
    // Don't add if already selected
    if (value.includes(selectedValue)) {
      handleRemove(selectedValue);
      return;
    }

    // Check if at max selection
    if (maxSelected !== null && value.length >= maxSelected) {
      return;
    }

    const newValue = [...value, selectedValue];
    onChange(newValue);
    
    // Clear the search input
    setInputValue('');
    
    // Don't close the popover so user can continue selecting
    // Also focus the input again
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle removing an option
  const handleRemove = (valueToRemove) => {
    const newValue = value.filter(v => v !== valueToRemove);
    onChange(newValue);
  };

  // Filter options based on search input
  const filteredOptions = options.filter(option => {
    // Apply search filter if input value exists
    if (inputValue.trim()) {
      return option.label.toLowerCase().includes(inputValue.toLowerCase());
    }
    return true;
  });

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('[data-multiselect]') && !e.target.closest('[data-multiselect-popover]')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen} data-multiselect>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${!value.length && 'text-muted-foreground'}`}
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {value.length ? (
              <>
                {value.length <= 2 ? (
                  value.map((val) => (
                    <Badge 
                      key={val} // Ensure the key is a primitive value, not an object
                      variant="secondary"
                      className="mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                    >
                      {optionsMap[val] || val}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))
                ) : (
                  <>
                    <Badge variant="secondary" className="mr-1">
                      {value.length} selected
                    </Badge>
                  </>
                )}
              </>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" data-multiselect-popover>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search..." 
            onValueChange={setInputValue} 
            value={inputValue} 
            ref={inputRef}
            className="h-9"
          />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {filteredOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <CommandItem
                  key={option.value} // Using string value as key instead of object
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                    isSelected ? "bg-primary border-primary" : "opacity-50"
                  }`}>
                    {isSelected ? <Check className="h-3 w-3 text-primary-foreground" /> : null}
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          {maxSelected !== null && (
            <div className="p-2 text-xs text-muted-foreground border-t">
              {value.length > 0 ? (
                <span>
                  Selected {value.length} of {maxSelected} maximum options
                </span>
              ) : (
                <span>
                  Select up to {maxSelected} options
                </span>
              )}
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;