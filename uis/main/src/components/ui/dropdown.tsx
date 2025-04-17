import React, { useEffect, useState } from 'react';

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  options?: DropdownOption[];
  apiUrl?: string;
  onChange: (value: string | number) => void;
  value?: string | number;
  placeholder?: string;
  mapResponse?: (data: any) => DropdownOption[];
}

const UniversalDropdown: React.FC<DropdownProps> = ({
  label,
  options = [],
  apiUrl,
  onChange,
  value,
  placeholder = 'Select...',
  mapResponse
}) => {
  const [items, setItems] = useState<DropdownOption[]>(options);

  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const mapped = mapResponse
            ? mapResponse(data)
            : data.map((item: any) => ({
                label: item.name || item.label || item.title,
                value: item.id || item.value
              }));
          setItems(mapped);
        })
        .catch(() => {});
    }
  }, [apiUrl, mapResponse]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <select
       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UniversalDropdown;
