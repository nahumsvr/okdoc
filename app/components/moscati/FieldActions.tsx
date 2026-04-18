"use client"

import { FieldStatus } from "./types/moscati"

interface FieldActionsProps {
  status: FieldStatus
  onConfirm: () => void
  onEdit: () => void
  onPlay: () => void
}

export default function FieldActions({ status, onConfirm, onEdit, onPlay }: FieldActionsProps) {
  return (
    <div className="flex items-center gap-1 mt-3">
      {/* Play */}
      <button
        onClick={onPlay}
        title="Reproducir audio"
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>

      {/* Edit */}
      <button
        onClick={onEdit}
        title="Editar manualmente"
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {/* Confirm */}
      {status !== "validated" && (
        <button
          onClick={onConfirm}
          title="Confirmar campo"
          className="w-8 h-8 rounded-full flex items-center justify-center text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors ml-auto"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      )}
    </div>
  )
}