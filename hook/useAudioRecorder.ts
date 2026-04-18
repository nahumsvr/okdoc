// hooks/useAudioRecorder.ts
import { useState, useRef, useCallback } from 'react';
import { useRecordingStore } from '../store/useRecordingStore';

export const useAudioRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);

    // Ref para guardar el temporizador de nuestro simulador
    const simulatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Traemos más funciones de Zustand para poder inyectar los datos falsos
    const { startRecording, stopRecording, appendTranscription, addEntity } = useRecordingStore();

    const start = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                    // Aquí iría: socket.emit('audio_chunk', event.data);
                }
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                audioChunksRef.current = [];
                stream.getTracks().forEach(track => track.stop());

                // Apagamos el simulador cuando el doctor detiene la consulta
                if (simulatorIntervalRef.current) {
                    clearInterval(simulatorIntervalRef.current);
                }
            };

            recorder.start(1000);
            setMediaRecorder(recorder);
            startRecording();

            // 🤖 INICIO DEL SIMULADOR DE IA 🤖
            // Cada 3 segundos simularemos que llega un mensaje del WebSocket
            simulatorIntervalRef.current = setInterval(() => {
                const frasesFalsas = [
                    "El paciente refiere dolor punzante. ",
                    "Presenta fiebre desde hace dos días. ",
                    "Menciona alergia a la penicilina. ",
                    "Presión arterial ligeramente elevada. "
                ];

                // 1. Simulamos que llega texto nuevo de Whisper
                const fraseAleatoria = frasesFalsas[Math.floor(Math.random() * frasesFalsas.length)];
                appendTranscription(fraseAleatoria);

                // 2. Simulamos que la IA extrajo una entidad médica (30% de probabilidad)
                if (Math.random() > 0.7) {
                    const entidadesFalsas = [
                        { field: "Síntoma Principal", value: "Fiebre", confidence: 0.95 },
                        { field: "Alergias", value: "Penicilina", confidence: 0.99 },
                        { field: "CIE-10", value: "R50.9 (Fiebre no especificada)", confidence: 0.88 }
                    ];
                    const entidadAleatoria = entidadesFalsas[Math.floor(Math.random() * entidadesFalsas.length)];
                    addEntity(entidadAleatoria);
                }
            }, 3000); // 3000ms = 3 segundos

        } catch (error) {
            console.error("Error al acceder al micrófono:", error);
            alert("Para usar el asistente, debes permitir el acceso al micrófono en tu navegador.");
        }
    }, [startRecording, appendTranscription, addEntity]);

    const stop = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setMediaRecorder(null);
            stopRecording();
        }
    }, [mediaRecorder, stopRecording]);

    return { start, stop };
};