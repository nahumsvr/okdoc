"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/moscati/Sidebar";

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const patientId = resolvedParams.id;
  const isMaria = patientId === "1029-MCP-24";
  
  // Data centralizada
  const patientName = isMaria ? "Maria" : "Paciente";
  const patientLastName = isMaria ? "González Ruiz" : "Desconocido";
  const patientAge = isMaria ? 34 : "--";

  // Mock de consultas pasadas
  const pastConsultations = [
    { 
      id: 1, 
      date: "12 Oct 2023", 
      title: "Control General - Resultados Normales", 
      aiSummary: "Paciente acude a chequeo regular anual. Signos vitales en parámetros normales. Se comprobó la correcta asimilación de su tratamiento anticonceptivo y se recomendó mantener estilo de vida activo." 
    },
    { 
      id: 2, 
      date: "05 May 2023", 
      title: "Seguimiento Hipertensión Leve", 
      aiSummary: "Presión arterial ligeramente elevada (130/85). La paciente reporta episodios de estrés laboral en las últimas semanas. Se ajusta seguimiento y se orienta en técnicas de relajación." 
    },
    { 
      id: 3, 
      date: "20 Ene 2023", 
      title: "Consulta por Rinitis Alérgica", 
      aiSummary: "Consulta por congestión nasal y estornudos concurrentes a la temporada. Susceptibilidad al polen. Se receta antihistamínico estándar por 7 días con revisión posterior." 
    }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      {/* Navbar Centrado con Datos */}
      <header className="bg-white shadow-[0_4px_16px_-4px_rgba(0,45,88,0.05)] sticky top-0 z-40 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-12">
            <Link href="/patients/search" className="hover:bg-surface-container transition-colors p-2 rounded-full inline-flex">
              <span className="material-symbols-outlined text-[#002D58]">arrow_back</span>
            </Link>
          </div>

          <div className="flex flex-col items-center flex-1">
            <h1 className="font-headline text-on-surface font-extrabold text-xl md:text-2xl tracking-tight">
              {patientName} {patientLastName}
              <span className="text-on-surface-variant font-medium text-lg ml-3 pl-3 border-l-2 border-outline-variant/50">
                {patientAge} años
              </span>
            </h1>
            <span className="text-[11px] font-semibold tracking-widest text-[#43474f] uppercase mt-1 bg-surface-container px-3 py-0.5 rounded-full">
              ID: {patientId}
            </span>
          </div>

          <div className="w-12 text-right">
            <button className="hover:bg-surface-container transition-colors p-2 rounded-full inline-flex">
              <span className="material-symbols-outlined text-[#43474f]">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />

        <main className="flex-1 overflow-y-auto max-w-7xl mx-auto px-6 pt-10 pb-32 lg:grid lg:grid-cols-12 lg:gap-12 w-full">
          {/* Left Column: Consultas Pasadas (Protagonist) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <h2 className="font-headline text-3xl font-extrabold text-[#002D58] tracking-tight">
              Consultas Pasadas
            </h2>
            <span className="text-sm font-bold text-[#C6A152] bg-[#C6A152]/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#C6A152]/20">
              {pastConsultations.length} Registros
            </span>
          </div>

          <div className="space-y-4">
            {pastConsultations.map(consult => {
              const isExpanded = expandedId === consult.id;

              return (
                <div 
                  key={consult.id} 
                  className={`bg-surface-container-lowest border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'shadow-lg border-[#002D58]/20 scale-[1.01]' 
                      : 'shadow-sm border-outline-variant/40 hover:border-[#002D58]/30 hover:shadow-md'
                  }`}
                >
                  <div 
                    onClick={() => toggleExpand(consult.id)}
                    className="p-5 flex items-center justify-between cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded 
                          ? 'bg-[#002D58] text-white shadow-md' 
                          : 'bg-surface-container text-[#43474f] group-hover:bg-[#002D58]/10 group-hover:text-[#002D58]'
                      }`}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          clinical_notes
                        </span>
                      </div>
                      <div>
                        <p className="font-extrabold text-on-surface text-lg group-hover:text-[#002D58] transition-colors">
                          {consult.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 rounded-full bg-outline-variant group-hover:bg-[#C6A152] transition-colors"></span>
                          <p className="text-xs font-bold tracking-widest text-[#43474f] uppercase">
                            {consult.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      isExpanded ? 'bg-surface-container' : 'group-hover:bg-surface-container'
                    }`}>
                      <span className={`material-symbols-outlined text-2xl transition-transform duration-300 text-[#43474f] ${
                        isExpanded ? 'rotate-180 text-[#002D58]' : ''
                      }`}>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Acciones Extensibles (Accordion Body) */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out bg-[#f9fafb] border-t border-outline-variant/20 ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 border-t-transparent'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 md:p-8 space-y-6">
                        {/* Summary Block AI */}
                        <div className="bg-secondary-container/15 border border-secondary/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
                          {/* Accent line */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary origin-top"></div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest">Resumen del Formulario</span>
                          </div>
                          <p className="text-[#1a1c1c] text-base leading-relaxed italic font-medium opacity-90">
                            &quot;{consult.aiSummary}&quot;
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#002D58] hover:bg-[#002D58]/90 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                            Visualizar Formulario
                          </button>
                          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-outline-variant/50 hover:border-[#C6A152] hover:text-[#C6A152] text-[#43474f] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 group">
                            <span className="material-symbols-outlined text-[20px] group-hover:text-[#C6A152]">download</span>
                            Descargar
                          </button>
                          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-outline-variant/50 hover:border-[#002D58] hover:text-[#002D58] text-[#43474f] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 group">
                            <span className="material-symbols-outlined text-[20px] group-hover:text-[#002D58]">print</span>
                            Imprimir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Síntomas y Contexto */}
        <aside className="lg:col-span-4 mt-12 lg:mt-0 space-y-8">
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-extrabold text-primary-container tracking-tight border-b border-outline-variant/30 pb-3">
              Hallazgos Previos
            </h3>
            
            {/* Síntomas Reportados a la derecha */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1 ml-1">Síntomas Reportados</label>
              <div className="bg-surface-container-lowest border-l-4 border-secondary p-5 shadow-[0_8px_24px_-4px_rgba(0,45,88,0.06)] rounded-r-xl group hover:shadow-md transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full w-max">
                    <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Sugerencia IA</span>
                  </div>
                  <span className="text-on-surface font-extrabold text-xl leading-tight">Rinitis, Estornudos, Congestión nasal</span>
                </div>
              </div>
            </div>

            {/* Validated (Green Accent) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1 ml-1 mt-6">Alergias Conocidas</label>
              <div className="bg-surface-container-lowest border-l-4 border-[#008542] p-5 shadow-[0_8px_24px_-4px_rgba(0,45,88,0.06)] rounded-r-xl group transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 bg-[#008542]/10 px-3 py-1 rounded-full w-max">
                    <span className="material-symbols-outlined text-[#008542] text-[14px]">check_circle</span>
                    <span className="text-[10px] font-bold text-[#008542] uppercase tracking-widest">Validado</span>
                  </div>
                  <span className="text-on-surface font-extrabold text-xl leading-tight">Polen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f4f8] rounded-2xl p-6 border border-[#002D58]/10 mt-8">
             <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#002D58] p-2 rounded-lg text-white">
                 <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  monitoring
                </span>
              </div>
              <h2 className="font-headline text-lg font-bold text-[#002D58]">Análisis Actual</h2>
            </div>
            <p className="font-body text-[#43474f] leading-relaxed text-sm">
              Con base en las <b>3 consultas recientes</b>, la paciente muestra estabilidad sistémica. El factor principal a observar es la rinitis estacionaria registrada recurrentemente.
            </p>
          </div>
        </aside>
        </main>
      </div>

      {/* Floating Action Button (FAB Context) */}
      <button className="fixed bottom-24 right-6 w-16 h-16 bg-[#C6A152] text-white rounded-full shadow-[0_12px_28px_rgba(198,161,82,0.45)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_document</span>
      </button>

      {/* Bottom Action Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md flex justify-center items-center px-4 py-3 border-t border-outline-variant/30 z-40">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <button className="w-full md:w-auto bg-[#002D58] hover:bg-[#002D58]/90 text-white font-extrabold py-4 px-12 rounded-xl shadow-lg transition-all active:translate-y-1 tracking-wide">
            NUEVA CONSULTA
          </button>
        </div>
      </nav>
    </div>
  );
}
