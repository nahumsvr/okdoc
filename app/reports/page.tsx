"use client";
import React, { useState } from "react";
import { SearchHeader } from "../components/search/SearchHeader";
import Sidebar from "../components/moscati/Sidebar";

export default function ReportArchivePage() {
  const reports = [
    {
      id: "RPT-2023-8941",
      date: "14 Oct 2023",
      patient: "Maria González Ruiz",
      type: "Consulta Clínica",
      physician: "Dr. A. Valdés",
      status: "Firmado",
      summary: "Paciente asiste a chequeo mensual. Signos vitales estables. Rinitis alérgica controlada con loratadina. Se descarta cuadro infeccioso tras examen físico.",
      aiExtracted: ["Rinitis", "Loratadina", "Presión: 120/80"]
    },
    {
      id: "RPT-2023-8820",
      date: "12 Oct 2023",
      patient: "Carlos Jimenez T.",
      type: "Resultados Laboratorio",
      physician: "Dra. L. Campos",
      status: "Requiere Atención",
      summary: "Resultados de perfil lipídico muestran triglicéridos elevados (240 mg/dL). Colesterol total en límite superior normal.",
      aiExtracted: ["Triglicéridos Altos", "Dieta Restrictiva Sugerida"]
    },
    {
      id: "RPT-2023-8755",
      date: "05 Oct 2023",
      patient: "Ana S. Rivas",
      type: "Imagenología (Rayos X)",
      physician: "Dr. M. Riquelme",
      status: "Borrador IA",
      summary: "Radiografía de tórax A/P. Ligero infiltrado basal derecho, posible congestión inicial. No se observan fracturas costales.",
      aiExtracted: ["Infiltrado basal der.", "Vigilancia respiratoria"]
    },
    {
      id: "RPT-2023-8612",
      date: "28 Sep 2023",
      patient: "Roberto C. Ávila",
      type: "Evolución Hospitalaria",
      physician: "Dr. A. Valdés",
      status: "Firmado",
      summary: "Paciente en día 2 postoperatorio de apendicectomía no complicada. Tolera vía oral, deambula sin mareos. Herida quirúrgica limpia.",
      aiExtracted: ["Postoperatorio", "Apendicectomía", "Alta inminente"]
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-[#f8f9fa] text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />
      
      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
          
          {/* Top Control Bar */}
          <div className="bg-white px-8 py-5 border-b border-outline-variant/30 shrink-0 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-headline text-2xl font-extrabold text-[#002D58] tracking-tight">
                    Report Archive
                  </h1>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-0.5">
                    14,284 Registros Totales
                  </p>
                </div>
                
                <div className="flex bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-1">
                   <button className="px-3 py-1.5 flex items-center gap-2 bg-white shadow-sm border border-outline-variant/30 rounded-md text-xs font-bold text-[#002D58]">
                     <span className="material-symbols-outlined text-[16px]">view_list</span>
                     Cómodo
                   </button>
                   <button className="px-3 py-1.5 flex items-center gap-2 text-on-surface-variant hover:text-[#002D58] rounded-md text-xs font-semibold transition-colors">
                     <span className="material-symbols-outlined text-[16px]">density_small</span>
                     Denso
                   </button>
                </div>
             </div>

             {/* Pill Filters */}
             <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[#002D58] text-white text-xs font-bold tracking-wide">
                  Todos
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white border border-outline-variant text-[#43474f] hover:bg-surface-container transition-colors text-xs font-bold tracking-wide">
                  Firmados
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-error/10 border border-error/20 text-error hover:bg-error/20 transition-colors text-xs font-bold tracking-wide flex items-center gap-1.5">
                  Requiere Atención
                  <span className="bg-error text-white text-[9px] px-1.5 rounded-full">12</span>
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[#C6A152]/10 border border-[#C6A152]/20 text-[#be933a] hover:bg-[#C6A152]/20 transition-colors text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  Borradores IA
                </button>
             </div>
          </div>

          {/* Data Grid Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
             <div className="bg-white border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden min-w-[900px]">
                
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#f8f9fa] border-b border-outline-variant/40 select-none">
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-[#88909b]">ID Reporte</div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-[#88909b]">Fecha</div>
                  <div className="col-span-3 text-xs font-bold uppercase tracking-widest text-[#88909b]">Paciente</div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-[#88909b]">Tipo</div>
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-[#88909b]">Médico</div>
                  <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-[#88909b] text-right">Estado</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-outline-variant/20">
                  {reports.map((report) => {
                     const isExpanded = expandedId === report.id;
                     return (
                      <React.Fragment key={report.id}>
                        {/* Main Row */}
                        <div 
                          onClick={() => toggleRow(report.id)}
                          className={`grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer transition-colors ${
                            isExpanded ? 'bg-[#002D58]/[0.02]' : 'bg-white hover:bg-[#f8f9fa]'
                          }`}
                        >
                          <div className="col-span-2 text-sm font-black text-[#002D58] flex items-center">
                            {report.id}
                          </div>
                          <div className="col-span-2 text-sm font-medium text-[#43474f] flex items-center">
                            {report.date}
                          </div>
                          <div className="col-span-3 text-sm font-bold text-on-surface flex items-center">
                            {report.patient}
                          </div>
                          <div className="col-span-2 text-sm font-medium text-[#43474f] flex items-center">
                            {report.type}
                          </div>
                          <div className="col-span-2 text-sm font-medium text-[#43474f] flex items-center">
                            {report.physician}
                          </div>
                          <div className="col-span-1 flex items-center justify-end">
                            {report.status === 'Firmado' && (
                              <span className="material-symbols-outlined text-[#008542]" title="Firmado">check_circle</span>
                            )}
                            {report.status === 'Requiere Atención' && (
                              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }} title="Requiere Atención">error</span>
                            )}
                            {report.status === 'Borrador IA' && (
                              <span className="material-symbols-outlined text-[#C6A152]" style={{ fontVariationSettings: "'FILL' 1" }} title="Borrador IA">auto_awesome</span>
                            )}
                          </div>
                        </div>

                        {/* Expanded Drawer (Progressive Disclosure) */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#002D58]/[0.02] ${
                          isExpanded ? 'max-h-96 opacity-100 border-b border-outline-variant/30' : 'max-h-0 opacity-0 border-none'
                        }`}>
                           <div className="p-6 md:p-8 pl-[16.666%] pr-12">
                              <div className="flex gap-8">
                                 {/* Summary */}
                                 <div className="flex-1">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Resumen Clínico</h4>
                                    <p className="text-sm font-body text-[#1a1c1c] leading-relaxed">
                                      {report.summary}
                                    </p>
                                 </div>
                                 {/* Extracted Tags & Actions */}
                                 <div className="w-64 shrink-0 flex flex-col justify-between">
                                    <div>
                                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C6A152] mb-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                        Tags Entrenados
                                      </h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {report.aiExtracted.map((tag, idx) => (
                                          <span key={idx} className="bg-white border border-[#C6A152]/30 text-[#C6A152] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                      <button className="flex-1 bg-[#002D58] text-white text-xs font-bold py-2 rounded-md hover:bg-[#001834] transition-colors shadow-sm">
                                        Abrir Documento
                                      </button>
                                      <button className="px-3 bg-white border border-outline-variant text-[#43474f] text-xs font-bold py-2 rounded-md hover:bg-surface-container transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[16px] block">more_horiz</span>
                                      </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </React.Fragment>
                     )
                  })}
                </div>

             </div>
          </div>

        </main>
      </div>
    </div>
  );
}
