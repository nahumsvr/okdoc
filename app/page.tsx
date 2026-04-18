// app/page.tsx
'use client';

import RecordButton from '@/components/RecordButton';
import { useRecordingStore } from '@/store/useRecordingStore';

export default function Home() {
  const { transcription, entities } = useRecordingStore();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">OkDoc IA</h1>
      <p className="text-gray-500 mb-10">Asistente de transcripción médica</p>

      {/* Aquí va tu nuevo componente */}
      <RecordButton />

      {/* Área temporal para ver los datos de Zustand */}
      <div className="mt-12 w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Transcripción en vivo:</h2>

        <div className="p-4 bg-gray-50 rounded-lg min-h-[100px] text-gray-600 font-mono text-sm">
          {transcription || "Esperando audio..."}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Entidades detectadas:</h3>
          <ul className="flex gap-2 flex-wrap">
            {entities.length === 0 && <span className="text-xs text-gray-400">Ninguna entidad todavía...</span>}
            {entities.map((entity, i) => (
              <li key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                {entity.field}: {entity.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}