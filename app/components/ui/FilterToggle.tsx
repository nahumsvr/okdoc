import React from "react"

interface FilterToggleProps {
  filter: "full" | "missing"
  onFilterChange: (f: "full" | "missing") => void
  missingCount: number
}

export function FilterToggle({ filter, onFilterChange, missingCount }: FilterToggleProps) {
  return (
    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => onFilterChange("full")}
        className={`px-3 py-1.5 text-[13px] font-medium transition-colors ${
          filter === "full" ? "bg-gray-100 text-gray-900 font-semibold" : "bg-white text-gray-500 hover:bg-gray-50"
        }`}
      >
        Reporte Completo
      </button>
      <button
        onClick={() => onFilterChange("missing")}
        className={`px-3 py-1.5 text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
          filter === "missing" ? "bg-gray-100 text-gray-900 font-semibold" : "bg-white text-gray-500 hover:bg-gray-50"
        }`}
      >
        Solo Información Faltante
        {missingCount > 0 && (
          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {missingCount}
          </span>
        )}
      </button>
    </div>
  )
}
