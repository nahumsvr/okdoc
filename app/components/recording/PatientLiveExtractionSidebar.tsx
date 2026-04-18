'use client';

import React from 'react';
import Link from 'next/link';

export default function PatientLiveExtractionSidebar() {
    return (
        <aside className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_12px_32px_-4px_rgba(0,45,88,0.08)] sticky top-24 border border-outline-variant/20">
                <div className="space-y-6">
                    <h3 className="font-headline text-2xl font-extrabold text-[#002D58] tracking-tight border-b border-outline-variant/30 pb-3">
                       Información en Tiempo Real
                    </h3>

                    {/* Patient Context Section */}
                    <div className="mb-10 pt-4">
                        <p className="block text-sm font-extrabold text-[#002D58] uppercase tracking-widest mb-4 ml-1">Contexto del Paciente</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                <span className="text-xs font-bold text-[#43474f] uppercase">Nombre</span>
                                <p className="text-lg font-black text-[#C6A152] mt-1">Julianne V. Sterling</p>
                            </div>
                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                <span className="text-xs font-bold text-[#43474f] uppercase">Edad</span>
                                <p className="text-lg font-black text-[#001834] mt-1">34 Años</p>
                            </div>
                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                <span className="text-xs font-bold text-[#43474f] uppercase">Tipo de Sangre</span>
                                <p className="text-lg font-black text-[#001834] mt-1">O Positivo</p>
                            </div>
                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                <span className="text-xs font-bold text-[#43474f] uppercase">Peso</span>
                                <p className="text-lg font-black text-[#001834] mt-1">68.4 kg</p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Form Section */}
                    <div className="space-y-6">
                        {/* Confirmed Item */}
                        <div className="space-y-2">
                            <label className="block text-sm font-extrabold text-[#002D58] uppercase tracking-widest mb-1 ml-1">Alergias Extraídas</label>
                            <div className="bg-surface-container-lowest border-l-4 border-[#008542] p-6 shadow-[0_8px_24px_-4px_rgba(0,45,88,0.06)] rounded-r-xl group transition-all relative">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 bg-[#008542]/10 px-3 py-1.5 rounded-full w-max">
                                        <span className="material-symbols-outlined text-[#008542] text-[16px]">check_circle</span>
                                        <span className="text-xs font-bold text-[#008542] uppercase tracking-widest">Validado</span>
                                    </div>
                                    <span className="text-[#001834] font-black text-2xl leading-tight">Penicilina, Cacahuates</span>
                                </div>
                                <button className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#001834] text-white p-2 rounded-full shadow-md hover:scale-110 active:scale-95 duration-200">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                            </div>
                        </div>

                        {/* AI Suggested Item */}
                        <div className="space-y-2">
                            <label className="block text-sm font-extrabold text-[#002D58] uppercase tracking-widest mb-1 ml-1 mt-6">Síntomas Detectados</label>
                            <div className="bg-surface-container-lowest border-l-4 border-[#C6A152] p-6 shadow-[0_8px_24px_-4px_rgba(0,45,88,0.06)] rounded-r-xl group hover:shadow-md transition-all">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 bg-[#C6A152]/10 px-3 py-1.5 rounded-full w-max">
                                        <span className="material-symbols-outlined text-[#C6A152] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                        <span className="text-xs font-bold text-[#C6A152] uppercase tracking-widest">Sugerencia IA</span>
                                    </div>
                                    <span className="text-[#001834] font-black text-2xl leading-tight">Dolor abdominal agudo</span>
                                    <p className="text-sm text-[#785a10] font-medium">Localizado en el cuadrante inferior derecho.</p>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 py-3 bg-[#008542] text-white hover:bg-[#005c2e] transition-colors text-xs font-bold uppercase tracking-widest rounded-lg">Validar</button>
                                    <button className="px-6 py-3 bg-surface-container-low hover:bg-surface-variant transition-colors text-on-surface-variant text-xs font-bold uppercase tracking-widest rounded-lg">Descartar</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Final Action */}
                    <Link href="/formulario" className="w-full flex items-center justify-center mt-12 py-5 bg-[#002D58] hover:bg-[#001834] text-white rounded-2xl font-black font-headline uppercase tracking-widest text-base hover:opacity-90 transition-all shadow-xl shadow-[#001834]/20 active:scale-95">
                        Generar Reporte de Consulta
                    </Link>
                </div>
            </div>
        </aside>
    );
}
