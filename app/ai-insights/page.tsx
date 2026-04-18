"use client";
import React, { useState } from "react";
import { SearchHeader } from "../components/search/SearchHeader";
import Sidebar from "../components/moscati/Sidebar";

export default function AiInsightsPage() {
  const insights = [
    {
      id: 1,
      severity: "high",
      time: "Hace 10 min",
      title: "Anomalía en Prescripciones de Antibióticos",
      shortDesc: "Aumento del 24% en prescripciones de Amoxicilina para afecciones no bacterianas confirmadas en la última semana.",
      reasoning: [
        "1. Análisis transversal de la tabla de 'Diagnósticos vs. Recetas'.",
        "2. Identificación de 45 casos marcados con RSI (Infección Respiratoria Simple).",
        "3. El 24% de estos casos resultaron en prescripción antibiótica saltándose el protocolo de observación de 72h."
      ],
      recommendation: "Emitir recordatorio de protocolo a personal de medicina general."
    },
    {
      id: 2,
      severity: "medium",
      time: "Hace 2 horas",
      title: "Optimización de Flujo de Pacientes",
      shortDesc: "Cuello de botella detectado en el área de Triage entre las 10:00 y 11:30 AM.",
      reasoning: [
        "1. Tiempo medio de espera en sala alcanzó 45 minutos durante la franja.",
        "2. Sólo 2 de 4 estaciones de Triage se encontraban operativas.",
        "3. Patrón repetitivo los últimos 3 martes."
      ],
      recommendation: "Reasignar un miembro de enfermería a Triage los martes de 9:00 a 12:00 AM."
    },
    {
      id: 3,
      severity: "low",
      time: "Ayer",
      title: "Cruce de Datos: Alergias no documentadas",
      shortDesc: "12 pacientes recientes mencionaron episodios de alergia cutánea en notas no estructuradas, sin actualizar la ficha principal.",
      reasoning: [
        "1. Procesamiento de Lenguaje Natural (NLP) aplicado a notas de enfermería y descripciones de admisión.",
        "2. Palabras clave 'Sarpullido', 'Picazón' e 'Hinchazón' detectadas recurrentemente después de cenar o tomar medicación.",
        "3. Ausencia del flag correspondiente en DB_Allergies."
      ],
      recommendation: "Validar historiales usando el Asistente de Extracción Estructurada."
    }
  ];

  const [selectedInsight, setSelectedInsight] = useState(insights[0]);

  return (
    <div className="bg-[#001834] text-white h-screen overflow-hidden flex flex-col antialiased">
      <div className="brightness-90">
         <SearchHeader />
      </div>
      
      <div className="flex flex-1 overflow-hidden h-full relative">
        <div className="bg-white">
           <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto w-full p-6 md:p-8 lg:p-10 relative">
           
           {/* Futuristic Ambient Glow Background */}
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C6A152] rounded-full blur-[200px] opacity-[0.15] pointer-events-none"></div>
           
           <div className="max-w-[1400px] mx-auto z-10 relative h-full flex flex-col">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 gap-4 mb-8">
              <div>
                <h1 className="font-headline text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#C6A152] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  Centro de Inteligencia Médica
                </h1>
                <p className="text-sm font-medium text-white/50 mt-1 max-w-xl">
                  Motor de inferencia global detectando patrones ocultos y de optimización operativa en OkDoc.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
                <button className="px-4 py-2 rounded-lg bg-[#C6A152] text-[#001834] font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(198,161,82,0.4)]">
                   En Vivo
                </button>
                 <button className="px-4 py-2 rounded-lg text-white/50 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">
                   Archivados
                </button>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100%-100px)]">
               
               {/* Left Panel: Timeline Feed */}
               <div className="lg:col-span-5 h-full overflow-y-auto pr-4 custom-scrollbar">
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                     
                     {insights.map((insight) => (
                        <div 
                           key={insight.id} 
                           onClick={() => setSelectedInsight(insight)}
                           className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                              selectedInsight.id === insight.id 
                              ? 'bg-white/10 border-[#C6A152]/50 shadow-[0_0_30px_-5px_rgba(198,161,82,0.15)] ring-1 ring-[#C6A152]/30' 
                              : 'bg-white/5 border-white/5 hover:bg-white/[0.07] hover:border-white/20'
                           }`}
                        >
                           <div className="flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                 <div className="flex items-center gap-2">
                                     {insight.severity === 'high' && <span className="w-2 h-2 rounded-full bg-error animate-pulse shadow-[0_0_8px_#ff5449]"></span>}
                                     {insight.severity === 'medium' && <span className="w-2 h-2 rounded-full bg-[#C6A152]"></span>}
                                     {insight.severity === 'low' && <span className="w-2 h-2 rounded-full bg-white/30"></span>}
                                     <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{insight.time}</span>
                                 </div>
                                 {selectedInsight.id === insight.id && (
                                    <span className="material-symbols-outlined text-[#C6A152] text-sm">arrow_forward</span>
                                 )}
                              </div>
                              <h3 className={`font-bold text-lg leading-tight transition-colors ${selectedInsight.id === insight.id ? 'text-[#C6A152]' : 'text-white'}`}>
                                 {insight.title}
                              </h3>
                              <p className="text-sm text-white/60 line-clamp-2">
                                 {insight.shortDesc}
                              </p>
                           </div>
                        </div>
                     ))}

                  </div>
               </div>

               {/* Right Panel: Deep Dive */}
               <div className="lg:col-span-7 h-full">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-full p-8 flex flex-col relative overflow-hidden ring-1 ring-inset ring-white/5">
                     
                     {/* Scanning Effect Overlay */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C6A152] to-transparent opacity-20 transform translate-y-[-100%] animate-[scan_4s_ease-in-out_infinite]"></div>

                     <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-[#C6A152] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Secuencia de Análisis</h2>
                     </div>

                     <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                        
                        <div>
                           <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">{selectedInsight.title}</h1>
                           <div className="bg-[#002D58]/40 border-l-4 border-[#C6A152] p-5 rounded-r-xl">
                              <p className="text-white/80 font-medium text-lg leading-relaxed">
                                 {selectedInsight.shortDesc}
                              </p>
                           </div>
                        </div>

                        <div>
                           <h3 className="text-xs font-bold uppercase tracking-widest text-[#C6A152] mb-4">Cadena de Razonamiento</h3>
                           <div className="space-y-3">
                              {selectedInsight.reasoning.map((step, idx) => (
                                 <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                    <div className="text-white/20 font-black text-xl">0{idx + 1}</div>
                                    <p className="text-white/70 text-sm leading-relaxed pt-1 flex-1">
                                       {step.replace(/^\d+\.\s*/, '')}
                                    </p>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                           <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Acción Recomendada</h3>
                           <div className="bg-[#008542]/10 border border-[#008542]/30 p-5 rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <span className="material-symbols-outlined text-[#008542] text-2xl">verified_user</span>
                                 <p className="text-white font-bold">{selectedInsight.recommendation}</p>
                              </div>
                              <button className="bg-[#008542] hover:bg-[#006b35] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(0,133,66,0.3)]">
                                 Ejecutar
                              </button>
                           </div>
                        </div>

                     </div>

                  </div>
               </div>

            </div>
          </div>
        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
         @keyframes scan {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(100vh); }
            100% { transform: translateY(-100%); }
         }
         .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(198, 161, 82, 0.3);
            border-radius: 4px;
         }
      `}} />
    </div>
  );
}
