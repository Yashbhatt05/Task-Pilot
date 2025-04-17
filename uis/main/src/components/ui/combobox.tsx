"use client"

import React, { useEffect, useState } from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface ApiDropdownProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  apiUrl: string
  labelKey?: string
  valueKey?: string
  className? : string
}

const ComboBox: React.FC<ApiDropdownProps> = ({
  label,
  placeholder = "Select...",
  value,
  onChange,
  apiUrl,
  labelKey = "name",
  valueKey = "id",
}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }, [apiUrl])

  const selectedLabel = options.find((item) => item[valueKey] === value)?.[labelKey]

  return (
    <div className="flex flex-col gap-1 ">
      {label && <label className="text-sm text-gray-600 ">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full px-4] py-2 h-9 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
            {selectedLabel || placeholder}
            <ChevronsUpDown className="ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={item[valueKey]}
                    value={item[valueKey]}
                    onSelect={(val) => {
                      onChange(val)
                      setOpen(false)
                    }}
                  >
                    {item[labelKey]}
                    <Check
                      className={cn(" ml-auto", value === item[valueKey] ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ComboBox;
