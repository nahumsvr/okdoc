// hooks/useAudioRecorder.ts
import { useState, useRef, useCallback } from 'react';
import { useRecordingStore } from '@/store/useRecordingStore';

export const useAudioRecorder = () => {
    // Estado local para guardar la instancia del grabador
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // useRef nos permite guardar los pedacitos de audio sin provocar que 
    // la pantalla parpadee o se recargue (re-renders innecesarios)
    const audioChunksRef = useRef<BlobPart[]>([]);

    // Traemos nuestras funciones globales de Zustand
    const { startRecording, stopRecording } = useRecordingStore();

    const start = useCallback(async () => {
        try {
            // 1. Pedimos permiso para usar el micrófono del dispositivo
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Creamos el grabador (webm es el formato más compatible en la web para audio)
            const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            // 2. Este evento se dispara cada vez que hay un nuevo "chunk" de audio disponible
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);

                    // ZONA DE INTEGRACIÓN PARA EL FUTURO
                    // Aquí es donde conectarás tus WebSockets para enviar el audio en tiempo real.
                    // Ejemplo: socket.emit('audio_chunk', event.data);
                }
            };

            // 3. Este evento se dispara cuando llamamos a recorder.stop()
            recorder.onstop = () => {
                // Opcional: Juntar todos los pedacitos si necesitas guardar el archivo localmente o enviarlo completo
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                console.log("✅ Grabación finalizada. Tamaño del blob:", audioBlob.size);

                // Limpiamos la memoria para la próxima consulta
                audioChunksRef.current = [];

                // Apagamos el micrófono a nivel de hardware (quita el punto rojo del navegador)
                stream.getTracks().forEach(track => track.stop());
            };

            // 4. Iniciamos la grabación cortando el audio en pedazos de 1000ms (1 segundo)
            recorder.start(1000);
            setMediaRecorder(recorder);

            // 5. Avisamos a Zustand que ya estamos grabando para que la UI se actualice
            startRecording();

        } catch (error) {
            console.error("Error al acceder al micrófono:", error);
            alert("Para usar el asistente, debes permitir el acceso al micrófono en tu navegador.");
        }
    }, [startRecording]);

    const stop = useCallback(() => {
        // Si hay un grabador activo, lo detenemos
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setMediaRecorder(null);

            // Avisamos a Zustand que ya terminamos
            stopRecording();
        }
    }, [mediaRecorder, stopRecording]);

    return { start, stop };
};