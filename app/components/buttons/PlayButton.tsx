import React from "react"

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PlayButton(props: PlayButtonProps) {
  return (
    <button
      title="Reproducir audio"
      className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
      {...props}
    >
      <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </button>
  )
}
