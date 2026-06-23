"use client";

import { useRef } from "react";
import { Camera, Upload, Trash2 } from "lucide-react";
import Image from "next/image";

export default function UploadInput({
  label = "Profile Picture",
  preview,
  onChange,
  onRemove,
  error,
}) {
  const inputRef = useRef(null);

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className={`
          group
          flex
          h-56
          w-full
          flex-col
          items-center
          justify-center
          rounded-3xl
          border-2
          border-dashed
          transition-all
          duration-300

          ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-red-500 hover:bg-red-50"
          }
        `}
        >
          <div className="mb-5 rounded-full bg-red-100 p-5 text-red-600 transition group-hover:scale-110">
            <Upload size={34} />
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            Upload Profile Picture
          </h3>

          <p className="mt-2 text-sm text-gray-500">PNG, JPG or JPEG</p>

          <p className="text-xs text-gray-400">Maximum Size 5MB</p>
        </button>
      ) : (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <Image
              src={preview}
              alt="Preview"
              width={170}
              height={170}
              className="h-40 w-40 rounded-full border-4 border-red-100 object-cover"
            />

            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
              >
                <Camera size={18} />
                Change
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-2 rounded-xl border border-red-600 px-5 py-3 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={18} />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
