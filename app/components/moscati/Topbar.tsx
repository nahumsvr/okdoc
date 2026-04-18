"use client"

import { Patient } from "@/types/moscati"

interface TopbarProps {
  patient: Patient
  filter: "full" | "missing"
  onFilterChange: (f: "full" | "missing") => void
  missingCount: number
  onCompleteValidation: () => void
}

export default function Topbar({ patient, filter, onFilterChange, missingCount, onCompleteValidation }: TopbarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
      {/* Patient info */}
      <div className="flex gap-8">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Patient</p>
          <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Date</p>
          <p className="text-sm font-semibold text-gray-900">{patient.date}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Filter toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => onFilterChange("full")}
            className={`px-3 py-1.5 text-[13px] font-medium transition-colors ${
              filter === "full" ? "bg-gray-100 text-gray-900 font-semibold" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Full Report
          </button>
          <button
            onClick={() => onFilterChange("missing")}
            className={`px-3 py-1.5 text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
              filter === "missing" ? "bg-gray-100 text-gray-900 font-semibold" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Missing Info Only
            {missingCount > 0 && (
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {missingCount}
              </span>
            )}
          </button>
        </div>

        <button onClick={onCompleteValidation} className="bg-[#002D58] hover:bg-[#003a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors">
          Complete Validation
        </button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Bell */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#002D58] flex items-center justify-center text-white text-xs font-bold">
          JA
        </div>
      </div>
    </header>
  )
}
