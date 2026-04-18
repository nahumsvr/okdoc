// components/RecordButton.tsx
'use client';

import { useAudioRecorder } from '../../../hook/useAudioRecorder';
import { useRecordingStore } from '../../../store/useRecordingStore';

export default function RecordButton() {
    const { isRecording } = useRecordingStore();
    const { start, stop } = useAudioRecorder();

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                onClick={isRecording ? stop : start}
                className={`relative flex items-center justify-center w-20 h-20 rounded-full text-white transition-all duration-300 shadow-lg ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {/* Ícono simple (puedes cambiarlo por lucide-react o heroicons luego) */}
                {isRecording ? (
                    <div className="w-6 h-6 bg-white rounded-sm"></div> // Cuadrado de Stop
                ) : (
                    <div className="w-6 h-6 bg-white rounded-full"></div> // Círculo de Rec
                )}
            </button>

            <span className={`text-sm tracking-wide uppercase font-bold mt-2 ${isRecording ? 'text-red-500 animate-pulse' : 'text-[#737780]'}`}>
                {isRecording ? 'IA Escuchando...' : 'IA lista para grabar'}
            </span>
        </div>
    );
}