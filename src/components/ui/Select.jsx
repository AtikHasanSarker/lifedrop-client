"use client";

import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
}) {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* Select */}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full
            appearance-none
            rounded-2xl
            border
            bg-white
            px-5
            py-4
            pr-12
            text-gray-800
            outline-none
            transition-all
            duration-300

            ${
              error
                ? "border-red-500 ring-2 ring-red-200"
                : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            }

            disabled:bg-gray-100
          `}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900 bg-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
