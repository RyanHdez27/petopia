import React, { useState } from "react"
import PetopiaLogo from "../ui/PetopiaLogo"

export type BrandingView = "all" | "auth" | "dashboard" | "service" | "product"

interface BrandingGalleryProps {
  initialView?: BrandingView
  onNavigateToFullApp?: () => void
}

export function BrandingGallery({ initialView = "all", onNavigateToFullApp }: BrandingGalleryProps) {
  const [currentView, setCurrentView] = useState<BrandingView>(initialView)

  return (
    <div className="min-h-screen bg-[#EBE7DF] text-[#333333] flex flex-col font-sans">
      {/* Header selector */}
      <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <PetopiaLogo size="sm" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF2EE] text-[#FD704E] border border-[#FD704E]/20">
            UI Design System · Branding Guide
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setCurrentView("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentView === "all" ? "bg-[#174C58] text-white shadow-xs" : "text-stone-600 hover:text-[#174C58]"
            }`}
          >
            Vista Cuadrante (4 Diseños)
          </button>
          <button
            onClick={() => setCurrentView("auth")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentView === "auth" ? "bg-[#FD704E] text-white shadow-xs" : "text-stone-600 hover:text-[#FD704E]"
            }`}
          >
            1. Login / Onboarding
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentView === "dashboard" ? "bg-[#FD704E] text-white shadow-xs" : "text-stone-600 hover:text-[#FD704E]"
            }`}
          >
            2. Dashboard
          </button>
          <button
            onClick={() => setCurrentView("service")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentView === "service" ? "bg-[#FD704E] text-white shadow-xs" : "text-stone-600 hover:text-[#FD704E]"
            }`}
          >
            3. Consulta Vet
          </button>
          <button
            onClick={() => setCurrentView("product")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentView === "product" ? "bg-[#FD704E] text-white shadow-xs" : "text-stone-600 hover:text-[#FD704E]"
            }`}
          >
            4. Tazón Essential
          </button>
          {onNavigateToFullApp && (
            <button
              onClick={onNavigateToFullApp}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#174C58] hover:bg-[#0E4752] text-white shadow-xs transition-all whitespace-nowrap ml-1"
            >
              Plataforma Completa →
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-[1600px] mx-auto w-full">
        {currentView === "all" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-stone-500">
                <span>01. PANTALLA BIENVENIDA / ONBOARDING</span>
                <button onClick={() => setCurrentView("auth")} className="text-[#FD704E] hover:underline">Ver interactiva →</button>
              </div>
              <AuthCard />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-stone-500">
                <span>02. DASHBOARD PRINCIPAL</span>
                <button onClick={() => setCurrentView("dashboard")} className="text-[#FD704E] hover:underline">Ver interactiva →</button>
              </div>
              <DashboardCard />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-stone-500">
                <span>03. SERVICIO · CONSULTA VETERINARIA</span>
                <button onClick={() => setCurrentView("service")} className="text-[#FD704E] hover:underline">Ver interactiva →</button>
              </div>
              <ServiceCard />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-stone-500">
                <span>04. TIENDA · TAZÓN ESSENTIAL</span>
                <button onClick={() => setCurrentView("product")} className="text-[#FD704E] hover:underline">Ver interactiva →</button>
              </div>
              <ProductCard />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {currentView === "auth" && <AuthCard interactive />}
            {currentView === "dashboard" && <DashboardCard interactive />}
            {currentView === "service" && <ServiceCard interactive />}
            {currentView === "product" && <ProductCard interactive />}
          </div>
        )}
      </main>
    </div>
  )
}

/* =========================================================================
   COMPONENTE: 01. AUTH CARD (Bienvenida a PeTopia)
========================================================================= */
function AuthCard({ interactive = false }: { interactive?: boolean }) {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  return (
    <div className="w-full bg-[#174C58] rounded-3xl sm:rounded-[36px] shadow-xl overflow-hidden relative min-h-[540px] flex flex-col md:flex-row text-white border border-stone-200/20">
      {/* Círculos decorativos naranja idénticos a la imagen */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FD704E] rounded-full pointer-events-none opacity-95" />
      <div className="absolute top-28 -right-12 w-64 h-64 bg-[#FFA088] rounded-full pointer-events-none opacity-60" />

      {/* Puntos ventana mac */}
      <div className="absolute top-4 left-5 flex items-center gap-1.5 z-20">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FD704E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFFFE9]" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>

      {/* Columna Izquierda */}
      <div className="flex-1 p-6 sm:p-10 sm:pt-14 flex flex-col justify-between z-10">
        <div>
          <div className="mb-4">
            <PetopiaLogo variant="white" size="lg" className="text-4xl" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-brand leading-tight max-w-xs">
            Un mundo mejor para su bienestar
          </h2>

          <div className="mt-6 flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F4CCEE] text-[#174C58] flex items-center justify-center shadow-xs flex-shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="font-semibold text-white text-sm">Cuidado</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FD704E] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <circle cx="8.5" cy="5.5" r="2.5" />
                  <circle cx="15.5" cy="5.5" r="2.5" />
                  <circle cx="4" cy="11.5" r="2" />
                  <circle cx="20" cy="11.5" r="2" />
                  <path d="M12 11c-3 0-6 2-6 5.5 0 2.5 2 4.5 6 4.5s6-2 6-4.5c0-3.5-3-5.5-6-5.5z" />
                </svg>
              </div>
              <span className="font-semibold text-white text-sm">Comunidad</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFFFE9] text-[#174C58] flex items-center justify-center shadow-xs flex-shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
              <span className="font-semibold text-white text-sm">Vida más feliz</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-3 border-t border-white/10">
          <p className="text-xs text-white/70 font-medium">
            Pequeñas acciones, grandes colas felices.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Tarjeta Blanca */}
      <div className="flex-1 p-6 sm:p-8 flex items-center justify-center z-10">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-[#333333]">
          <h3 className="text-xl sm:text-2xl font-black font-brand text-[#174C58] mb-1.5">
            Bienvenido a PeTopia
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
            Crea tu cuenta y comienza a vivir una mejor vida juntos.
          </p>

          {success ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
              ✓ ¡Sesión iniciada con éxito! Bienvenido a Petopia.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {interactive && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#174C58]"
                />
              )}
              <button
                onClick={() => setSuccess(true)}
                className="w-full py-3 px-4 bg-[#174C58] hover:bg-[#0E4752] text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-[#174C58]/20 flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
                <span>Continuar con email</span>
              </button>

              <button
                onClick={() => setSuccess(true)}
                className="w-full py-3 px-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold rounded-2xl text-xs border border-stone-200 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Continuar con Google</span>
              </button>

              <button
                onClick={() => setSuccess(true)}
                className="w-full py-3 px-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold rounded-2xl text-xs border border-stone-200 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.14.65-2.8 1.43-.58.68-1.1 1.76-.96 2.81 1.07.08 2.14-.62 2.75-1.37z" />
                </svg>
                <span>Continuar con Apple</span>
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-[11px] text-stone-500">
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold text-[#FD704E] cursor-pointer hover:underline">
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   COMPONENTE: 02. DASHBOARD CARD (¡Hola, Alex!)
========================================================================= */
function DashboardCard({ interactive = false }: { interactive?: boolean }) {
  const [activeTab, setActiveTab] = useState("inicio")

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl sm:rounded-[36px] shadow-xl overflow-hidden border border-stone-200 p-4 sm:p-6 min-h-[540px] flex flex-col md:flex-row gap-5">
      {/* Sidebar interior */}
      <div className="w-full md:w-44 flex-shrink-0 flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/80 pb-3 md:pb-0 md:pr-4">
        <div>
          <div className="mb-6 hidden md:block">
            <PetopiaLogo size="sm" />
          </div>

          <div className="flex md:flex-col gap-1 overflow-x-auto">
            {[
              { id: "inicio", label: "Inicio", icon: "home" },
              { id: "mascotas", label: "Mascotas", icon: "paw" },
              { id: "servicios", label: "Servicios", icon: "calendar" },
              { id: "comunidad", label: "Comunidad", icon: "users" },
              { id: "recursos", label: "Recursos", icon: "book" },
            ].map((i) => (
              <button
                key={i.id}
                onClick={() => setActiveTab(i.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === i.id
                    ? "bg-[#FDF4FC] text-[#FD704E] border border-[#F4CCEE]"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                <span>
                  {i.icon === "home" && "🏠"}
                  {i.icon === "paw" && "🐾"}
                  {i.icon === "calendar" && "📅"}
                  {i.icon === "users" && "👥"}
                  {i.icon === "book" && "📖"}
                </span>
                <span>{i.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#174C58] text-white text-[10px] font-black flex items-center justify-center">
              M
            </div>
            <span className="text-[11px] font-bold text-stone-700">Mi cuenta</span>
          </div>
          <span className="text-[10px] text-stone-400">›</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* Barra superior */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Buscar servicios, consejos, productos..."
              className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 placeholder-stone-400 focus:outline-none"
            />
            <span className="absolute left-2.5 top-2 text-stone-400 text-xs">🔍</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 text-xs">
              🔔
            </div>
            <div className="w-7 h-7 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 text-xs">
              👤
            </div>
          </div>
        </div>

        {/* Saludo + Banner Rosa */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <div className="sm:col-span-2">
            <h3 className="text-2xl font-black font-brand text-[#174C58]">
              ¡Hola, Alex!
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Hoy es un gran día para hacerlos felices.
            </p>
          </div>

          <div className="bg-[#F4CCEE] rounded-2xl p-3 flex items-center gap-3 text-[#174C58]">
            <span className="text-2xl">🤍</span>
            <p className="font-extrabold text-xs font-brand leading-tight">
              Pequeñas acciones, grandes colas.
            </p>
          </div>
        </div>

        {/* 4 Cards de Acción */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#FD704E] text-white rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-xs cursor-pointer hover:opacity-95">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-base">
              📅
            </div>
            <span className="font-extrabold text-xs leading-tight">Agendar servicio</span>
          </div>

          <div className="bg-[#F4CCEE] text-[#174C58] rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-xs cursor-pointer hover:opacity-95">
            <div className="w-8 h-8 rounded-xl bg-white/50 flex items-center justify-center text-base">
              🛍️
            </div>
            <span className="font-extrabold text-xs leading-tight">Tienda para mascotas</span>
          </div>

          <div className="bg-[#FFFFE9] text-[#174C58] border border-[#F0EED0] rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-xs cursor-pointer hover:opacity-95">
            <div className="w-8 h-8 rounded-xl bg-white/70 flex items-center justify-center text-base">
              📖
            </div>
            <span className="font-extrabold text-xs leading-tight">Consejos y bienestar</span>
          </div>

          <div className="bg-[#E4F6E9] text-[#174C58] rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-xs cursor-pointer hover:opacity-95">
            <div className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center text-base">
              👥
            </div>
            <span className="font-extrabold text-xs leading-tight">Comunidad PeTopia</span>
          </div>
        </div>

        {/* Tus Mascotas */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-black font-brand text-[#174C58]">Tus mascotas</h4>
            <span className="text-[11px] font-bold text-[#FD704E] cursor-pointer">Ver todas →</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-3 border border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4CCEE] flex items-center justify-center text-lg flex-shrink-0">
                🐶
              </div>
              <div>
                <div className="font-black text-xs text-[#174C58]">Luna</div>
                <div className="text-[10px] text-stone-400">2 años · Perro</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 border border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD7CE] flex items-center justify-center text-lg flex-shrink-0">
                🐱
              </div>
              <div>
                <div className="font-black text-xs text-[#174C58]">Simba</div>
                <div className="text-[10px] text-stone-400">3 años · Gato</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 border border-dashed border-stone-300 flex items-center gap-3 cursor-pointer hover:bg-stone-50">
              <div className="w-10 h-10 rounded-full border border-dashed border-stone-400 flex items-center justify-center text-sm font-bold text-stone-500 flex-shrink-0">
                +
              </div>
              <div className="font-bold text-xs text-stone-600">
                Agregar mascota
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   COMPONENTE: 03. SERVICE CARD (Consulta Veterinaria)
========================================================================= */
function ServiceCard({ interactive = false }: { interactive?: boolean }) {
  const [selectedDate, setSelectedDate] = useState(19)
  const [selectedTime, setSelectedTime] = useState("10:30")
  const [confirmed, setConfirmed] = useState(false)

  const dates = [
    { day: "Mar", num: 18 },
    { day: "Mié", num: 19 },
    { day: "Jue", num: 20 },
    { day: "Vie", num: 21 },
    { day: "Sáb", num: 22 },
  ]
  const times = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"]

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl sm:rounded-[36px] shadow-xl overflow-hidden border border-stone-200 p-4 sm:p-6 min-h-[540px] flex flex-col gap-5">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-600 flex items-center gap-1 cursor-pointer">
          ← Volver
        </span>
        <div className="max-w-xs flex-1 px-4">
          <input
            type="text"
            placeholder="Buscar servicios..."
            className="w-full pl-3 pr-2 py-1 bg-white rounded-xl border border-stone-200 text-xs text-stone-700"
          />
        </div>
        <div className="flex gap-1.5 text-xs text-stone-500">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>

      {/* Titular del servicio */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F4CCEE] flex items-center justify-center text-[#174C58] flex-shrink-0 text-2xl shadow-xs">
          🩺
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black font-brand text-[#174C58]">
            Consulta veterinaria
          </h3>
          <p className="text-xs text-stone-500">Salud hoy, más momentos juntos mañana.</p>
          <div className="flex items-center gap-1 mt-1 text-xs">
            <span className="text-[#FD704E]">★★★★★</span>
            <span className="font-bold text-stone-700">4.9</span>
            <span className="text-stone-400">(128 reseñas)</span>
          </div>
        </div>
      </div>

      {/* 3 Pills */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 text-center">
          <div className="text-xs font-bold text-[#174C58]">45 min</div>
          <div className="text-[10px] text-stone-500">Consulta presencial</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 text-center">
          <div className="text-xs font-bold text-[#174C58]">Veterinarios</div>
          <div className="text-[10px] text-stone-500">certificados</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 text-center">
          <div className="text-xs font-bold text-[#174C58]">Disponibilidad</div>
          <div className="text-[10px] text-stone-500">en tu zona</div>
        </div>
      </div>

      {/* Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200">
          <div className="text-xs font-black font-brand text-[#174C58] mb-3">Selecciona una fecha</div>
          <div className="flex items-center gap-1 justify-between">
            <span className="text-xs text-stone-400 cursor-pointer">‹</span>
            {dates.map((d) => (
              <button
                key={d.num}
                onClick={() => setSelectedDate(d.num)}
                className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  selectedDate === d.num
                    ? "bg-[#FD704E] text-white shadow-xs font-bold"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                <span className="text-[10px]">{d.day}</span>
                <span className="text-sm font-black">{d.num}</span>
              </button>
            ))}
            <span className="text-xs text-stone-400 cursor-pointer">›</span>
          </div>
        </div>

        {/* Horario */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200">
          <div className="text-xs font-black font-brand text-[#174C58] mb-3">Selecciona un horario</div>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTime === t
                    ? "bg-[#FD704E] text-white shadow-xs"
                    : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-[11px] text-stone-400">
          Puedes cancelar o reprogramar sin costo hasta 24 h antes.
        </span>
        <button
          onClick={() => setConfirmed(true)}
          className="w-full sm:w-56 py-3 px-5 rounded-2xl bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-xs transition-all shadow-md"
        >
          {confirmed ? "¡Confirmado! ✓" : "Continuar"}
        </button>
      </div>
    </div>
  )
}

/* =========================================================================
   COMPONENTE: 04. PRODUCT CARD (Tazón Essential)
========================================================================= */
function ProductCard({ interactive = false }: { interactive?: boolean }) {
  const [selectedColor, setSelectedColor] = useState("orange")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const colors = [
    { key: "orange", hex: "#FD704E", name: "Naranja" },
    { key: "pink", hex: "#F4CCEE", name: "Rosa" },
    { key: "teal", hex: "#174C58", name: "Teal" },
    { key: "cream", hex: "#F2EFC7", name: "Crema" },
  ]

  const activeColor = colors.find((c) => c.key === selectedColor) || colors[0]

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl sm:rounded-[36px] shadow-xl overflow-hidden border border-stone-200 p-4 sm:p-6 min-h-[540px] flex flex-col gap-5">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-600 flex items-center gap-1 cursor-pointer">
          ← Volver
        </span>
        <div className="max-w-xs flex-1 px-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-3 pr-2 py-1 bg-white rounded-xl border border-stone-200 text-xs text-stone-700"
          />
        </div>
        <div className="flex gap-1.5 text-xs text-stone-500">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Render 3D Tazón con fondo crema */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#FFFFE9] rounded-3xl p-6 border border-[#F0EED0] flex items-center justify-center min-h-[240px]">
            <div className="w-48 h-36 relative flex items-center justify-center">
              <svg viewBox="0 0 260 170" className="w-full h-full filter drop-shadow-lg">
                <ellipse cx="130" cy="150" rx="100" ry="14" fill="#E6DFBD" opacity="0.7" />
                <path
                  d="M 45 140 C 45 152 215 152 215 140 L 195 55 C 195 45 65 45 65 55 Z"
                  fill={activeColor.hex}
                />
                <ellipse cx="130" cy="55" rx="68" ry="24" fill={activeColor.hex} />
                <ellipse cx="130" cy="53" rx="58" ry="19" fill="rgba(0,0,0,0.12)" />
                <g fill="#FFFFFF" opacity="0.95" transform="translate(116, 96) scale(0.9)">
                  <circle cx="7" cy="4" r="2.8" />
                  <circle cx="15" cy="3.5" r="2.8" />
                  <circle cx="23" cy="4" r="2.8" />
                  <circle cx="31" cy="7" r="2.5" />
                  <path d="M 9 12 C 14 10 22 10 27 12 C 30 15 28 22 23 23 C 18 24 16 23 13 23 C 8 22 6 15 9 12 Z" />
                </g>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {colors.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedColor(c.key)}
                className={`bg-[#FFFFE9] rounded-xl p-2 border flex items-center justify-center ${
                  selectedColor === c.key ? "border-[#FD704E] ring-2 ring-[#FD704E]/30" : "border-[#F0EED0]"
                }`}
              >
                <div className="w-8 h-5 rounded-md" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </div>

        {/* Ficha técnica */}
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black font-brand text-[#174C58]">
              Tazón Essential
            </h3>
            <p className="text-xs text-stone-500 font-medium">Diseño simple. Grandes momentos.</p>
            <div className="text-xl font-black text-[#174C58] font-brand mt-2">$249 MXN</div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <span className="text-[#FD704E]">★★★★★</span>
              <span className="font-bold text-stone-700">4.8</span>
              <span className="text-stone-400">(96 reseñas)</span>
            </div>
            <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
              Tazón de alta calidad, antideslizante y fácil de limpiar. Perfecto para el día a día de tu mascota.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-stone-700 block mb-1.5">Color</span>
            <div className="flex items-center gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedColor(c.key)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    selectedColor === c.key ? "scale-125 ring-2 ring-offset-2 ring-[#174C58]" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-stone-700 block mb-1">Cantidad</span>
            <div className="inline-flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden p-0.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 text-xs"
              >
                -
              </button>
              <span className="w-8 text-center font-black text-xs text-stone-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 text-xs"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => setAdded(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-xs transition-all shadow-md mt-2"
          >
            {added ? "¡Agregado al carrito! ✓" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  )
}
