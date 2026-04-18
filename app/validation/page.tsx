"use client";

import { useState, useMemo } from "react"
import Sidebar from "../components/moscati/Sidebar"
import Topbar from "../components/moscati/Topbar"
import FieldCard from "../components/moscati/FieldCard"
import { Report, FieldStatus, ClinicalField } from "../components/moscati/types/moscati"

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

  // Cuenta campos missing para el badge
  const missingCount = useMemo(() => {
    let count = 0
    Object.values(report).forEach((section) => {
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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          patient={{ name: "Juan Pérez", date: "24 Oct 2023" }}
          filter={filter}
          onFilterChange={setFilter}
          missingCount={missingCount}
        />

        <main className="flex-1 overflow-y-auto px-8 py-8 w-full max-w-4xl mx-auto">

          {/* SECCIÓN: Atención Requerida */}
          {showSection(missingCount > 0) && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
                  <div className="p-1.5 bg-red-50 rounded-lg">
                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  Atención Requerida
                </h2>
                {missingCount > 0 && (
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-50">
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
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500 font-black">
                    ✦
                  </div>
                  Revisión General
                </h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">AI Generated</span>
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
            <section className="mb-10">
              <div className="flex items-center gap-2.5 mb-5">
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
                  <div className="p-1.5 bg-emerald-50 rounded-lg">
                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
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

      {/* Quick Fix flotante (Diseño Limpio) */}
      {missingCount > 0 && (
        <button
          onClick={scrollToFirstMissing}
          className="fixed bottom-8 right-10 bg-[#002D58] hover:bg-[#003a70] text-white font-bold rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-blue-200 font-semibold tracking-widest uppercase opacity-90">Siguiente Paso</span>
            <span className="text-sm">Quick Fix</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </div>
        </button>
      )}
    </div>
  )
}