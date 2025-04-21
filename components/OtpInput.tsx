"use client";

import React, { useRef } from "react";

type Props = {
  length?: number;
  onChange: (otp: string) => void;
  token?: string;
};

export default function OtpInput({ length = 6, onChange, token }: Props) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    const currentInput = inputsRef.current[index];
    if (!currentInput) return;

    currentInput.value = value;

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    triggerOtpChange();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    pasteData.split("").forEach((char, idx) => {
      const input = inputsRef.current[idx];
      if (input) {
        input.value = char;
      }
    });

    // Focus the last character input
    const last = Math.min(pasteData.length, length) - 1;
    inputsRef.current[last]?.focus();

    triggerOtpChange();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentInput = inputsRef.current[index];
    if (e.key === "Backspace" && !currentInput?.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const triggerOtpChange = () => {
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    onChange(otp);
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          autoFocus={i === 0}
          type="text"
          maxLength={1}
          className="w-10 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={i === 0 ? handlePaste : undefined}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          defaultValue={token ? token[i] : undefined}
        />
      ))}
    </div>
  );
}
