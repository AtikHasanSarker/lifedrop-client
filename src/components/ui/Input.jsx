"use client";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
        w-full
        rounded-2xl
        border
        bg-white
        px-5
        py-4
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
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
