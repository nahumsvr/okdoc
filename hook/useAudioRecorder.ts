// hooks/useAudioRecorder.ts
import { useState, useRef, useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRecordingStore } from "../store/useRecordingStore";

export const useAudioRecorder = (patientId?: string, doctorId?: string) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const socketRef = useRef<Socket | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const {
    startRecording,
    stopRecording,
    appendTranscription,
    setTranscription,
    setFormData,
  } = useRecordingStore();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    socketRef.current = io(apiUrl);

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("🔗 Conectado al servidor de WebSockets");
    });

    // CAMBIO: El evento ahora se llama 'transcription_update'
    socket.on(
      "transcription_update",
      (data: { text: string; source: string }) => {
        console.log("📝 Texto recibido:", data.text);
        appendTranscription(data.text);
      },
    );

    socket.on("form_complete", (data) => {
      // Recibimos el texto final acumulado y el JSON de la IA
      setTranscription(data.transcription);
      if (data.form) {
        setFormData(data.form);
      }
      console.log("🏆 Formulario generado:", data.form);
    });

    socket.on("error", (error) => {
      console.error("❌ Error desde WebSockets:", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [appendTranscription, setTranscription, setFormData]);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (!socketRef.current?.connected) {
        socketRef.current?.connect();
      }

      // Generamos un sessionId único
      sessionIdRef.current = `session_${Date.now()}`;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (event) => {
        if (
          event.data.size > 0 &&
          socketRef.current?.connected &&
          sessionIdRef.current
        ) {
          const reader = new FileReader();
          reader.readAsDataURL(event.data);
          reader.onloadend = () => {
            const base64Audio = (reader.result as string).split(",")[1];
            // Enviamos el chunk al backend
            socketRef.current?.emit("audio_chunk", {
              sessionId: sessionIdRef.current,
              audio: base64Audio,
            });
          };
        }
      };

      recorder.onstop = () => {
        if (socketRef.current?.connected && sessionIdRef.current) {
          // CAMBIO: Ahora enviamos patientId y doctorId al finalizar
          socketRef.current.emit("finish_session", {
            sessionId: sessionIdRef.current,
            patientId,
            doctorId,
          });
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      // Recoger audio cada 3-5 segundos es mejor para transcripción no-streaming
      recorder.start(4000);
      setMediaRecorder(recorder);
      startRecording();
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
    }
  }, [startRecording, patientId, doctorId]);

  const stop = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setMediaRecorder(null);
      stopRecording();
    }
  }, [mediaRecorder, stopRecording]);

  return { start, stop };
};
