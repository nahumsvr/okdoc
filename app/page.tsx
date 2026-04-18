import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-surface font-sans p-6 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#002D58]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#C6A152]/10 rounded-full blur-3xl -z-10"></div>

      <main className="flex w-full max-w-md flex-col items-center bg-white p-12 rounded-[2rem] shadow-[0_24px_64px_-12px_rgba(0,45,88,0.15)] border border-outline-variant/20 z-10">
        
        {/* Logo/Brand */}
        <div className="w-20 h-20 bg-[#002D58] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#002D58]/20">
          <span className="material-symbols-outlined text-white text-[40px]">
            health_and_safety
          </span>
        </div>

        <div className="text-center mb-10 w-full space-y-2">
          <h1 className="text-3xl font-extrabold font-headline text-[#001834] uppercase tracking-widest text-center mt-2">
            Moscati
          </h1>
          <h2 className="text-sm font-semibold tracking-[0.2em] text-[#C6A152] uppercase text-center w-full block">
            Clinical Precision
          </h2>
          <p className="text-on-surface-variant font-medium text-sm mt-4">
            Ingresa al sistema central de inteligencia clínica
          </p>
        </div>

        {/* Dummy Login Form */}
        <div className="w-full space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#43474f] uppercase tracking-widest ml-1">ID Profesional</label>
            <input 
              type="text" 
              defaultValue="DR-7845-MCP"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-[#C6A152] focus:ring-1 focus:ring-[#C6A152] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#43474f] uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              defaultValue="********"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-[#C6A152] focus:ring-1 focus:ring-[#C6A152] transition-all"
            />
          </div>
        </div>

        {/* Login Action (Link to Search Flow) */}
        <div className="w-full mt-10">
          <Link href="/patients/search" className="flex w-full items-center justify-center bg-[#002D58] text-white hover:bg-[#001834] transition-colors py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#001834]/20 active:translate-y-1">
            Entrar al Sistema
            <span className="material-symbols-outlined ml-2 text-[20px]">login</span>
          </Link>
        </div>
      </main>
      
      <p className="text-xs font-semibold text-outline tracking-widest uppercase mt-12 text-center absolute bottom-8">
        Moscati Medical Systems © 2024
      </p>
    </div>
  );
}
