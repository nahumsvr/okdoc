// hooks/useAudioRecorder.ts
import { useState, useRef, useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRecordingStore } from "../store/useRecordingStore";

export const useAudioRecorder = (patientId: string, doctorId: string) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );

  // Usamos una sola referencia limpia para acumular todos los pedazos de audio
  const audioChunksRef = useRef<Blob[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const {
    startRecording,
    stopRecording,
    setTranscription, // Usamos setTranscription directo para evitar textos duplicados
    setFormData,
  } = useRecordingStore();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    socketRef.current = io(apiUrl);
    const socket = socketRef.current;

    socket.on("connect", () => console.log("🔗 WebSockets Conectado"));

    socket.on(
      "transcription_update",
      (data: { text: string; source: string }) => {
        // Reemplazamos el texto en pantalla con la transcripción acumulada más reciente
        setTranscription(data.text);
      },
    );

    socket.on("form_complete", (data) => {
      setTranscription(data.transcription);
      if (data.form) setFormData(data.form);
    });

    socket.on("error", (error) => {
      console.error("❌ Error backend:", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [setTranscription, setFormData]);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!socketRef.current?.connected) socketRef.current?.connect();

      sessionIdRef.current = `session_${Date.now()}`;
      audioChunksRef.current = []; // Vaciamos el arreglo al iniciar una nueva grabación

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });

      // LA MAGIA OCURRE AQUÍ ADENTRO
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // 1. Acumulamos el chunk nuevo con los anteriores
          audioChunksRef.current.push(event.data);

          // 2. Creamos un solo archivo combinando todo lo que llevamos grabado
          const combinedBlob = new Blob(audioChunksRef.current, {
            type: mimeType,
          });

          // 3. Convertimos TODO el archivo a Base64 y lo mandamos (las cabeceras van intactas)
          const reader = new FileReader();
          reader.readAsDataURL(combinedBlob);
          reader.onloadend = () => {
            const base64Audio = (reader.result as string).split(",")[1];
            socketRef.current?.emit("audio_chunk", {
              sessionId: sessionIdRef.current,
              audio: base64Audio,
            });
          };
        }
      };

      recorder.onstop = () => {
        if (socketRef.current?.connected && sessionIdRef.current) {
          // Nota: Si cambiaste tu backend para usar consultationId, actualiza este objeto.
          socketRef.current.emit("finish_session", {
            sessionId: sessionIdRef.current,
            patientId,
            doctorId,
          });
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(6000); // Dispara chunks cada 3 segundos
      setMediaRecorder(recorder);
      startRecording();
    } catch (error) {
      console.error("Error micrófono:", error);
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
