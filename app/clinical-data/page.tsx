"use client";
import React from "react";
import { SearchHeader } from "../components/search/SearchHeader";
import Sidebar from "../components/moscati/Sidebar";

export default function ClinicalDataPage() {
  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />
      
      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />

        <main className="flex-1 overflow-y-auto w-full p-6 md:p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-4 gap-4">
              <div>
                <h1 className="font-headline text-3xl font-extrabold text-[#002D58] tracking-tight">
                  Clinical Data Overview
                </h1>
                <p className="text-sm font-medium text-on-surface-variant mt-1 max-w-xl">
                  Métricas agregadas y distribución poblacional en tiempo real del registro hospitalario.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select className="bg-surface-container-lowest border border-outline-variant/50 text-sm font-bold text-[#002D58] rounded-xl px-4 py-2.5 focus:outline-none hover:border-[#002D58]/50 transition-colors shadow-sm cursor-pointer appearance-none">
                  <option>Últimos 30 días</option>
                  <option>Este mes</option>
                  <option>Este año</option>
                </select>
                <button className="bg-[#002D58] hover:bg-[#001834] text-white p-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center">
                   <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 grid-rows-auto">
              
              {/* Main KPI: Volume */}
              <div className="bg-white rounded-3xl border border-outline-variant/20 p-6 md:col-span-2 lg:col-span-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-[#002D58]">group</span>
                </div>
                <div className="z-10">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Pacientes Totales</h3>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-[#002D58] tracking-tighter">1,248</span>
                    <span className="text-sm font-bold text-[#008542] bg-[#008542]/10 px-2 py-0.5 rounded flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                      12%
                    </span>
                  </div>
                </div>
                <div className="mt-8 z-10 w-full h-12 flex items-end gap-1">
                  {/* Mock mini bar chart */}
                  {[40, 60, 45, 80, 50, 90, 75, 40, 60, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-surface-container hover:bg-[#002D58]/40 rounded-t-sm transition-all duration-300" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

              {/* Main Insight: Acuity */}
               <div className="bg-[#002D58] text-white rounded-3xl border border-[#002D58] p-6 md:col-span-2 lg:col-span-2 shadow-[0_8px_30px_rgb(0,45,88,0.15)] flex flex-col relative overflow-hidden">
                {/* Abstract pattern */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#C6A152] rounded-tl-full opacity-20 transform translate-x-8 translate-y-8"></div>
                 <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Índice de Acuidad Global</h3>
                 <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20">
                        {/* CSS donut chart approximation */}
                         <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                          <path
                            className="stroke-white/20"
                            strokeWidth="3.5"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="stroke-[#C6A152] drop-shadow-md"
                            strokeWidth="3.5"
                            strokeDasharray="68, 100"
                            fill="none"
                            strokeLinecap="round"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-black">68</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-base font-bold leading-tight mb-1">Nivel Moderado-Alto</p>
                        <p className="text-xs text-white/70">Aumento notable en áreas de urgencia respiratoria.</p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Smaller KPIs */}
              <div className="grid grid-rows-2 gap-6 md:col-span-4 lg:col-span-2">
                 <div className="bg-white rounded-3xl border border-outline-variant/20 p-5 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Tasa de Admisión</h3>
                      <p className="text-2xl font-black text-[#002D58]">18.4%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">bed</span>
                    </div>
                 </div>
                 <div className="bg-white rounded-3xl border border-outline-variant/20 p-5 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Tiempo de Respuesta IA</h3>
                      <p className="text-2xl font-black text-[#002D58]">1.2s</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#C6A152]/10 text-[#C6A152] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                 </div>
              </div>

              {/* Wide section: Demographics */}
              <div className="bg-white rounded-3xl border border-outline-variant/20 p-6 shadow-sm md:col-span-4 lg:col-span-4 min-h-[300px] flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-extrabold text-[#002D58] tracking-widest uppercase">Distribución Demográfica de Riesgo</h3>
                   <span className="material-symbols-outlined text-outline">more_horiz</span>
                 </div>
                 
                 {/* Progress Bars representation */}
                 <div className="flex-1 flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#43474f]">18 - 35 Años</span>
                        <span className="text-[#002D58]">32%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                        <div className="bg-[#002D58] h-full rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#43474f]">36 - 55 Años</span>
                        <span className="text-[#002D58]">45%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                        <div className="bg-[#C6A152] h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#43474f]">56+ Años</span>
                        <span className="text-[#002D58]">23%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Square widget: Anomalies */}
               <div className="bg-white rounded-3xl border border-outline-variant/20 p-6 shadow-sm md:col-span-2 lg:col-span-2 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    <h3 className="text-sm font-extrabold text-[#002D58] tracking-widest uppercase">Alergias Frecuentes</h3>
                  </div>
                  <div className="flex-1 flex flex-col space-y-3">
                    <div className="bg-error/10 border border-error/20 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-bold text-error">Penicilina</span>
                      <span className="text-xs font-black bg-white rounded-full px-2 py-0.5 shadow-sm text-error">12%</span>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant/30 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-bold text-[#43474f]">AINEs</span>
                      <span className="text-xs font-black bg-white rounded-full px-2 py-0.5 shadow-sm text-[#43474f]">8%</span>
                    </div>
                     <div className="bg-surface-container-low border border-outline-variant/30 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-bold text-[#43474f]">Sulfamidas</span>
                      <span className="text-xs font-black bg-white rounded-full px-2 py-0.5 shadow-sm text-[#43474f]">5%</span>
                    </div>
                  </div>
               </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
