"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRecordingStore } from "../../store/useRecordingStore";
import RecordButton from "../components/buttons/RecordButton";

export default function ConsultaPage() {
    // Extraemos los estados del Zustand store
    const { isRecording, transcription, entities } = useRecordingStore();
    const [elapsedTime, setElapsedTime] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll a la transcripción cuando se agrega más texto
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcription]);

    // Timer para la UI si está grabando
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
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#002D58] selection:text-white">
            {/* 1. Cabecera Minimalista */}
            <header className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100 flex-shrink-0 z-10 shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002D58] to-[#004f98] shadow-md text-white flex items-center justify-center font-bold text-lg tracking-wide">
                        JP
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Consulta en curso
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <p className="text-sm font-medium text-gray-500">
                                Paciente: <span className="text-gray-900 font-bold">Juan Pérez</span>
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    href="/patients"
                    className="px-6 py-2.5 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm transition-all duration-200 flex items-center gap-2"
                >
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Atrás
                </Link>
            </header>

            {/* Main Layout: Izquierda Transcripción, Derecha Controles y Entidades */}
            <main className="flex flex-1 overflow-hidden relative">
                {/* Decoración de fondo sutil si está grabando */}
                {isRecording && (
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                )}

                {/* Columna Izquierda: Pantalla de Transcripción (Optimistic UI) */}
                <section className="flex flex-col flex-1 px-10 py-8 overflow-hidden z-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            Transcripción en tiempo real
                        </h2>
                        {isRecording && (
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                                Escuchando
                            </span>
                        )}
                    </div>

                    <div 
                        ref={scrollRef}
                        className={`flex-1 p-8 bg-white/80 backdrop-blur-md rounded-3xl border ${isRecording ? "border-blue-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "border-gray-100 shadow-sm"} overflow-y-auto relative transition-all duration-700 ease-in-out scroll-smooth`}
                    >
                        {transcription ? (
                            <div className="max-w-3xl">
                                <p className="text-gray-800 text-[1.1rem] leading-[1.8] font-medium whitespace-pre-wrap">
                                    {transcription}
                                </p>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                                    <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <p className="text-xl font-bold text-gray-300">Esperando audio...</p>
                                <p className="text-sm font-medium text-gray-400 mt-2 max-w-[250px] text-center">
                                    Presiona el botón principal de grabación para iniciar el dictado.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Columna Derecha: Controles y Panel de Entidades */}
                <section className="w-[420px] bg-white border-l border-gray-100 flex flex-col z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
                    {/* Zona de control central */}
                    <div className="p-10 border-b border-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
                        {isRecording && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-50/30 pointer-events-none" />
                        )}
                        
                        <div className="relative z-10 mb-6 flex justify-center">
                            {/* Halo / Pulso elegante al grabar */}
                            {isRecording && (
                                <>
                                    <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping delay-75 scale-150" />
                                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-10 animate-pulse scale-[1.8]" />
                                </>
                            )}
                            <div className="relative z-20">
                                <RecordButton />
                            </div>
                        </div>

                        {/* Estado de grabación animado */}
                        <div className="h-8 flex items-center justify-center relative z-10">
                            {isRecording ? (
                                <div className="flex items-center gap-2.5 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-sm font-bold text-red-600 tracking-wide">
                                        Grabando {formatTime(elapsedTime)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm font-bold text-gray-400 tracking-wide bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                                    Micrófono inactivo
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Panel de Entidades Clínicas (Optimizado visualmente) */}
                    <div className="flex-1 p-8 overflow-y-auto bg-[#FDFDFD]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Entidades IA
                            </h2>
                            <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2.5 py-1 rounded-lg">
                                {entities?.length || 0}
                            </span>
                        </div>

                        {!entities || entities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl">
                                <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-400 text-center px-6">
                                    Las entidades extraídas aparecerán aquí mágicamente.
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {entities.map((entity: any, idx: number) => {
                                    // Asignación de colores rigurosa mediante la lógica previa (usando text y bg sutiles)
                                    let badgeColor = "bg-gray-100 text-gray-600";
                                    let iconContent = null;

                                    const category = entity?.field?.toLowerCase() || entity?.category?.toLowerCase() || "";
                                    if (category.includes("cie") || category.includes("diagnóstico") || category.includes("diagnostico")) {
                                        badgeColor = "bg-red-50 text-red-600";
                                        iconContent = <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
                                    } else if (category.includes("síntoma") || category.includes("sintoma")) {
                                        badgeColor = "bg-blue-50 text-blue-600";
                                        iconContent = <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
                                    } else if (category.includes("medicamento") || category.includes("tratamiento") || category.includes("alergia")) {
                                        badgeColor = "bg-emerald-50 text-emerald-600";
                                        iconContent = <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-1.5"
                                        >
                                            <div className="flex justify-between items-center mb-0.5">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${badgeColor}`}>
                                                    {iconContent}
                                                    {entity.field || entity.category || "General"}
                                                </span>
                                                {entity.confidence && (
                                                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-md">
                                                        {Math.round(entity.confidence * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-gray-900 text-[15px] font-bold px-0.5">{entity.text || entity.value || entity}</span>
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
