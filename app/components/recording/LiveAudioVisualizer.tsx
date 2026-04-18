'use client';

import React from 'react';
import RecordButton from '../buttons/RecordButton';
import { useRecordingStore } from '../../../store/useRecordingStore';

export default function LiveAudioVisualizer() {
    const { isRecording } = useRecordingStore();
    return (
        <>
            <style jsx>{`
                .mic-pulse-1 { opacity: 0.1; transform: scale(1.1); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .mic-pulse-2 { opacity: 0.05; transform: scale(1.4); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s; }
                .mic-pulse-3 { opacity: 0.02; transform: scale(1.8); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s; }
                @keyframes pulse {
                    0%, 100% { opacity: 0; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
            `}</style>
            
            <div className="relative aspect-video bg-surface-container-low rounded-[2rem] flex flex-col items-center justify-center overflow-hidden">
                {/* Concentric Waves - Only animate or show clearly if recording */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isRecording ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-64 h-64 border-4 border-[#C6A152] rounded-full mic-pulse-1 absolute"></div>
                    <div className="w-96 h-96 border-2 border-[#C6A152] rounded-full mic-pulse-2 absolute"></div>
                    <div className="w-[32rem] h-[32rem] border border-[#C6A152] rounded-full mic-pulse-3 absolute"></div>
                </div>

                {/* Mic Button from existing logic */}
                <div className="relative z-10 scale-125 mt-4">
                    <RecordButton />
                </div>


            </div>
        </>
    );
}
