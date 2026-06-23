"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const icon = isDark ? <Sun className="size-6 text-white" /> : <Moon className="size-6 text-black" />;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${isDark ? "bg-gray-600 hover:bg-gray-700" : "bg-white hover:bg-gray-200"}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {icon}
    </button>
  );
}
