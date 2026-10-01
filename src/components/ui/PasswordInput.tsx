"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  helperText?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••••••",
  required = true,
  id,
  name,
  helperText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <KeyRound className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#06080a] border border-cyan-400/30 rounded-lg py-2.5 pl-9 pr-10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cyan-300 transition-colors p-1 cursor-pointer"
          aria-label={showPassword ? "Hide cipher password" : "Show cipher password"}
        >
          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>
      {helperText && (
        <span className="text-[10px] text-muted/60 mt-1 block font-mono">
          {helperText}
        </span>
      )}
    </div>
  );
}
