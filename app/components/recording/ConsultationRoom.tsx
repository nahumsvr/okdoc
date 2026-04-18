'use client';

import React, { useEffect, useState } from 'react';
import LiveAudioVisualizer from './LiveAudioVisualizer';
import PatientLiveExtractionSidebar from './PatientLiveExtractionSidebar';
import { useRecordingStore } from '../../../store/useRecordingStore';

export default function ConsultationRoom() {
    const { isRecording } = useRecordingStore();
    const [patientName, setPatientName] = useState("Desconocido");

    useEffect(() => {
        const stored = localStorage.getItem("selected_patient");
        if (stored) {
            try {
                const patient = JSON.parse(stored);
                if (patient.nombreCompleto || patient.nombre) {
                    setPatientName(patient.nombreCompleto || patient.nombre);
                }
            } catch (e) {
                // ignore
            }
        }
    }, []);
    
    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[1600px] mx-auto">
            {/* Left Column: Active Listening Room */}
            <section className="lg:col-span-7 space-y-8">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h1 className="text-4xl font-extrabold font-headline text-[#001834] tracking-tight">Consulta N° 04</h1>
                        <p className="text-[#002D58] font-bold mt-1">
                            Paciente: <span className="text-[#C6A152] font-black">{patientName}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {isRecording && (
                            <div className="flex items-center gap-2 bg-[#ba1a1a]/10 text-[#ba1a1a] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                                Recording: 00:00
                            </div>
                        )}
                    </div>
                </div>

                {/* Central Microphone Interface */}
                <LiveAudioVisualizer />


            </section>

            {/* Right Column: Real-time Intelligence Extraction */}
            <PatientLiveExtractionSidebar />
        </div>
    );
}
