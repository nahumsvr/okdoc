// hooks/useAudioRecorder.ts
import { useState, useRef, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRecordingStore } from '../store/useRecordingStore';

export const useAudioRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const sessionIdRef = useRef<string | null>(null);

    const { startRecording, stopRecording, appendTranscription, setTranscription, setFormData } = useRecordingStore();

    useEffect(() => {
        // Inicializar la conexión de Socket.IO
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        socketRef.current = io(apiUrl, {
            autoConnect: false, // Conectar solo cuando empiece a grabar
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('🔗 Conectado al servidor de WebSockets');
        });

        socket.on('transcript_partial', (data) => {
            // Recibimos texto parcial en tiempo real
            appendTranscription(data.text);
        });

        socket.on('form_complete', (data) => {
            // El proceso ha finalizado y recibimos el formulario extraído final
            setTranscription(data.transcription);
            if (data.form) {
                setFormData(data.form);
            }
        });

        socket.on('error', (error) => {
            console.error('❌ Error desde WebSockets:', error.message);
        });

        return () => {
            socket.disconnect();
        };
    }, [appendTranscription, setTranscription, setFormData]);

    const start = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Si el socket no está conectado, lo conectamos
            if (!socketRef.current?.connected) {
                socketRef.current?.connect();
            }

            // Generamos un sessionId único para esta consulta
            sessionIdRef.current = Math.random().toString(36).substring(2, 15);

            // MimeType compatible (preferimos opus si está disponible)
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
                ? 'audio/webm;codecs=opus' 
                : 'audio/webm';

            const recorder = new MediaRecorder(stream, { mimeType });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socketRef.current?.connected && sessionIdRef.current) {
                    audioChunksRef.current.push(event.data);

                    // Convertimos el chunk (Blob) a base64 para enviarlo al WebSocket
                    const reader = new FileReader();
                    reader.readAsDataURL(event.data);
                    reader.onloadend = () => {
                        const base64Audio = (reader.result as string).split(',')[1];
                        // Emitimos el chunk de audio al backend (evento: audio_chunk)
                        socketRef.current?.emit('audio_chunk', {
                            sessionId: sessionIdRef.current,
                            audio: base64Audio
                        });
                    };
                }
            };

            recorder.onstop = () => {
                // Notificamos al servidor que terminó la consulta (evento: finish_session)
                if (socketRef.current?.connected && sessionIdRef.current) {
                    socketRef.current.emit('finish_session', { sessionId: sessionIdRef.current });
                }

                // Limpiamos chunks locales
                audioChunksRef.current = [];
                
                // Apagamos el micrófono
                stream.getTracks().forEach(track => track.stop());
            };

            // Recoger audio en chunks de 1 segundo (1000ms) - puedes ajustarlo
            recorder.start(1000);
            setMediaRecorder(recorder);
            startRecording();

        } catch (error) {
            console.error("Error al acceder al micrófono:", error);
            alert("Para usar el asistente, debes permitir el acceso al micrófono en tu navegador.");
        }
    }, [startRecording]);

    const stop = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setMediaRecorder(null);
            stopRecording();
        }
    }, [mediaRecorder, stopRecording]);

    return { start, stop };
};