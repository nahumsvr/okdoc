"use client"

import { useState, useMemo } from "react"
import Sidebar from "@/components/moscati/Sidebar"
import Topbar from "@/components/moscati/Topbar"
import FieldCard from "@/components/moscati/FieldCard"
import { Report, FieldStatus, ClinicalField } from "@/types/moscati"

// --- MOCK DATA --- reemplazar con fetch al endpoint de Back 1
const MOCK_REPORT: Report = {
  atencionRequerida: {
    motivoConsulta: { value: null, status: "missing" },
    antecedentesFamiliares: { value: null, status: "missing" },
    alergiasConocidas: { value: null, status: "missing" },
  },
  revisionGeneral: {
    diagnosticoPresuntivo: {
      value: "Hipertensión Arterial Grado 1",
      status: "suggested",
      confidence: 0.94,
    },
    tratamientoSugerido: {
      value: "Enalapril 10mg / 12h + Cambios de estilo de vida",
      status: "suggested",
      confidence: 0.88,
    },
  },
  datosConfirmados: {
    signosVitales: {
      value: "TA: 130/85 mmHg, FC: 78 lpm, Temp: 36.5°C",
      status: "validated",
    },
  },
}

const FIELD_LABELS: Record<string, string> = {
  motivoConsulta: "Motivo de Consulta",
  antecedentesFamiliares: "Antecedentes Familiares",
  alergiasConocidas: "Alergias Conocidas",
  diagnosticoPresuntivo: "Diagnóstico Presuntivo",
  tratamientoSugerido: "Tratamiento Sugerido",
  signosVitales: "Signos Vitales",
}

export default function ValidationPage() {
  const [report, setReport] = useState<Report>(MOCK_REPORT)
  const [filter, setFilter] = useState<"full" | "missing">("full")

 const missingCount = useMemo(() => {
  let count = 0
  const sections = Object.values(report) as Record<string, { status: string }>[]
  sections.forEach((section) => {
    Object.values(section).forEach((field) => {
      if (field.status === "missing") count++
    })
  })
  return count
}, [report])

  // Actualiza el status de un campo específico
  const handleStatusChange = (
  section: keyof Report,
  fieldKey: string,
  newStatus: FieldStatus
) => {
  setReport((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [fieldKey]: { ...(prev[section] as Record<string, ClinicalField>)[fieldKey], status: newStatus },
    },
  }))
}

  // Quick Fix: scroll al primer campo missing
  const scrollToFirstMissing = () => {
    const el = document.querySelector("[data-status='missing']")
    el?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const showSection = (hasFields: boolean) => filter === "full" || hasFields

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9F9]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          patient={{ name: "Juan Pérez", date: "24 Oct 2023" }}
          filter={filter}
          onFilterChange={setFilter}
          missingCount={missingCount}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6">

          {/* SECCIÓN: Atención Requerida */}
          {(filter === "full" || missingCount > 0) && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-gray-900" style={{ fontFamily: "Manrope, sans-serif" }}>
                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Atención Requerida
                </h2>
                {missingCount > 0 && (
                  <span className="bg-red-100 text-red-600 text-[11px] font-bold px-3 py-1 rounded-full">
                    {missingCount} MISSING FIELDS
                  </span>
                )}
              </div>

              {Object.entries(report.atencionRequerida)
                .filter(([, f]) => filter === "full" || f.status === "missing")
                .map(([key, field]) => (
                  <div key={key} data-status={field.status}>
                    <FieldCard
                      label={FIELD_LABELS[key]}
                      field={field}
                      onStatusChange={(s) => handleStatusChange("atencionRequerida", key, s)}
                    />
                  </div>
                ))}
            </section>
          )}

          {/* SECCIÓN: Revisión General — AI Generated */}
          {filter === "full" && (
            <section className="mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900" style={{ fontFamily: "Manrope, sans-serif" }}>
                  <span className="text-base">✦</span>
                  Revisión General
                </h2>
                <span className="text-sm font-medium text-gray-400">(AI Generated)</span>
              </div>

              {Object.entries(report.revisionGeneral).map(([key, field]) => (
                <FieldCard
                  key={key}
                  label={FIELD_LABELS[key]}
                  field={field}
                  onStatusChange={(s) => handleStatusChange("revisionGeneral", key, s)}
                />
              ))}
            </section>
          )}

          {/* SECCIÓN: Datos Confirmados */}
          {filter === "full" && (
            <section className="mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900" style={{ fontFamily: "Manrope, sans-serif" }}>
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Datos Confirmados
                </h2>
              </div>

              {Object.entries(report.datosConfirmados).map(([key, field]) => (
                <FieldCard
                  key={key}
                  label={FIELD_LABELS[key]}
                  field={field}
                  onStatusChange={(s) => handleStatusChange("datosConfirmados", key, s)}
                />
              ))}
            </section>
          )}

          <div className="h-20" />
        </main>
      </div>

      {/* Quick Fix flotante */}
      {missingCount > 0 && (
        <button
          onClick={scrollToFirstMissing}
          className="fixed bottom-6 right-8 bg-[#C6A152] hover:bg-[#b8913f] text-white font-bold rounded-xl px-5 py-3 flex flex-col items-center gap-0.5 shadow-lg transition-colors"
        >
          <span className="text-[9px] font-semibold tracking-widest uppercase opacity-80">Next Step</span>
          <span className="flex items-center gap-1.5 text-sm">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
            Quick Fix
          </span>
        </button>
      )}
    </div>
  )
}
