"use client";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  defaultValue,
  required = false,
  disabled = false,
  readOnly=false,
  startContent,
  endContent,
  error,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Start Icon */}
        {startContent && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {startContent}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          required={required}
          className={`
            w-full
            rounded-2xl
            border
            bg-white
            py-4
            text-gray-800
            outline-none
            transition-all
            duration-300

            ${startContent ? "pl-12" : "px-5"}
            ${endContent ? "pr-12" : "pr-5"}

            ${
              error
                ? "border-red-500 ring-2 ring-red-200"
                : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            }

            disabled:bg-gray-100
          `}
        />

        {/* End Icon */}
        {endContent && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {endContent}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}