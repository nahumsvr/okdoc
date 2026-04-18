"use client"

import { useState } from "react"
import type { ClinicalField } from "./types/moscati"
import FieldActions from "./FieldActions"

interface FieldCardProps {
  label: string
  field: ClinicalField
  onStatusChange: (newStatus: "validated", newValue?: string) => void
}

export default function FieldCard({ label, field, onStatusChange }: FieldCardProps) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(field.value ?? "")
  const [currentField, setCurrentField] = useState<ClinicalField>(field)

  const handleConfirm = () => {
    const newValue = localValue || currentField.value;
    setCurrentField({ ...currentField, status: "validated", value: newValue })
    setEditing(false)
    onStatusChange("validated", newValue)
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handlePlay = () => {
    console.log("play audio for:", label)
  }

  const displayValue = localValue || currentField.value

  const isMissing = currentField.status === "missing"
  const isSuggested = currentField.status === "suggested"
  const isValidated = currentField.status === "validated"

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-4 transition-all duration-200">

      {/* Header of the card */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            {label}
          </p>
          {isMissing && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
              FALTANTE
            </span>
          )}
          {isSuggested && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
              SUGERIDO POR IA
            </span>
          )}
          {isValidated && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              CONFIRMADO
            </span>
          )}
        </div>
        {/* Confidence Meta */}
        {isSuggested && currentField.confidence && (
          <span className="text-[10px] font-medium text-gray-400">
            {Math.round(currentField.confidence * 100)}% conf.
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mb-2">
        {editing ? (
          <input
            autoFocus
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            placeholder="Ingresar información manualmente..."
            className="w-full text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#002D58] focus:bg-white transition-colors"
          />
        ) : (
          <p className={`text-sm font-medium leading-relaxed ${isMissing && !displayValue ? "text-red-400 italic" : "text-gray-900"}`}>
            {isMissing && !displayValue
              ? "Información no encontrada en el audio."
              : displayValue}
          </p>
        )}
      </div>

      {/* Actions Section */}
      <div className="border-t border-gray-50 mt-3 pt-1">
        <FieldActions
          status={currentField.status}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
          onPlay={handlePlay}
        />
      </div>
    </div>
  )
}