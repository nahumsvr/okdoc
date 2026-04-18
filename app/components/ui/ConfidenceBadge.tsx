import React from "react"

interface ConfidenceBadgeProps {
  confidence: number
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return (
    <span className="inline-block text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-2">
      {Math.round(confidence * 100)}% conf.
    </span>
  )
}
