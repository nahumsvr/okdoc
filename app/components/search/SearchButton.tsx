import React from "react";

interface SearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SearchButton({ children, ...props }: SearchButtonProps) {
  return (
    <button
      className="w-full bg-primary-container text-on-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary transition-colors flex items-center justify-center shadow-md bg-gradient-to-br from-primary-container to-primary shadow-[0_4px_12px_rgba(0,45,88,0.2)] hover:shadow-[0_6px_16px_rgba(0,45,88,0.3)]"
      {...props}
    >
      <span className="material-symbols-outlined mr-2">search</span>
      {children}
    </button>
  );
}
