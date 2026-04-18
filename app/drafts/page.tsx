"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SearchHeader } from "../components/search/SearchHeader";
import Sidebar from "../components/moscati/Sidebar";

export default function DraftsPage() {
  const drafts = [
    { 
      id: 1, 
      date: "Hoy, 10:30 AM", 
      title: "M. González Ruiz - Borrador de Consulta", 
      summary: "Consulta sobre chequeo regular anual y evaluación de rinitis estacionaria.",
      progress: "80%"
    },
    { 
      id: 2, 
      date: "Ayer, 16:45 PM", 
      title: "J. Vargas - Evaluación de Resultados", 
      summary: "Seguimiento de perfil lipídico. Quedó pendiente cargar la sección de Hospitalización.",
      progress: "45%"
    },
    { 
      id: 3, 
      date: "Jueves pasado, 09:15 AM", 
      title: "A. Robles - Ingreso General", 
      summary: "Paciente de nuevo ingreso con síntomas febriles. Formulario parcialmente llenado por Recepción.",
      progress: "20%"
    }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />
      
      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />

        <main className="flex-1 overflow-y-auto max-w-7xl mx-auto px-6 pt-10 pb-32 lg:grid lg:grid-cols-12 lg:gap-12 w-full">
          {/* Left Column: Drafts */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <h2 className="font-headline text-3xl font-extrabold text-[#002D58] tracking-tight">
                Borradores Activos
              </h2>
              <span className="text-sm font-bold text-[#C6A152] bg-[#C6A152]/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#C6A152]/20">
                {drafts.length} Pendientes
              </span>
            </div>

            <div className="space-y-4">
              {drafts.map(draft => {
                const isExpanded = expandedId === draft.id;

                return (
                  <div 
                    key={draft.id} 
                    className={`bg-surface-container-lowest border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'shadow-lg border-[#C6A152]/50 scale-[1.01]' 
                        : 'shadow-sm border-outline-variant/40 hover:border-[#C6A152]/30 hover:shadow-md'
                    }`}
                  >
                    <div 
                      onClick={() => toggleExpand(draft.id)}
                      className="p-5 flex items-center justify-between cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`h-14 w-14 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isExpanded 
                            ? 'bg-[#002D58] text-white shadow-md' 
                            : 'bg-surface-container text-[#43474f] group-hover:bg-[#C6A152]/10 group-hover:text-[#C6A152]'
                        }`}>
                          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            draft
                          </span>
                        </div>
                        <div>
                          <p className="font-extrabold text-on-surface text-lg group-hover:text-[#002D58] transition-colors">
                            {draft.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-outline-variant group-hover:bg-[#C6A152] transition-colors"></span>
                            <p className="text-xs font-bold tracking-widest text-[#43474f] uppercase">
                              Ultima moficicación: {draft.date}
                            </p>
                            <span className="ml-3 text-[10px] font-bold text-[#C6A152] uppercase bg-[#C6A152]/10 px-2 py-0.5 rounded-md">
                              Progreso: {draft.progress}
                            </span>
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
                          {/* Summary Block */}
                          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002D58] origin-top"></div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <span className="material-symbols-outlined text-[#002D58] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                              <span className="text-xs font-extrabold text-[#002D58] uppercase tracking-widest">Resumen del progreso</span>
                            </div>
                            <p className="text-[#1a1c1c] text-base leading-relaxed medium opacity-90">
                              {draft.summary}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                            <Link href="/formulario" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#002D58] hover:bg-[#002D58]/90 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95">
                              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
                              Continuar Editando
                            </Link>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-outline-variant/50 hover:border-[#C6A152] hover:text-[#C6A152] text-[#43474f] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 group">
                              <span className="material-symbols-outlined text-[20px] group-hover:text-[#C6A152]">delete</span>
                              Descartar Borrador
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

          {/* Right Column: Context Information */}
          <aside className="lg:col-span-4 mt-12 lg:mt-0 space-y-8">
            <div className="bg-[#f0f4f8] rounded-2xl p-6 border border-[#002D58]/10 mt-8">
               <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#C6A152] p-2 rounded-lg text-white">
                   <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    tips_and_updates
                  </span>
                </div>
                <h2 className="font-headline text-lg font-bold text-[#002D58]">Información</h2>
              </div>
              <p className="font-body text-[#43474f] leading-relaxed text-sm">
                Los borradores se guardan automáticamente durante tu consulta. Se eliminan automáticamente después de 30 días si no se retoman.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
