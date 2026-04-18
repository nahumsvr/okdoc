import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  // En un caso real, haríamos fetch() a un backend usando el params.id
  // Por ahora mockeamos datos similares al diseño de AI
  const patientId = params.id;
  const isMaria = patientId === "1029-MCP-24";
  
  const patientName = isMaria ? "Maria González Ruiz" : "Paciente Desconocido";

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopAppBar (Contexto) */}
      <header className="bg-white dark:bg-slate-900 shadow-[0_12px_32px_-4px_rgba(0,45,88,0.08)] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <Link href="/patients/search" className="hover:bg-[#f3f3f3] dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:opacity-80 transition-all">
              <span className="material-symbols-outlined text-[#002D58] dark:text-blue-400">arrow_back</span>
            </Link>
            <div className="flex flex-col">
              <h1 className="font-headline text-[#1a1c1c] dark:text-slate-100 font-semibold text-lg leading-tight">
                {patientName}
              </h1>
              <span className="text-[11px] font-medium tracking-wide text-[#43474f] dark:text-slate-400 uppercase">
                ID: {patientId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hover:bg-[#f3f3f3] dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:opacity-80 transition-all">
              <span className="material-symbols-outlined text-[#43474f] dark:text-slate-400">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 pb-24 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Left Column: AI Context & Clinical Data */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* AI Summary Section (Asymmetric Layout) */}
          <section className="relative">
            <div className="bg-secondary-container/20 border-l-4 border-secondary rounded-r-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <h2 className="font-headline text-xl font-bold text-primary">Resumen de IA</h2>
              </div>
              <p className="font-body text-on-surface leading-relaxed text-lg italic opacity-90">
                &quot;Paciente femenina de 34 años con antecedentes de hipertensión leve. La consulta actual sugiere una posible rinitis alérgica estacional. Se recomienda validación de síntomas reportados en audio.&quot;
              </p>
            </div>
          </section>

          {/* Clinical Form Section */}
          <section className="space-y-8">
            <h3 className="font-headline text-2xl font-extrabold text-primary-container tracking-tight">Registro Clínico</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Field 1: Nombre */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Nombre</label>
                <div className="bg-surface-container-high/50 border-b-2 border-outline-variant p-3 text-on-surface font-semibold text-lg">
                  Maria
                </div>
              </div>

              {/* Field 2: Apellido */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Apellido</label>
                <div className="bg-surface-container-high/50 border-b-2 border-outline-variant p-3 text-on-surface font-semibold text-lg">
                  González Ruiz
                </div>
              </div>

              {/* Field 3: Edad */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Edad</label>
                <div className="bg-surface-container-high/50 border-b-2 border-outline-variant p-3 text-on-surface font-semibold text-lg">
                  34
                </div>
              </div>

              {/* Field 4: AI Suggested (Secondary Accent) */}
              <div className="space-y-2 col-span-full">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Síntomas Reportados</label>
                <div className="bg-surface-container-lowest border-l-4 border-secondary p-5 shadow-sm group hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface font-bold text-xl">Rinitis, Estornudos, Congestión nasal</span>
                    <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">AI Suggested</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Field 5: Validated (Green Accent) */}
              <div className="space-y-2 col-span-full">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Alergias Conocidas</label>
                <div className="bg-surface-container-lowest border-l-4 border-[#008542] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface font-bold text-xl">Polen</span>
                    <div className="flex items-center gap-2 bg-[#008542]/10 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[#008542] text-sm">check_circle</span>
                      <span className="text-[10px] font-bold text-[#008542] uppercase tracking-tighter">Validado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Past Consultations & Editorial Image */}
        <aside className="lg:col-span-4 mt-12 lg:mt-0 space-y-12">
          {/* Contextual Editorial Image */}
          <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_12px_32px_-4px_rgba(0,45,88,0.12)] relative">
            <Image 
              fill
              className="w-full h-full object-cover" 
              alt="Modern clinical microscope lens and laboratory equipment" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy4Gpup76Wrm8fiYnwWypemh6pzfOB7FJVOVlbtm9tRYY5hVHvTupDBgXUIOnf37AWcrAQKrr6dX1vSr14WWSbyFPnPHkiPlNAFhfcxHzKSGPQQ9KONXlKMhhp_rbrX0TnRyRUDSrs6CSei2YacxpnPQ1BZw6HUG9JJReHlhxsviRB2xBxjsx1yA9gxJ7k5jayTiyzg0yPEOigbdNy8of3Dt4zukuDyjCH766nqzvzd7zfhfe2klXZqQEYh-u-sBpfGDDubKUpeM0" 
            />
          </div>

          {/* Past Consultations (The Curator List) */}
          <div className="space-y-6">
            <h4 className="font-headline text-sm font-extrabold text-primary-container uppercase tracking-widest border-b border-outline-variant/30 pb-4">Consultas Pasadas</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary-container shrink-0"></div>
                <div>
                  <p className="font-bold text-on-surface text-base">12 Oct 2023</p>
                  <p className="text-sm text-on-surface-variant">Control General - Resultados Normales</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="mt-1 w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                <div>
                  <p className="font-bold text-on-surface text-base">05 May 2023</p>
                  <p className="text-sm text-on-surface-variant">Seguimiento Hipertensión Leve</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="mt-1 w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                <div>
                  <p className="font-bold text-on-surface text-base">20 Ene 2023</p>
                  <p className="text-sm text-on-surface-variant">Chequeo Anual de Rutina</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Floating Action Button (FAB Context) */}
      <button className="fixed bottom-24 right-6 w-16 h-16 bg-[#C6A152] text-white rounded-full shadow-[0_8px_24px_rgba(198,161,82,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
      </button>

      {/* Bottom Action Bar / Navigation Shell */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md flex justify-around items-center px-4 py-3 border-t border-[#c3c6d0]/15 z-40">
        <div className="flex-1 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex gap-8">
            <div className="flex flex-col items-center justify-center text-[#43474f] hover:text-[#C6A152] transition-colors cursor-pointer">
              <span className="material-symbols-outlined">clinical_notes</span>
              <span className="text-[11px] font-medium tracking-wide">Records</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#002D58] text-white rounded-xl px-4 py-1.5 transition-transform duration-300">
              <span className="material-symbols-outlined">groups</span>
              <span className="text-[11px] font-medium tracking-wide">Patients</span>
            </div>
          </div>
          
          <div className="flex-1 md:flex-none">
            <button className="w-full md:w-auto bg-[#002D58] hover:bg-primary-container/90 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-all active:translate-y-1">
              Guardar Validación
            </button>
          </div>
          
          <div className="hidden md:flex gap-8">
            <div className="flex flex-col items-center justify-center text-[#43474f] hover:text-[#C6A152] transition-colors cursor-pointer">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="text-[11px] font-medium tracking-wide">Analytics</span>
            </div>
            <div className="flex flex-col items-center justify-center text-[#43474f] hover:text-[#C6A152] transition-colors cursor-pointer">
              <span className="material-symbols-outlined">person</span>
              <span className="text-[11px] font-medium tracking-wide">Profile</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav Labels (Responsive Layout Override) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around items-center px-4 py-2 border-t border-[#c3c6d0]/15 z-50">
        <div className="flex flex-col items-center justify-center text-[#43474f] px-4 py-1.5">
          <span className="material-symbols-outlined">clinical_notes</span>
          <span className="text-[11px] font-medium tracking-wide">Records</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#002D58] text-white rounded-xl px-4 py-1.5">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[11px] font-medium tracking-wide">Patients</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#43474f] px-4 py-1.5">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[11px] font-medium tracking-wide">Analytics</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#43474f] px-4 py-1.5">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[11px] font-medium tracking-wide">Profile</span>
        </div>
      </div>
    </div>
  );
}
