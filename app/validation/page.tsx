"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/moscati/Sidebar";
import Topbar from "../components/moscati/Topbar";
import FieldCard from "../components/moscati/FieldCard";
import {
  Report,
  FieldStatus,
  ClinicalField,
} from "../components/moscati/types/moscati";

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
};

const FIELD_LABELS: Record<string, string> = {
  motivoConsulta: "Motivo de Consulta",
  antecedentesFamiliares: "Antecedentes Familiares",
  alergiasConocidas: "Alergias Conocidas",
  diagnosticoPresuntivo: "Diagnóstico Presuntivo",
  tratamientoSugerido: "Tratamiento Sugerido",
  signosVitales: "Signos Vitales",
};

export default function ValidationPage() {
  const router = useRouter();
  const [report, setReport] = useState<Report>(MOCK_REPORT);
  const [filter, setFilter] = useState<"full" | "missing">("full");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const profile = await response.json();
          localStorage.setItem("user_profile", JSON.stringify(profile));
        }
      } catch (err) {
        console.error("Error al obtener el perfil", err);
      }
    };
    fetchProfile();
  }, []);

  // Determina si mostrar una sección con base en el filtro
  const showSection = (hasMissingItems: boolean) =>
    filter === "full" || hasMissingItems;

  // Cuenta campos missing para el badge
  const missingCount = useMemo(() => {
    let count = 0;
    Object.values(report).forEach((section) => {
      Object.values(section).forEach((field: any) => {
        if (field.status === "missing") count++;
      });
    });
    return count;
  }, [report]);

  // Actualiza el status de un campo específico
  const handleStatusChange = (
    section: keyof Report,
    fieldKey: string,
    newStatus: FieldStatus,
    newValue?: string,
  ) => {
    setReport((prev) => {
      const sectionData = prev[section] as Record<string, ClinicalField>;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [fieldKey]: {
            ...sectionData[fieldKey],
            status: newStatus,
            value:
              newValue !== undefined ? newValue : sectionData[fieldKey].value,
          },
        },
      };
    });
  };

  // Quick Fix: Auto-rellena todos los missing con respuestas de la IA
  const handleQuickFix = () => {
    setReport((prev) => {
      const updated = { ...prev };

      // Auto-fill atencionRequerida
      if (updated.atencionRequerida.motivoConsulta.status === "missing") {
        updated.atencionRequerida.motivoConsulta = {
          value: "Chequeo general preventivo",
          status: "suggested",
          confidence: 0.95,
        };
      }
      if (
        updated.atencionRequerida.antecedentesFamiliares.status === "missing"
      ) {
        updated.atencionRequerida.antecedentesFamiliares = {
          value: "Madre con Diabetes Tipo 2",
          status: "suggested",
          confidence: 0.89,
        };
      }
      if (updated.atencionRequerida.alergiasConocidas.status === "missing") {
        updated.atencionRequerida.alergiasConocidas = {
          value: "Ninguna conocida (Reportado por paciente)",
          status: "suggested",
          confidence: 0.99,
        };
      }

      return updated;
    });
    setFilter("full");
  };

  const handleCompleteValidation = () => {
    setIsCompleted(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          patient={{ name: "Juan Pérez", date: "24 Oct 2023" }}
          filter={filter}
          onFilterChange={setFilter}
          missingCount={missingCount}
          onCompleteValidation={handleCompleteValidation}
        />

        <main className="flex-1 overflow-y-auto px-8 py-8 w-full max-w-4xl mx-auto">
          {/* SECCIÓN: Atención Requerida */}
          {showSection(missingCount > 0) && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
                  <div className="p-1.5 bg-red-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  Atención Requerida
                </h2>
                {missingCount > 0 && (
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-50">
                    {missingCount} CAMPOS FALTANTES
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
                      onStatusChange={(s, val) =>
                        handleStatusChange("atencionRequerida", key, s, val)
                      }
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
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Generado por IA
                </span>
              </div>

              {Object.entries(report.revisionGeneral).map(([key, field]) => (
                <FieldCard
                  key={key}
                  label={FIELD_LABELS[key]}
                  field={field}
                  onStatusChange={(s, val) =>
                    handleStatusChange("revisionGeneral", key, s, val)
                  }
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
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
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
                  onStatusChange={(s, val) =>
                    handleStatusChange("datosConfirmados", key, s, val)
                  }
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
          onClick={handleQuickFix}
          className="fixed bottom-8 right-10 bg-gradient-to-r from-[#002D58] to-[#C6A152] text-white font-bold rounded-2xl px-6 py-4 flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(198,161,82,0.5)] transition-all hover:scale-105"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-white/80 font-semibold tracking-widest uppercase">
              Auto Resolución IA
            </span>
            <span className="text-sm">Rellenar Info Faltante</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-white text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
          </div>
        </button>
      )}

      {/* Modal De Validación Completa */}
      {isCompleted && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-inner">
              <span className="material-symbols-outlined text-4xl font-bold">
                check_circle
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#002D58] mb-2">
              Validación Exitosa
            </h3>
            <p className="text-sm font-medium text-gray-500 mb-8">
              El reporte de Juan Pérez se ha firmado y sincronizado con el
              ecosistema OkDoc.
            </p>
            <button
              onClick={() => router.push("/reports")}
              className="w-full bg-[#002D58] hover:bg-[#001834] text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Ir al Archivo de Reportes
            </button>
            <button
              onClick={() => setIsCompleted(false)}
              className="w-full mt-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Seguir Editando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
