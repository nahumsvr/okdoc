"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// Suponiendo que los alias @/ apuntan a la raíz del proyecto para store y components
// Si tu archivo useRecordingStore.ts está suelto en la raíz:
import { useRecordingStore } from "../../store/useRecordingStore";

// Y para tu botón, asumiendo que sí creaste una carpeta components:
import RecordButton from "../components/buttons/RecordButton";
export default function ConsultaPage() {
  // Extraemos los estados del Zustand store
  const { isRecording, transcription, entities } = useRecordingStore();
  const [elapsedTime, setElapsedTime] = useState(0);

  // Un timer simple para la UI (visual solamente) si está grabando
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 1. Cabecera */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#002D58] text-white flex items-center justify-center font-bold text-sm tracking-wide">
            JP
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#002D58] leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
              Consulta en curso
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Paciente: <span className="text-gray-800 font-semibold">Juan Pérez</span>
            </p>
          </div>
        </div>

        <Link
          href="/patients"
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          Cancelar / Terminar
        </Link>
      </header>

      {/* Main Layout: Izquierda Transcripción, Derecha Controles y Entidades */}
      <main className="flex flex-1 overflow-hidden">
        {/* Columna Izquierda: Pantalla de Transcripción (Optimistic UI) */}
        <section className="flex flex-col flex-1 p-8 overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Transcripción de audio
          </h2>

          <div className={`flex-1 p-6 bg-white rounded-2xl border ${isRecording ? "border-[#002D58]/30 shadow-md" : "border-gray-200 shadow-sm"} overflow-y-auto relative transition-all duration-500`}>
            {transcription ? (
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {transcription}
              </p>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <p className="text-lg font-medium italic">El texto procesado aparecerá aquí...</p>
                <p className="text-sm opacity-60 mt-1">Presiona el botón de grabar para comenzar el dictado continuo.</p>
              </div>
            )}
          </div>
        </section>

        {/* Columna Derecha: Controles y Panel de Entidades */}
        <section className="w-[400px] border-l border-gray-200 bg-white flex flex-col">
          {/* Zona de control central */}
          <div className="p-8 border-b border-gray-100 flex flex-col items-center justify-center bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-6">Control de Audio</h3>

            <div className="relative mb-4 flex justify-center">
              {/* Posible efecto de pulso si está grabando */}
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping scale-150" />
              )}
              <RecordButton />
            </div>

            {/* Estado de grabación animado */}
            <div className="h-6 flex items-center justify-center mt-2">
              {isRecording ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-sm font-semibold text-red-600 animate-pulse">
                    Grabando continuamente ({formatTime(elapsedTime)})
                  </span>
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-400">Audio inactivo</span>
              )}
            </div>

            {isRecording && (
              <p className="text-xs text-gray-400 mt-2 text-center px-4">
                El sistema está analizando y transcribiendo el audio en tiempo real.
              </p>
            )}
          </div>

          {/* Panel de Entidades Clínicas */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Entidades Detectadas
            </h2>

            {!entities || entities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                <span className="text-sm">Sin entidades detectadas aún.</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {entities.map((entity: any, idx: number) => {
                  // Asignación de colores según la supuesta categoría de la entidad
                  let bgColor = "bg-gray-100";
                  let textColor = "text-gray-700";
                  let borderColor = "border-gray-200";

                  const category = entity?.category?.toLowerCase() || "";
                  if (category.includes("cie") || category.includes("diagnóstico") || category.includes("diagnostico")) {
                    bgColor = "bg-red-50"; textColor = "text-red-700"; borderColor = "border-red-200";
                  } else if (category.includes("síntoma") || category.includes("sintoma")) {
                    bgColor = "bg-amber-50"; textColor = "text-amber-700"; borderColor = "border-amber-200";
                  } else if (category.includes("medicamento") || category.includes("tratamiento")) {
                    bgColor = "bg-emerald-50"; textColor = "text-emerald-700"; borderColor = "border-emerald-200";
                  } else if (category.includes("anatomía") || category.includes("anatomia")) {
                    bgColor = "bg-blue-50"; textColor = "text-blue-700"; borderColor = "border-blue-200";
                  }

                  return (
                    <div
                      key={idx}
                      className={`px-3 py-1.5 rounded-md border ${bgColor} ${textColor} ${borderColor} text-xs font-semibold flex flex-col shadow-sm`}
                    >
                      <span className="uppercase text-[9px] opacity-70 tracking-widest font-bold mb-0.5">
                        {entity.category || "General"}
                      </span>
                      <span>{entity.text || entity.value || entity}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
