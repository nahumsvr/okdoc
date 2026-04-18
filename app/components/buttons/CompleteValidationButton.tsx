import React from "react"

interface CompleteValidationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CompleteValidationButton(props: CompleteValidationButtonProps) {
  return (
    <button
      className="bg-[#002D58] hover:bg-[#003a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
      {...props}
    >
      Complete Validation
    </button>
  )
}
