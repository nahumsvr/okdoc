import React from "react"

export function CompleteValidationButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-[#002D58] hover:bg-[#003a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
      {...props}
    >
      Complete Validation
    </button>
  )
}
