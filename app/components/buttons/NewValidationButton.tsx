import React from "react"

export function NewValidationButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="w-full bg-[#002D58] hover:bg-[#003a70] text-white text-[13px] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
      {...props}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M12 5v14M5 12h14" />
      </svg>
      New Validation
    </button>
  )
}
