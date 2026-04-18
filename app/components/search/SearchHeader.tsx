
import React from "react";
import Image from "next/image";

export function SearchHeader() {
  return (
    <header className="bg-white text-[#002D58] font-manrope tracking-tight text-sm uppercase font-semibold w-full top-0 shadow-[0_12px_32px_-4px_rgba(0,45,88,0.08)] flex justify-between items-center px-8 h-16 z-50 relative shrink-0">
      <div className="flex items-center gap-8 h-full">
        <span className="text-2xl font-black text-[#002D58] font-manrope normal-case tracking-normal">
          OkDoc
        </span>
        <nav className="hidden md:flex h-full items-center space-x-6">
          <a
            className="text-slate-500 hover:text-[#C6A152] transition-colors duration-200 h-full flex items-center scale-95 active:opacity-80 transition-transform"
            href="#"
          >
            Panel Principal
          </a>
          <a
            className="text-slate-500 hover:text-[#C6A152] transition-colors duration-200 h-full flex items-center scale-95 active:opacity-80 transition-transform"
            href="#"
          >
            Registro de Pacientes
          </a>
          <a
            className="text-slate-500 hover:text-[#C6A152] transition-colors duration-200 h-full flex items-center scale-95 active:opacity-80 transition-transform"
            href="#"
          >
            Cola de Validación
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button
          aria-label="notifications"
          className="text-[#002D58] hover:text-[#C6A152] transition-colors duration-200 scale-95 active:opacity-80 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </button>
        <button
          aria-label="settings"
          className="text-[#002D58] hover:text-[#C6A152] transition-colors duration-200 scale-95 active:opacity-80 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
        <img
          alt="Clinician Profile"
          className="h-8 w-8 rounded-full ml-4 border border-outline-variant"
          data-alt="professional headshot profile"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuXvoa83HnV6idijDwIp4jnAvjaUpcbXunqjpUu_tz2CKw6BtjStj6GZujgvIVMsTg_-0BLJC1PiRX-ZnRoSeaMhC5VojZjDDIC6ZJYqFBUmNl2LrW8L_LrJwADsNtdrQuSR4YysC_h4KaOXE6W45S3kYZ1wATSFg1oJ7u5Gkss2hITbyCm-bnpK9nsCe1hYIa7V35jtBk4haWvSlgmgjPAk7sTUqlYgkRaOVf1b6FyPJaoHzq-WFx7bw-2T_CICjFK4FfnxA3vIY"
        />
      </div>
    </header>
  );
}
