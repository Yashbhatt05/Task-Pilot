"use client";
import React, { useEffect, useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Option {
  [key: string]: any; // Allow any key-value pairs for flexibility
}

interface ApiDropdownProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  apiUrl?: string; // Optional for API-based data
  options?: Option[]; // Optional for static options
  labelKey?: string;
  valueKey?: string;
  className?: string;
}

const ComboBox: React.FC<ApiDropdownProps> = ({
  label,
  placeholder = "Select...",
  value,
  onChange,
  apiUrl,
  options = [],
  labelKey = "name",
  valueKey = "id",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Option[]>(options);

  // Fetch options from API if apiUrl is provided
  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((fetchedData) => setData(fetchedData))
        .catch((error) => {
          console.error('Error fetching options:', error);
          setData([]);
        });
    } else {
      setData(options); // Use static options if no apiUrl
    }
  }, [apiUrl, options]);

  // Find the selected option's label
  const selectedOption = data.find(
    (item) => String(item[valueKey]) === String(value)
  );
  const selectedLabel = selectedOption ? selectedOption[labelKey] : placeholder;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full px-4 py-2 h-9 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500",
              !selectedOption && "text-gray-500", // Style placeholder text
              className
            )}
          >
            {selectedLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item[valueKey]}
                    value={String(item[valueKey])}
                    onSelect={(val) => {
                      const selected = data.find(
                        (opt) => String(opt[valueKey]) === val
                      );
                      if (selected) {
                        onChange(selected[valueKey]);
                      }
                      setOpen(false);
                    }}
                  >
                    {item[labelKey]}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        String(value) === String(item[valueKey])
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboBox;