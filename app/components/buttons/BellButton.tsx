import React from "react"

interface BellButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function BellButton(props: BellButtonProps) {
  return (
    <button className="text-gray-400 hover:text-gray-600 transition-colors" {...props}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </button>
  )
}
