import { useState } from "react"

type WebPage = "dashboard" | "search" | "provider" | "petRecord" | "history"
type BadgeT = "verified" | "pro" | "firstaid" | "ally" | "pending" | "expired"
type StatusT = "requested" | "accepted" | "active" | "completed" | "cancelled"

// ─── Design tokens (Branding Oficial: Naranja #FD704E, Verde Guardián #174C58, Crema #FFFFE9, Rosa #F4CCEE) ────

const BADGE_CFG: Record<BadgeT, { bg: string; text: string; border: string; icon: string; label: string }> = {
  verified: { bg: "bg-[#f0f6f7]", text: "text-[#174c58]", border: "border-[#174c58]/20", icon: "✓", label: "Verificado" },
  pro: { bg: "bg-[#fff2ee]", text: "text-[#fd704e]", border: "border-[#fd704e]/30", icon: "⭐", label: "Petopia Pro" },
  firstaid: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "🚑", label: "Primeros auxilios" },
  ally: { bg: "bg-[#fdf4fc]", text: "text-[#a23d92]", border: "border-[#f4ccee]", icon: "🤝", label: "Centro aliado" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "⏳", label: "Pendiente" },
  expired: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", icon: "⚠", label: "Vencido" },
}

const STATUS_CFG: Record<StatusT, { label: string; bg: string; text: string; dot: string }> = {
  requested: { label: "Solicitada", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  accepted: { label: "Aceptada", bg: "bg-[#f0f6f7]", text: "text-[#174c58]", dot: "bg-[#174c58]" },
  active: { label: "En curso", bg: "bg-[#fff2ee]", text: "text-[#fd704e]", dot: "bg-[#fd704e]" },
  completed: { label: "Completada", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  cancelled: { label: "Cancelada", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-400" },
}

// ─── Shared components ────────────────────────────────────────────────────────

function WBadge({ type }: { type: BadgeT }) {
  const c = BADGE_CFG[type]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${c.bg} ${c.text} ${c.border}`}>
      <span>{c.icon}</span>
      {c.label}
    </span>
  )
}

function WStatus({ status }: { status: StatusT }) {
  const c = STATUS_CFG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

function StarRating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-[#fd704e]">★</span>
      <span className="font-bold text-[#333333] text-sm">{value}</span>
      {reviews && <span className="text-slate-400 text-sm">({reviews} reseñas)</span>}
    </span>
  )
}

// ─── Top Navigation ───────────────────────────────────────────────────────────

function TopNav({
  page,
  go,
}: {
  page: WebPage
  go: (p: WebPage) => void
}) {
  const navItems: { id: WebPage; label: string }[] = [
    { id: "dashboard", label: "Inicio" },
    { id: "search", label: "Buscar servicios" },
    { id: "history", label: "Mis reservas" },
    { id: "petRecord", label: "Mi mascota" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-100 flex items-center gap-4 px-6 shadow-sm shadow-slate-100">
      {/* Logo */}
      <button onClick={() => go("dashboard")} className="flex items-center gap-2 flex-shrink-0 mr-2">
        <span className="text-2xl">🐾</span>
        <span className="text-xl font-black text-[#174c58] font-brand tracking-tight">Petopia</span>
      </button>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              page === item.id
                ? "bg-[#f0f6f7] text-[#174c58] font-bold"
                : "text-slate-500 hover:text-[#174c58] hover:bg-[#f0f6f7]/50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-sm text-[#333333] hover:border-[#174c58] hover:text-[#174c58] transition-all">
          <span className="text-xs">📍</span> Chapinero, Bogotá
          <span className="text-slate-400 text-xs">▾</span>
        </button>

        <button className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-base hover:bg-slate-200 transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#fd704e] rounded-full border border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-[#174c58]/20">
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=72&h=72&fit=crop"
              alt="María"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-[#333333] leading-none">María G.</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Plan Estándar</div>
          </div>
          <span className="text-slate-300 text-xs hidden sm:block">▾</span>
        </div>
      </div>
    </header>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ go }: { go: (p: WebPage) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Welcome row */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="text-slate-400 text-sm font-medium">Domingo, 24 de agosto de 2026</p>
          <h1 className="text-3xl font-black text-[#174c58] font-brand mt-0.5">
            Buenos días, María 👋
          </h1>
        </div>
        <button
          onClick={() => go("search")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#fd704e] text-white font-bold text-sm shadow-lg shadow-[#fd704e]/25 hover:bg-[#e85d3b] transition-all"
        >
          <span>🔍</span> Buscar servicio
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: "📋", label: "Reservas activas", value: "1", sub: "1 pendiente de hoy", color: "text-[#174c58]", bg: "bg-[#f0f6f7]" },
          { icon: "✅", label: "Servicios completados", value: "12", sub: "★ 4.9 promedio", color: "text-green-600", bg: "bg-green-50" },
          { icon: "🤝", label: "Cuidadores guardados", value: "5", sub: "2 verificados Petopia Pro", color: "text-[#a23d92]", bg: "bg-[#fdf4fc]" },
          { icon: "🎁", label: "Ahorro Club Petopia", value: "$45.000", sub: "Este mes", color: "text-[#fd704e]", bg: "bg-[#fff2ee]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-3`}>
              {s.icon}
            </div>
            <div className={`text-2xl font-black ${s.color} leading-none`}>{s.value}</div>
            <div className="text-sm font-bold text-[#333333] mt-1">{s.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col: 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Active booking */}
          <div
            className="p-5 rounded-2xl bg-gradient-to-r from-[#fd704e] to-[#ff9176] text-white cursor-pointer hover:opacity-95 transition-opacity shadow-md shadow-[#fd704e]/20"
            onClick={() => go("history")}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/25 flex items-center justify-center text-3xl flex-shrink-0">
                🐕
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-xs font-bold uppercase tracking-wide">Reserva confirmada · Hoy</p>
                <h3 className="text-xl font-black mt-0.5">Paseo con Carlos Martínez</h3>
                <p className="text-white/90 text-sm mt-0.5">Buddy · 4:00 PM · 30 min · Chapinero</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2">
                <WStatus status="accepted" />
                <span className="text-white/90 text-xs font-semibold">$25.000 · Pagado</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 pt-4 border-t border-white/20">
              <button className="flex-1 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors">
                Ver detalles
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-white text-[#fd704e] text-xs font-bold hover:bg-[#fff2ee] transition-colors">
                Contactar cuidador
              </button>
            </div>
          </div>

          {/* My pet */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#333333]">Mis mascotas</h3>
              <button className="text-[#174c58] text-xs font-bold hover:underline">+ Agregar mascota</button>
            </div>
            <button
              onClick={() => go("petRecord")}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#f0f6f7] border border-[#174c58]/15 hover:border-[#174c58]/40 hover:shadow-sm transition-all text-left"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=128&h=128&fit=crop"
                    alt="Buddy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white text-white text-[9px] font-black flex items-center justify-center">
                  ✓
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#333333] text-base">Buddy</span>
                  <WBadge type="verified" />
                </div>
                <p className="text-sm text-slate-500 mt-0.5">Golden Retriever · Macho · 3 años · 28 kg</p>
                <div className="flex gap-3 mt-2">
                  {[
                    { label: "Vacunas", ok: true },
                    { label: "Microchip", ok: true },
                    { label: "Esterilizado", ok: true },
                    { label: "Seguro", ok: false },
                  ].map((item) => (
                    <span key={item.label} className={`text-xs font-semibold flex items-center gap-1 ${item.ok ? "text-green-600" : "text-red-400"}`}>
                      <span>{item.ok ? "✓" : "⚠"}</span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-xs text-slate-400">Ver expediente</div>
                <div className="text-[#174c58] text-lg mt-1 font-bold">→</div>
              </div>
            </button>
          </div>

          {/* Nearby providers */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#333333]">Cerca de ti · Chapinero</h3>
              <button onClick={() => go("search")} className="text-[#174c58] text-xs font-bold hover:underline">
                Ver todos →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Carlos Martínez",
                  role: "Paseador",
                  rating: 4.9, reviews: 127,
                  price: "25.000", unit: "/paseo",
                  img: "1559839734-2b71ea197ec2",
                  badges: ["verified", "pro"] as BadgeT[],
                  dist: "0.8 km", avail: true,
                },
                {
                  name: "Laura Ospina",
                  role: "Cuidadora",
                  rating: 4.8, reviews: 63,
                  price: "60.000", unit: "/noche",
                  img: "1508214751196-bcfd4ca60f91",
                  badges: ["verified", "firstaid"] as BadgeT[],
                  dist: "1.1 km", avail: true,
                },
                {
                  name: "Clínica Vet Sur",
                  role: "Veterinaria",
                  rating: 4.8, reviews: 89,
                  price: "45.000", unit: "/consulta",
                  img: "1612349317150-e413f6a5b16d",
                  badges: ["verified", "ally"] as BadgeT[],
                  dist: "1.2 km", avail: true,
                },
                {
                  name: "Andrés Rojas",
                  role: "Paseador · Adiestramiento",
                  rating: 4.6, reviews: 41,
                  price: "20.000", unit: "/paseo",
                  img: "1500648767791-00dcc994a43e",
                  badges: ["verified"] as BadgeT[],
                  dist: "2.0 km", avail: false,
                },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => go("provider")}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-[#174c58]/30 hover:shadow-sm transition-all text-left"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={`https://images.unsplash.com/photo-${p.img}?w=96&h=96&fit=crop`}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {p.avail && <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#333333] text-sm truncate">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.role} · {p.dist}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[#fd704e] text-xs">★ {p.rating}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-400">{p.reviews} reseñas</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-[#174c58] text-sm">${p.price}</div>
                    <div className="text-[10px] text-slate-400">{p.unit}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar: 1/3 */}
        <div className="flex flex-col gap-5">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-[#333333] mb-3">Acciones rápidas</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "🐕", label: "Paseo", bg: "bg-[#f0f6f7]", text: "text-[#174c58]" },
                { icon: "🏠", label: "Guardería", bg: "bg-blue-50", text: "text-blue-700" },
                { icon: "🏥", label: "Veterinaria", bg: "bg-red-50", text: "text-red-600" },
                { icon: "✂️", label: "Spa y baño", bg: "bg-violet-50", text: "text-violet-700" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => go("search")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-slate-100 hover:border-[#174c58]/30 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center text-xl`}>{a.icon}</div>
                  <span className={`text-xs font-bold ${a.text}`}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Club Petopia promo (Branding: #174C58 con botón #FD704E) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#174c58] to-[#0e4752] text-white shadow-lg shadow-[#174c58]/20">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-black text-base font-brand">Club Petopia Pro</h3>
            <p className="text-white/80 text-xs leading-relaxed mt-1.5">
              Descuentos en todos los servicios, prioridad en reservas y acceso a veterinarias aliadas.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] text-[#ffffe9] font-bold uppercase tracking-wide">Ahorro acumulado</div>
              <div className="text-2xl font-black mt-0.5">$45.000</div>
              <div className="text-white/70 text-xs">en los últimos 30 días</div>
            </div>
            <button className="w-full mt-4 py-3 rounded-xl bg-[#fd704e] text-white font-bold text-sm hover:bg-[#e85d3b] shadow-md shadow-[#fd704e]/30 transition-all">
              Mejorar plan →
            </button>
          </div>

          {/* Recent bookings mini */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#333333] text-sm">Reservas recientes</h3>
              <button onClick={() => go("history")} className="text-[#174c58] text-xs font-bold hover:underline">Ver todas</button>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { service: "Paseo", date: "25 Ago", provider: "Carlos M.", status: "completed" as StatusT },
                { service: "Consulta vet.", date: "15 Jul", provider: "Vet Sur", status: "completed" as StatusT },
                { service: "Baño + peluquería", date: "28 Jun", provider: "PetSpa", status: "completed" as StatusT },
              ].map((r) => (
                <div key={r.service + r.date} className="flex items-center gap-2.5 py-2 border-b border-slate-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${STATUS_CFG[r.status].dot} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#333333] truncate">{r.service} · {r.provider}</div>
                    <div className="text-[10px] text-slate-400">{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Search Page ──────────────────────────────────────────────────────────────

function SearchPage({ go }: { go: (p: WebPage) => void }) {
  const [category, setCategory] = useState("Paseo")
  const [sortBy, setSortBy] = useState("Calificación")

  const categories = ["Paseo", "Guardería", "Veterinaria", "Spa", "Adiestramiento"]
  const providers = [
    {
      name: "Carlos Martínez", role: "Paseador certificado",
      rating: 4.9, reviews: 127, price: "25.000", unit: "/paseo",
      img: "1559839734-2b71ea197ec2", badges: ["verified", "pro"] as BadgeT[],
      dist: "0.8 km", avail: true, desc: "3 años de experiencia. Certificado en primeros auxilios para mascotas. Rutas en Chapinero y Teusaquillo.",
    },
    {
      name: "Laura Ospina", role: "Cuidadora · Hospedaje en casa",
      rating: 4.8, reviews: 63, price: "60.000", unit: "/noche",
      img: "1508214751196-bcfd4ca60f91", badges: ["verified", "firstaid"] as BadgeT[],
      dist: "1.1 km", avail: true, desc: "Casa con jardín amplio. Acepta perros de todas las tallas. Fotos y actualizaciones constantes.",
    },
    {
      name: "Clínica Vet Sur", role: "Veterinaria · Centro aliado Petopia",
      rating: 4.8, reviews: 89, price: "45.000", unit: "/consulta",
      img: "1612349317150-e413f6a5b16d", badges: ["verified", "ally"] as BadgeT[],
      dist: "1.2 km", avail: true, desc: "Atención preventiva y de urgencias. Vacunación, cirugías y laboratorio en el mismo lugar.",
    },
    {
      name: "Andrés Rojas", role: "Paseador · Adiestramiento básico",
      rating: 4.6, reviews: 41, price: "20.000", unit: "/paseo",
      img: "1500648767791-00dcc994a43e", badges: ["verified"] as BadgeT[],
      dist: "2.0 km", avail: false, desc: "Especializado en perros con problemas de conducta. Metodología positiva y sin castigos.",
    },
    {
      name: "PetSpa Chapinero", role: "Spa y peluquería canina",
      rating: 4.7, reviews: 55, price: "50.000", unit: "/sesión",
      img: "1576201836106-db1758fd1c97", badges: ["verified"] as BadgeT[],
      dist: "0.5 km", avail: true, desc: "Baño, corte de pelo, limpieza de oídos y corte de uñas. Productos hipoalergénicos disponibles.",
    },
    {
      name: "Guardería Petlandia", role: "Guardería diurna y nocturna",
      rating: 4.9, reviews: 210, price: "35.000", unit: "/día",
      img: "1548199973-03cce0bbc87b", badges: ["verified", "pro", "firstaid"] as BadgeT[],
      dist: "1.5 km", avail: true, desc: "Espacio amplio, cámaras en vivo, actividades de enriquecimiento y grupos por tamaño.",
    },
  ]

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Filters sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-100 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Search input */}
        <div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus-within:border-[#174c58] transition-all">
            <span className="text-slate-400 text-sm">🔍</span>
            <input className="flex-1 bg-transparent text-sm text-[#333333] placeholder-slate-300 focus:outline-none" placeholder="Buscar..." />
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Categoría</h4>
          <div className="flex flex-col gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  category === c ? "bg-[#174c58] text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="text-base">
                  {c === "Paseo" ? "🐕" : c === "Guardería" ? "🏠" : c === "Veterinaria" ? "🏥" : c === "Spa" ? "✂️" : "🎓"}
                </span>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Zone */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Zona</h4>
          <div className="flex flex-col gap-2">
            {["Chapinero", "Teusaquillo", "Usaquén", "Suba", "Laureles"].map((zone) => (
              <label key={zone} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={zone === "Chapinero" || zone === "Teusaquillo"}
                  className="accent-[#174c58] w-4 h-4 rounded"
                />
                <span className="text-sm text-slate-600 group-hover:text-[#333333]">{zone}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Precio por servicio</h4>
          <div className="flex flex-col gap-2">
            {["Menos de $25.000", "$25.000 – $50.000", "$50.000 – $80.000", "Más de $80.000"].map((r) => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="price" defaultChecked={r.includes("25.000 – 50")} className="accent-[#174c58] w-4 h-4" />
                <span className="text-sm text-slate-600">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Calificación mínima</h4>
          <div className="flex flex-col gap-1.5">
            {["4.5+", "4.0+", "3.5+", "Cualquiera"].map((r) => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="rating" defaultChecked={r === "4.5+"} className="accent-[#174c58] w-4 h-4" />
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  {r !== "Cualquiera" && <span className="text-[#fd704e]">★</span>}
                  {r}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3 pb-2">
          {[
            { label: "Solo verificados", on: true },
            { label: "Disponibles hoy", on: true },
            { label: "Con primeros auxilios", on: false },
          ].map((t) => (
            <div key={t.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{t.label}</span>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${t.on ? "bg-[#174c58]" : "bg-slate-200"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${t.on ? "left-5" : "left-1"}`} />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Results */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Sort bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-600">
            <span className="text-[#333333] font-bold">{providers.length} cuidadores</span> en Chapinero y alrededores
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Ordenar por:</span>
            {["Calificación", "Precio", "Distancia", "Disponibilidad"].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  sortBy === s ? "bg-[#174c58] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {providers.map((p) => (
            <button
              key={p.name}
              onClick={() => go("provider")}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-[#174c58]/30 transition-all text-left group"
            >
              {/* Photo */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${p.img}?w=480&h=320&fit=crop`}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {p.badges.map((b) => <WBadge key={b} type={b} />)}
                </div>
                {p.avail ? (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Disponible
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-full bg-slate-700/80 text-white text-xs font-bold">
                    No disponible
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-[#333333]">{p.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{p.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-[#174c58]">${p.price}</div>
                    <div className="text-[10px] text-slate-400">{p.unit}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <StarRating value={p.rating} reviews={p.reviews} />
                  <span className="text-xs text-slate-400">📍 {p.dist}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

// ─── Provider Profile Page ────────────────────────────────────────────────────

function ProviderPage({ go }: { go: (p: WebPage) => void }) {
  const [tab, setTab] = useState("servicios")
  const [selectedService, setSelectedService] = useState("Paseo individual")
  const [selectedDate, setSelectedDate] = useState(29)
  const [selectedTime, setSelectedTime] = useState("4:00 PM")

  const services = [
    { name: "Paseo individual", duration: "30 min", price: "25.000" },
    { name: "Paseo grupal (hasta 3)", duration: "45 min", price: "18.000" },
    { name: "Paseo + baño básico", duration: "1.5 h", price: "45.000" },
  ]

  const days = [
    { n: 25, d: "Lun", ok: true }, { n: 26, d: "Mar", ok: true },
    { n: 27, d: "Mié", ok: false }, { n: 28, d: "Jue", ok: true },
    { n: 29, d: "Vie", ok: true }, { n: 30, d: "Sáb", ok: true },
  ]

  const currentService = services.find((s) => s.name === selectedService) || services[0]
  const totalPrice = parseInt(currentService.price.replace(".", "")) + 2500

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => go("search")} className="hover:text-[#174c58] transition-colors">Buscar servicios</button>
          <span>›</span>
          <span>Paseos</span>
          <span>›</span>
          <span className="text-slate-600 font-semibold">Carlos Martínez</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="relative h-72 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1280&h=576&fit=crop"
            alt="Carlos paseando perros"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-6 flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop"
                alt="Carlos"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white font-brand">Carlos Martínez</h1>
              <p className="text-white/80 text-sm">Paseador certificado · Chapinero, Bogotá</p>
            </div>
          </div>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/30 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/50 transition-colors">
            ♡
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: profile + tabs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info strip */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-wrap items-center gap-5">
              <div>
                <StarRating value={4.9} reviews={127} />
              </div>
              <div className="h-5 w-px bg-slate-200" />
              <div className="flex gap-1.5 flex-wrap">
                <WBadge type="verified" />
                <WBadge type="pro" />
                <WBadge type="firstaid" />
              </div>
              <div className="h-5 w-px bg-slate-200" />
              <div className="flex gap-5">
                {[["340", "Servicios"], ["3 años", "Experiencia"], ["98%", "Aceptación"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-black text-[#174c58]">{val}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{label}</div>
                  </div>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-sm text-green-600 font-bold">Disponible ahora</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 bg-white border border-slate-100 rounded-2xl overflow-hidden">
              {["servicios", "reseñas", "info"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                    tab === t ? "border-[#174c58] text-[#174c58] bg-[#f0f6f7]" : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {tab === "servicios" && (
              <div className="flex flex-col gap-4">
                {services.map((s) => (
                  <div
                    key={s.name}
                    onClick={() => setSelectedService(s.name)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedService === s.name ? "border-[#174c58] bg-[#f0f6f7]" : "border-slate-100 bg-white hover:border-[#174c58]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        selectedService === s.name ? "border-[#174c58] bg-[#174c58]" : "border-slate-300"
                      }`}>
                        {selectedService === s.name && <span className="text-white text-[10px] font-black">✓</span>}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#333333]">{s.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">⏱ {s.duration}</div>
                      </div>
                      <div className="font-black text-[#174c58] text-lg">${s.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "reseñas" && (
              <div className="flex flex-col gap-5">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-[#333333]">4.9</div>
                    <div className="flex gap-0.5 mt-2 justify-center">
                      {[1,2,3,4,5].map((n) => <span key={n} className="text-[#fd704e] text-lg">★</span>)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1.5">127 reseñas</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <div key={n} className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-slate-500 w-4">{n}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-orange-400" style={{ width: n === 5 ? "84%" : n === 4 ? "13%" : "3%" }} />
                        </div>
                        <span className="text-xs text-slate-400 w-8">{n === 5 ? "107" : n === 4 ? "16" : "4"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Valentina R.", date: "Ago 2026", rating: 5, comment: "Carlos es increíble con Mochi. Puntual, responsable y siempre envía fotos. ¡100% recomendado!" },
                    { name: "Felipe M.", date: "Jul 2026", rating: 5, comment: "Excelente servicio. Max llegó cansado y feliz. Conoce muy bien las rutas del parque." },
                    { name: "Camila T.", date: "Jun 2026", rating: 4, comment: "Buen trato con Luna. Llegó un poco tarde pero fue muy atento." },
                    { name: "Jorge P.", date: "Jun 2026", rating: 5, comment: "Muy profesional. Recibe instrucciones claramente y las sigue al pie de la letra." },
                  ].map((r) => (
                    <div key={r.name} className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center font-black text-[#174c58]">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-[#333333] text-sm">{r.name}</div>
                          <div className="text-xs text-slate-400">{r.date}</div>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[1,2,3,4,5].map((n) => <span key={n} className={`text-sm ${n <= r.rating ? "text-[#fd704e]" : "text-slate-200"}`}>★</span>)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "info" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Sobre Carlos", content: "Apasionado por los animales con 3 años de experiencia como paseador profesional en Bogotá. Certificado en primeros auxilios para mascotas por Cruz Roja Colombiana." },
                  { title: "Política de cancelación", content: "Cancelación gratuita hasta 4 horas antes del servicio. Cancelaciones posteriores tienen un cargo del 50%." },
                  { title: "Acepta mascotas", content: "Perros pequeños, medianos y grandes. No acepta mascotas agresivas sin previo aviso. Máximo 3 perros en paseo grupal." },
                  { title: "Zona de servicio", content: "Chapinero, Teusaquillo, Quinta Camacho, Lago Gaitán y sectores aledaños. Consultar otras zonas." },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h4 className="font-bold text-[#333333] mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Booking widget (sticky) */}
          <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-2xl font-black text-[#174c58]">${currentService.price}</div>
                  <div className="text-xs text-slate-400">/paseo · {currentService.duration}</div>
                </div>
                <StarRating value={4.9} />
              </div>

              {/* Service selector */}
              <div className="mb-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Servicio</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-[#333333] text-sm font-semibold focus:outline-none focus:border-[#174c58] focus:bg-white transition-all"
                >
                  {services.map((s) => <option key={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Fecha · Agosto 2026</label>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {days.map((d) => (
                    <button
                      key={d.n}
                      disabled={!d.ok}
                      onClick={() => setSelectedDate(d.n)}
                      className={`flex-shrink-0 flex flex-col items-center py-2.5 px-3 rounded-xl text-xs transition-all ${
                        !d.ok ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                          : selectedDate === d.n ? "bg-[#174c58] text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span className="text-[9px] font-bold">{d.d}</span>
                      <span className="font-black text-base mt-0.5">{d.n}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="mb-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Hora</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["8:00 AM", "10:00 AM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                        selectedTime === t ? "bg-[#174c58] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pet */}
              <div className="mb-5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Mascota</label>
                <div className="flex items-center gap-2.5 p-3 rounded-xl border-2 border-[#174c58] bg-[#f0f6f7]">
                  <div className="w-9 h-9 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=72&h=72&fit=crop" alt="Buddy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm font-bold text-[#333333]">Buddy</div>
                  <span className="text-[#174c58] font-black">✓</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="py-4 border-t border-slate-100 flex flex-col gap-2 mb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{selectedService}</span>
                  <span className="font-semibold">${currentService.price}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tarifa de servicio</span>
                  <span className="font-semibold">$2.500</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#333333] pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-[#174c58]">${totalPrice.toLocaleString("es-CO")}</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-[#fd704e] text-white font-black shadow-lg shadow-[#fd704e]/25 hover:bg-[#e85d3b] transition-all flex items-center justify-center gap-2">
                <span>🔒</span> Reservar · ${totalPrice.toLocaleString("es-CO")}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2">Pago seguro · Cancelación gratis hasta 4h antes</p>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-2.5">
              {[
                { icon: "✓", label: "Identidad verificada por Petopia" },
                { icon: "🚑", label: "Certificado en primeros auxilios" },
                { icon: "🔒", label: "Seguro de responsabilidad incluido" },
                { icon: "📸", label: "Fotos y actualizaciones durante el servicio" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2.5 text-xs text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-[#174c58] flex items-center justify-center text-[10px] font-black flex-shrink-0">
                    {t.icon}
                  </span>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Pet Record Page ──────────────────────────────────────────────────────────

function PetRecordPage({ go }: { go: (p: WebPage) => void }) {
  const [tab, setTab] = useState("id")
  const tabs = [
    { id: "id", label: "Identificación" },
    { id: "salud", label: "Salud" },
    { id: "comportamiento", label: "Comportamiento" },
    { id: "documentos", label: "Documentos" },
    { id: "emergencias", label: "Emergencias" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Pet header */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="h-48 relative">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1280&h=384&fit=crop&auto=format"
            alt="Buddy"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e4752]/90 to-[#174c58]/40" />
          <div className="absolute inset-0 flex items-center px-8">
            <div className="relative mr-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=192&h=192&fit=crop"
                  alt="Buddy"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#174c58] text-white text-xs flex items-center justify-center shadow-md">
                📷
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-black text-white font-brand">Buddy</h1>
                <WBadge type="verified" />
              </div>
              <p className="text-teal-200 text-sm mt-1">Golden Retriever · Macho · 3 años · 28 kg</p>
              <div className="flex items-center gap-4 mt-3">
                {[
                  { icon: "💉", label: "Vacunas", ok: true },
                  { icon: "🔬", label: "Desparasitado", ok: true },
                  { icon: "✂️", label: "Esterilizado", ok: true },
                  { icon: "📡", label: "Microchip", ok: true },
                  { icon: "🛡️", label: "Seguro", ok: false },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${item.ok ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-300"}`}>
                    <span>{item.icon}</span>
                    {item.label}
                    {item.ok ? " ✓" : " ⚠"}
                  </div>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 text-white text-sm font-bold hover:bg-white/30 transition-colors">
              ✏️ Editar perfil
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="flex gap-8">
        {/* Tab sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                  tab === t.id ? "bg-[#174c58] text-white" : "text-slate-500 hover:bg-slate-50 hover:text-[#333333]"
                }`}
              >
                <span>
                  {t.id === "id" ? "🐾" : t.id === "salud" ? "❤️" : t.id === "comportamiento" ? "🧠" : t.id === "documentos" ? "📄" : "🚨"}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1">
          {tab === "id" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-bold text-[#333333] text-lg mb-5">Datos de identificación</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  ["Especie", "Perro"], ["Raza", "Golden Retriever"],
                  ["Sexo", "Macho"], ["Fecha de nac.", "12 Mar 2021"],
                  ["Color", "Dorado"], ["Peso", "28 kg"],
                  ["Talla", "Grande (26–44 kg)"], ["Pelaje", "Largo"],
                  ["Esterilizado", "Sí · Jun 2023"], ["Microchip", "985112003456789"],
                  ["Registro", "ICA-BOG-2021-334"], ["Pasaporte", "No registrado"],
                ].map(([label, value]) => (
                  <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{label}</div>
                    <div className="text-sm font-semibold text-[#333333] mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "salud" && (
            <div className="flex flex-col gap-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white text-xl font-black">✓</div>
                <div>
                  <div className="font-black text-green-800">Estado de salud: Saludable</div>
                  <div className="text-sm text-green-600 mt-0.5">Última visita veterinaria: 15 Jul 2025 · Clínica Vet Sur</div>
                </div>
                <button className="ml-auto px-4 py-2.5 rounded-xl border border-green-300 text-green-700 font-bold text-sm hover:bg-green-100 transition-colors">
                  + Registrar visita
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Vacunas al día", icon: "💉", items: ["Rabia · Ene 2026 · Próx. Ene 2027", "Moquillo · Feb 2026", "Parvovirus · Feb 2026", "Leptospirosis · Mar 2026"] },
                  { label: "Desparasitaciones", icon: "🔬", items: ["Interna (Drontal Plus) · Mar 2026", "Externa (Bravecto) · Feb 2026", "Próxima: May 2026"] },
                  { label: "Condiciones activas", icon: "🩺", items: ["Ninguna registrada actualmente"] },
                  { label: "Alergias", icon: "⚠️", items: ["Pollo (alimento) — moderada", "Polen (ambiental) — leve"] },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="text-xl">{s.icon}</span>
                      <span className="font-bold text-[#333333]">{s.label}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {s.items.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "documentos" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#333333] text-lg">Documentos de Buddy</h3>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#174c58] text-white font-bold text-sm hover:bg-[#0e4752] transition-colors">
                  + Subir documento
                </button>
              </div>

              {/* Drag & drop area */}
              <div className="border-2 border-dashed border-[#174c58]/30 rounded-2xl p-8 mb-5 flex flex-col items-center gap-3 bg-[#f0f6f7] hover:bg-[#f0f6f7] transition-colors cursor-pointer">
                <span className="text-4xl">📁</span>
                <p className="font-semibold text-slate-700">Arrastra documentos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-slate-400">PDF, JPG, PNG · Máx. 10 MB por archivo</p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: "Carnet de vacunación 2026", status: "verified" as BadgeT, date: "Ene 2026", size: "2.1 MB" },
                  { name: "Registro de microchip", status: "verified" as BadgeT, date: "Mar 2024", size: "0.8 MB" },
                  { name: "Certificado de esterilización", status: "verified" as BadgeT, date: "Jun 2023", size: "1.4 MB" },
                  { name: "Historial veterinario completo", status: "pending" as BadgeT, date: "Pendiente de revisión", size: "—" },
                  { name: "Seguro de responsabilidad civil", status: "expired" as BadgeT, date: "Vencido Jul 2025", size: "0.5 MB" },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">📄</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#333333] text-sm">{doc.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{doc.date} · {doc.size}</div>
                    </div>
                    <WBadge type={doc.status} />
                    <button className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 text-sm transition-colors">
                      ↓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(tab === "comportamiento" || tab === "emergencias") && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <p className="text-slate-500 text-sm">Selecciona esta pestaña en la app móvil para ver el contenido completo interactivo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── History Page ─────────────────────────────────────────────────────────────

function HistoryPage({ go }: { go: (p: WebPage) => void }) {
  const [tab, setTab] = useState("activas")

  const bookings = [
    { id: "#PET-2082", service: "Paseo individual", provider: "Carlos Martínez", providerImg: "1559839734-2b71ea197ec2", pet: "Buddy", date: "Vie 29 Ago 2026", time: "4:00 PM", status: "accepted" as StatusT, price: "$27.500", rated: false },
    { id: "#PET-2041", service: "Paseo individual", provider: "Carlos Martínez", providerImg: "1559839734-2b71ea197ec2", pet: "Buddy", date: "Lun 25 Ago 2026", time: "10:00 AM", status: "completed" as StatusT, price: "$27.500", rated: false },
    { id: "#PET-1987", service: "Consulta veterinaria", provider: "Clínica Vet Sur", providerImg: "1612349317150-e413f6a5b16d", pet: "Buddy", date: "Mar 15 Jul 2026", time: "3:00 PM", status: "completed" as StatusT, price: "$47.500", rated: true },
    { id: "#PET-1934", service: "Baño y peluquería", provider: "PetSpa Chapinero", providerImg: "1576201836106-db1758fd1c97", pet: "Buddy", date: "Sáb 28 Jun 2026", time: "11:00 AM", status: "completed" as StatusT, price: "$57.500", rated: true },
  ]

  const filtered = tab === "activas"
    ? bookings.filter((b) => ["requested", "accepted", "active"].includes(b.status))
    : tab === "completadas"
    ? bookings.filter((b) => b.status === "completed")
    : []

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black text-[#333333] font-brand">Mis reservas</h1>
        <button
          onClick={() => go("search")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#174c58] text-white font-bold text-sm shadow-lg shadow-[#174c58]/20 hover:bg-[#0e4752] transition-all"
        >
          + Nueva reserva
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Este mes", value: "3", icon: "📋", color: "text-[#174c58]", bg: "bg-[#f0f6f7]" },
          { label: "Completadas", value: "12", icon: "✅", color: "text-green-600", bg: "bg-green-50" },
          { label: "Gastado (ago)", value: "$82.500", icon: "💳", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ahorrado club", value: "$9.200", icon: "🎁", color: "text-[#fd704e]", bg: "bg-[#fff2ee]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl`}>{s.icon}</div>
            <div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 bg-white border border-slate-100 rounded-2xl overflow-hidden mb-5">
        {["activas", "completadas", "canceladas"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
              tab === t ? "border-[#174c58] text-[#174c58] bg-[#f0f6f7]" : "border-transparent text-slate-400"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === "activas" && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#174c58] text-white text-[9px] font-black">1</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["ID", "Servicio", "Prestador", "Mascota", "Fecha y hora", "Estado", "Precio", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-slate-400">{b.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#333333] text-sm">{b.service}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/photo-${b.providerImg}?w=64&h=64&fit=crop`}
                          alt={b.provider}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{b.provider}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">{b.pet}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-700 font-medium">{b.date}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{b.time}</div>
                  </td>
                  <td className="px-5 py-4">
                    <WStatus status={b.status} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-black text-[#174c58]">{b.price}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        Ver
                      </button>
                      {b.status === "completed" && !b.rated && (
                        <button className="px-3 py-1.5 rounded-lg bg-[#fff2ee] border border-[#fd704e]/30 text-xs font-bold text-[#fd704e] hover:bg-orange-100 transition-colors">
                          ★ Calificar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-5xl">📭</span>
          <p className="text-slate-500 font-semibold">No hay reservas en esta categoría</p>
          <button onClick={() => go("search")} className="px-5 py-2.5 rounded-xl bg-[#174c58] text-white font-bold text-sm hover:bg-[#0e4752] transition-colors">
            Reservar servicio
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Web App Root ─────────────────────────────────────────────────────────────

export default function WebApp() {
  const [page, setPage] = useState<WebPage>("dashboard")
  const go = (p: WebPage) => setPage(p)

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav page={page} go={go} />
      <main className="pt-16">
        {page === "dashboard" && <Dashboard go={go} />}
        {page === "search" && <SearchPage go={go} />}
        {page === "provider" && <ProviderPage go={go} />}
        {page === "petRecord" && <PetRecordPage go={go} />}
        {page === "history" && <HistoryPage go={go} />}
      </main>
    </div>
  )
}
