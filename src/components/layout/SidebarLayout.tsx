import React from "react"
import PetopiaLogo from "../ui/PetopiaLogo"

export type NavTab =
  | "auth"
  | "dashboard"
  | "mascotas"
  | "servicios"
  | "tienda"
  | "comunidad"
  | "recursos"
  | "history"

interface SidebarLayoutProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
  onBack?: () => void
  searchQuery?: string
  onSearchChange?: (q: string) => void
  cartCount?: number
  children: React.ReactNode
}

export default function SidebarLayout({
  activeTab,
  onSelectTab,
  onBack,
  searchQuery = "",
  onSearchChange,
  cartCount = 0,
  children,
}: SidebarLayoutProps) {
  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Inicio", icon: "🏠" },
    { id: "mascotas", label: "Mascotas", icon: "🐾" },
    { id: "servicios", label: "Servicios", icon: "📅" },
    { id: "tienda", label: "Tienda", icon: "🛍️" },
    { id: "comunidad", label: "Comunidad", icon: "👥" },
    { id: "recursos", label: "Recursos", icon: "📖" },
    { id: "history", label: "Mis reservas", icon: "📋" },
    { id: "auth", label: "Bienvenida / Auth", icon: "🔑" },
  ]

  // Si estamos en la pantalla de bienvenida/auth (Screen 1 full screen), no mostramos el marco estándar de la app
  if (activeTab === "auth") {
    return <div className="min-h-screen bg-[#174C58] text-[#333333] font-body">{children}</div>
  }

  return (
    <div className="min-h-screen flex bg-[#f7f6f2] font-body text-[#333333] selection:bg-[#fd704e]/20 selection:text-[#174c58]">
      {/* ─── SIDEBAR ────────────────────────────────────────────────── */}
      <aside className="w-60 sm:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 flex-shrink-0 z-30 sticky top-0 h-screen shadow-sm">
        <div>
          {/* Logo PeTopia */}
          <div
            onClick={() => onSelectTab("dashboard")}
            className="flex items-center gap-2 cursor-pointer mb-8 px-2 hover:opacity-90 transition-opacity"
          >
            <PetopiaLogo size="md" />
          </div>

          {/* Menú de Navegación */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 text-left ${
                    isActive
                      ? "bg-[#F4CCEE] text-[#9D3C8D] font-bold shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/70 hover:text-[#174c58]"
                  }`}
                >
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Perfil al pie del sidebar (Mi cuenta) */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => onSelectTab("auth")}
            className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-100/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#174C58] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                M
              </div>
              <span className="text-sm font-bold text-[#333333] group-hover:text-[#174C58]">
                Mi cuenta
              </span>
            </div>
            <span className="text-slate-400 text-xs font-bold group-hover:translate-x-0.5 transition-transform">
              &gt;
            </span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOPBAR HEADER */}
        <header className="h-16 bg-[#f7f6f2]/90 backdrop-blur-md sticky top-0 z-20 px-6 sm:px-8 flex items-center justify-between border-b border-slate-200/50">
          {/* Lado izquierdo: Botón volver o espacio */}
          <div className="flex items-center gap-4">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#174C58] px-3 py-1.5 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
              >
                <span>&larr;</span> Volver
              </button>
            ) : (
              <div className="w-4" />
            )}
          </div>

          {/* Centro: Buscador estilo mockup */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 text-sm pointer-events-none">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Buscar servicios, consejos, productos..."
                className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 shadow-xs focus:outline-none focus:border-[#FD704E] focus:ring-2 focus:ring-[#FD704E]/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Lado derecho: Acciones (Carrito, Notificaciones, Avatar) */}
          <div className="flex items-center gap-3">
            {cartCount > 0 && (
              <button
                onClick={() => onSelectTab("tienda")}
                className="relative p-2 rounded-full bg-white border border-slate-200/80 text-slate-600 hover:text-[#FD704E] hover:border-[#FD704E]/40 transition-all shadow-xs"
                title="Carrito de compras"
              >
                <span>🛒</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FD704E] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              </button>
            )}

            <button
              className="relative p-2 rounded-full bg-white border border-slate-200/80 text-slate-600 hover:text-[#174C58] transition-all shadow-xs cursor-pointer"
              title="Notificaciones"
            >
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FD704E] rounded-full border border-white" />
            </button>

            <button
              onClick={() => onSelectTab("auth")}
              className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-[#F4CCEE]/30 transition-all shadow-xs cursor-pointer"
              title="Perfil de usuario"
            >
              <span>👤</span>
            </button>
          </div>
        </header>

        {/* PÁGINA CONTENIDO */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  )
}
