"use client"

import { useState } from "react"
import { ClinicalField } from "@/types/moscati"
import FieldActions from "./FieldActions"

interface FieldCardProps {
  label: string
  field: ClinicalField
  onStatusChange: (newStatus: "validated") => void
}

const statusStyles = {
  missing: {
    card: "border-l-4 border-l-red-500 bg-red-50",
    label: "text-red-600",
    value: "text-red-500 italic",
  },
  suggested: {
    card: "border-l-4 border-l-amber-400 bg-amber-50/50",
    label: "text-amber-600",
    value: "text-gray-900",
  },
  validated: {
    card: "border-l-4 border-l-emerald-500 bg-emerald-50/40",
    label: "text-emerald-600",
    value: "text-gray-900",
  },
}

export default function FieldCard({ label, field, onStatusChange }: FieldCardProps) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(field.value ?? "")
  const [currentField, setCurrentField] = useState<ClinicalField>(field)

  const styles = statusStyles[currentField.status]

  const handleConfirm = () => {
    setCurrentField({ ...currentField, status: "validated", value: localValue || currentField.value })
    setEditing(false)
    onStatusChange("validated")
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handlePlay = () => {
    // Front 2 conectará esto con WebSockets / audio
    console.log("play audio for:", label)
  }

  const displayValue = localValue || currentField.value

  return (
    <div className={`rounded-lg border border-gray-200 p-4 mb-3 transition-all duration-200 ${styles.card}`}>
      {/* Label */}
      <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1.5 ${styles.label}`}>
        {label}
      </p>

      {/* Confidence badge — solo en suggested */}
      {currentField.status === "suggested" && currentField.confidence && (
        <span className="inline-block text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-2">
          {Math.round(currentField.confidence * 100)}% conf.
        </span>
      )}

      {/* Value / input editable */}
      {editing ? (
        <input
          autoFocus
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          placeholder="Ingresar información manualmente..."
          className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002D58] mb-1"
        />
      ) : (
        <p className={`text-sm font-medium mb-1 ${styles.value}`}>
          {currentField.status === "missing" && !displayValue
            ? "Información no encontrada en el audio"
            : displayValue}
        </p>
      )}

      {/* Meta — solo en suggested */}
      {currentField.status === "suggested" && (
        <p className="text-[11px] text-gray-400 mb-1">
          AI Suggestion — pendiente de validación humana
        </p>
      )}

      {/* Confirmed badge — solo en validated */}
      {currentField.status === "validated" && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          CONFIRMED
        </span>
      )}

      {/* Actions */}
      <FieldActions
        status={currentField.status}
        onConfirm={handleConfirm}
        onEdit={handleEdit}
        onPlay={handlePlay}
      />
    </div>
  )
}