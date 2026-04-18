"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }
      localStorage.setItem("access_token", data.jwt);
      router.push("/patients/search");
    } catch (err: any) {
      setError(err.message || "Error de conexión");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden">
          {/* Header navy */}
          <div className="bg-[#002D58] px-8 pt-8 pb-6">
            {/* Logo / wordmark */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#C6A152] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <p
                  className="text-white font-bold text-base leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Moscati
                </p>
                <p className="text-[#C6A152] text-[11px] font-semibold tracking-widest uppercase">
                  Clinical AI
                </p>
              </div>
            </div>

            <h1
              className="text-white text-xl font-bold leading-snug"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Bienvenido!
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Ingresa tus datos para continuar
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 py-7 flex flex-col gap-5"
          >
            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-3"
                style={{
                  background: "rgba(0,45,88,0.06)",
                  border: "1px solid #002D58",
                }}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#002D58"
                  strokeWidth={2.5}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-medium" style={{ color: "#002D58" }}>
                  {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[11px] font-semibold tracking-widest uppercase text-[#888888]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Correo electrónico
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#888888]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="doctor@moscati.mx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C6A152] focus:ring-2 focus:ring-[#C6A152]/20 focus:bg-white transition-all"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[11px] font-semibold tracking-widest uppercase text-[#888888]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-[11px] font-semibold text-[#C6A152] hover:text-[#b8913f] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#888888]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C6A152] focus:ring-2 focus:ring-[#C6A152]/20 focus:bg-white transition-all"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#002D58] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-sm text-white transition-all"
              style={{
                fontFamily: "Manrope, sans-serif",
                background: loading ? "#888" : "#002D58",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#C6A152";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "#002D58";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E0E0E0]" />
              <span className="text-[11px] text-[#BBBBBB] font-medium">o</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 flex flex-col gap-3">
            <p
              className="text-center text-[12px] text-[#888888]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="font-bold text-[#C6A152] hover:text-[#002D58] transition-colors"
              >
                Registrarse
              </a>
            </p>
            <p
              className="text-center text-[11px] text-[#BBBBBB]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              ¿Problemas para acceder?{" "}
              <button className="text-[#C6A152] font-semibold hover:text-[#b8913f] transition-colors">
                Contacta a soporte
              </button>
            </p>
          </div>
        </div>

        {/* Badge inferior */}
        <p
          className="text-center text-[11px] text-[#BBBBBB] mt-4"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Plataforma segura · Datos clínicos cifrados
        </p>
      </div>
    </div>
  );
}
