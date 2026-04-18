import React from "react"
import { FieldStatus } from "@/types/moscati"

interface ConfirmButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: FieldStatus
}

export function ConfirmButton({ status, ...props }: ConfirmButtonProps) {
  const confirmStyle =
    status === "missing"
      ? "bg-red-50 border-red-300 hover:bg-red-100"
      : status === "suggested"
      ? "bg-[#002D58] border-[#002D58] hover:bg-[#003a70]"
      : "bg-emerald-50 border-emerald-300"

  const confirmIconColor =
    status === "missing"
      ? "text-red-500"
      : status === "suggested"
      ? "text-white"
      : "text-emerald-500"

  return (
    <button
      title="Confirmar campo"
      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${confirmStyle}`}
      {...props}
    >
      <svg className={`w-3.5 h-3.5 ${confirmIconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  )
}
