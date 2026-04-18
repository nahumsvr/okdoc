// store/useRecordingStore.ts
import { create } from 'zustand';

interface MedicalEntity {
    field: string;
    value: string;
    confidence: number;
}

interface RecordingState {
    // Estados
    isRecording: boolean;
    transcription: string;
    entities: MedicalEntity[]; // Lo que extrae la IA (CIE-10, Padecimiento, etc.)

    // Acciones (Funciones para cambiar el estado)
    startRecording: () => void;
    stopRecording: () => void;
    setTranscription: (text: string) => void;
    appendTranscription: (text: string) => void; // Para streaming en tiempo real
    addEntity: (entity: MedicalEntity) => void;
    clearAll: () => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
    isRecording: false,
    transcription: '',
    entities: [],

    startRecording: () => set({ isRecording: true }),

    stopRecording: () => set({ isRecording: false }),

    setTranscription: (text) => set({ transcription: text }),

    appendTranscription: (text) =>
        set((state) => ({ transcription: state.transcription + ' ' + text })),

    addEntity: (newEntity) =>
        set((state) => ({ entities: [...state.entities, newEntity] })),

    clearAll: () => set({ isRecording: false, transcription: '', entities: [] }),
}));