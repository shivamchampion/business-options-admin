import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * A customizable multi-select component with search functionality
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of options with label and value
 * @param {Array} props.value - Array of selected values
 * @param {Function} props.onChange - Callback for value changes
 * @param {string} props.placeholder - Placeholder text for empty state
 * @param {number} props.maxItems - Maximum number of items that can be selected
 * @param {boolean} props.disabled - Whether the component is disabled
 * @param {string} props.className - Additional class names
 */
export const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select items",
  maxItems = null,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  // Format value to array if not already
  const selectedValues = Array.isArray(value) ? value : [];
  
  // Check if we've reached the maximum items limit
  const isMaxItemsSelected = maxItems !== null && selectedValues.length >= maxItems;
  
  // Get selected items for display
  const selectedItems = selectedValues.map(val => 
    options.find(option => option.value === val) || { label: val, value: val }
  );

  // Handle selecting an item
  const handleSelect = (selectedValue) => {
    // Check if item is already selected
    const isSelected = selectedValues.includes(selectedValue);
    
    // Toggle selection
    let newValues;
    if (isSelected) {
      // Remove if already selected
      newValues = selectedValues.filter(val => val !== selectedValue);
    } else {
      // Add if not selected and not at max limit
      if (isMaxItemsSelected) return;
      newValues = [...selectedValues, selectedValue];
    }
    
    // Call onChange with new values
    onChange(newValues);
    
    // Focus the input after selection
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Handle removing an item
  const handleRemove = (e, value) => {
    e.stopPropagation();
    const newValues = selectedValues.filter(val => val !== value);
    onChange(newValues);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (open) setOpen(false);
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${selectedValues.length > 0 ? 'h-auto min-h-10' : 'h-10'} ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 max-w-full">
            {selectedItems.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-full">
                {selectedItems.map((item) => (
                  <Badge
                    key={item.value}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-0"
                  >
                    {item.label}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(e, item.value);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemove(e, item.value)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command className="w-full">
          <CommandInput 
            ref={inputRef}
            placeholder="Search..." 
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    disabled={!isSelected && isMaxItemsSelected}
                    className={`
                      flex items-center gap-2 
                      ${!isSelected && isMaxItemsSelected ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <div
                      className={`
                        flex h-4 w-4 items-center justify-center rounded-sm border 
                        ${isSelected ? "bg-primary border-primary" : "opacity-50 border-primary"}
                      `}
                    >
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {maxItems !== null && (
            <div className="p-2 text-xs text-muted-foreground border-t">
              {selectedValues.length} of {maxItems} items selected
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;