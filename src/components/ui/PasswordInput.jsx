"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  name,
  placeholder = "Enter your password",
  value,
  onChange,
  error,
  required = false,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`
            w-full
            rounded-2xl
            border
            bg-white
            px-5
            py-4
            pr-14
            text-gray-800
            outline-none
            transition-all
            duration-300

            ${
              error
                ? "border-red-500 ring-2 ring-red-200"
                : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            }
          `}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-600"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
