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
    formData: any; // Datos del formulario estructurado extraídos por Gemini

    // Acciones (Funciones para cambiar el estado)
    startRecording: () => void;
    stopRecording: () => void;
    setTranscription: (text: string) => void;
    appendTranscription: (text: string) => void; // Para streaming en tiempo real
    addEntity: (entity: MedicalEntity) => void;
    setEntities: (entities: MedicalEntity[]) => void;
    setFormData: (data: any) => void;
    clearAll: () => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
    isRecording: false,
    transcription: '',
    entities: [],
    formData: null,

    startRecording: () => set({ isRecording: true }),

    stopRecording: () => set({ isRecording: false }),

    setTranscription: (text) => set({ transcription: text }),

    appendTranscription: (text) =>
        set((state) => ({ transcription: state.transcription + ' ' + text })),

    addEntity: (newEntity) =>
        set((state) => ({ entities: [...state.entities, newEntity] })),

    setEntities: (entities) => set({ entities }),

    setFormData: (data) => set({ formData: data }),

    clearAll: () => set({ isRecording: false, transcription: '', entities: [], formData: null }),
}));