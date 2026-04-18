import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function SearchInput({ label, id, ...props }: SearchInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-on-surface-variant mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-surface-container-high border-0 border-b-2 border-outline text-on-surface focus:ring-0 focus:border-primary-container p-3 rounded-t transition-colors"
        type="text"
        {...props}
      />
    </div>
  );
}
