"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handle = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const passwordMatch = form.confirmPassword
    ? form.password === form.confirmPassword
    : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError("Por favor completa todos los campos.")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.")
      return
    }

    setLoading(true)
    // TODO: conectar con tu endpoint de registro
    setTimeout(() => {
      setLoading(false)
      // router.push("/login")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden">

          {/* Header navy */}
          <div className="bg-[#002D58] px-8 pt-8 pb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#C6A152] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Moscati
                </p>
                <p className="text-[#C6A152] text-[11px] font-semibold tracking-widest uppercase">
                  Clinical AI
                </p>
              </div>
            </div>
            <h1 className="text-white text-xl font-bold leading-snug" style={{ fontFamily: "Manrope, sans-serif" }}>
              Crear cuenta
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Completa los datos para registrarte
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 flex flex-col gap-5">

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-3"
                style={{ background: "rgba(0,45,88,0.06)", border: "1px solid #002D58" }}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#002D58" strokeWidth={2.5}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-medium" style={{ color: "#002D58" }}>{error}</p>
              </div>
            )}

            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nombre"
                className="text-[11px] font-semibold tracking-widest uppercase text-[#888888]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Nombre completo
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Dr. Nombre Apellido"
                  value={form.nombre}
                  onChange={(e) => handle("nombre", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C6A152] focus:ring-2 focus:bg-white transition-all"
                  style={{ fontFamily: "Manrope, sans-serif", boxShadow: "none" }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(198,161,82,0.15)"}
                  onBlur={(e) => e.target.style.boxShadow = "none"}
                />
              </div>
            </div>

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
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="doctor@moscati.mx"
                  value={form.email}
                  onChange={(e) => handle("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C6A152] focus:ring-2 focus:bg-white transition-all"
                  style={{ fontFamily: "Manrope, sans-serif", boxShadow: "none" }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(198,161,82,0.15)"}
                  onBlur={(e) => e.target.style.boxShadow = "none"}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[11px] font-semibold tracking-widest uppercase text-[#888888]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" strokeWidth={2}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={(e) => handle("password", e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C6A152] focus:ring-2 focus:bg-white transition-all"
                  style={{ fontFamily: "Manrope, sans-serif", boxShadow: "none" }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(198,161,82,0.15)"}
                  onBlur={(e) => e.target.style.boxShadow = "none"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#002D58] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Barra de fuerza */}
              {form.password && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all"
                      style={{
                        background:
                          form.password.length >= i * 3
                            ? form.password.length >= 10
                              ? "#C6A152"
                              : "#002D58"
                            : "#E0E0E0",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-[11px] font-semibold tracking-widest uppercase text-[#888888]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" strokeWidth={2}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repite tu contraseña"
                  value={form.confirmPassword}
                  onChange={(e) => handle("confirmPassword", e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-[#F4F4F4] text-[#333333] placeholder-[#BBBBBB] focus:outline-none focus:ring-2 focus:bg-white transition-all"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    boxShadow: "none",
                    border: passwordMatch === false
                      ? "1px solid #002D58"
                      : passwordMatch === true
                      ? "1px solid #C6A152"
                      : "1px solid #E0E0E0",
                  }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(198,161,82,0.15)"}
                  onBlur={(e) => e.target.style.boxShadow = "none"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#002D58] transition-colors"
                >
                  {showConfirm ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
                {/* Ícono de match */}
                {passwordMatch !== null && (
                  <span className="absolute right-9 top-1/2 -translate-y-1/2">
                    {passwordMatch ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#C6A152" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#002D58" strokeWidth={2.5}>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
              {passwordMatch === false && (
                <p className="text-[11px] font-semibold" style={{ color: "#002D58" }}>
                  Las contraseñas no coinciden
                </p>
              )}
              {passwordMatch === true && (
                <p className="text-[11px] font-semibold" style={{ color: "#C6A152" }}>
                  Las contraseñas coinciden
                </p>
              )}
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
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#C6A152" }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#002D58" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                "Crear cuenta"
              )}
            </button>

            {/* Link a login */}
            <p
              className="text-center text-[12px] text-[#888888]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="font-bold transition-colors"
                style={{ color: "#C6A152" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8913f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C6A152")}
              >
                Inicia sesión
              </a>
            </p>
          </form>
        </div>

        <p
          className="text-center text-[11px] text-[#BBBBBB] mt-4"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Plataforma segura · Datos clínicos cifrados
        </p>
      </div>
    </div>
  )
}
