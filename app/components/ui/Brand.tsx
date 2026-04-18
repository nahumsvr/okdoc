import React from "react"

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-[#002D58] rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div>
        <p className="font-extrabold text-[13px] text-[#002D58] leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
          Clinical Precision
        </p>
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
          Validation Workspace
        </p>
      </div>
    </div>
  )
}
