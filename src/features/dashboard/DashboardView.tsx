import React from "react"

interface DashboardViewProps {
  onNavigate: (tab: string, detailId?: string) => void
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-8 font-body">
      {/* ── SECCIÓN DE BIENVENIDA Y BANNER DERECHO ────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#174C58] font-brand tracking-tight">
            ¡Hola, Alex!
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base mt-1">
            Hoy es un gran día para hacerlos felices.
          </p>
        </div>

        {/* Banner promocional rosa en la esquina superior derecha */}
        <div className="w-full md:w-auto bg-[#F4CCEE]/60 border border-[#F4CCEE] rounded-3xl p-4 sm:p-5 flex items-center gap-4 shadow-sm min-w-[260px]">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#9D3C8D] flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-xs">
            🖤
          </div>
          <div>
            <h3 className="font-brand font-black text-[#9D3C8D] text-sm leading-tight">
              Pequeñas acciones,
            </h3>
            <h3 className="font-brand font-black text-[#9D3C8D] text-sm leading-tight">
              grandes colas.
            </h3>
          </div>
        </div>
      </div>

      {/* ── 4 TARJETAS DE ACCIÓN RÁPIDA (REJILLA DE PASTEL TILES) ────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Tarjeta 1: Agendar servicio (Naranja Juguetón #FD704E) */}
        <button
          onClick={() => onNavigate("servicios", "consulta-vet")}
          className="bg-[#FD704E] text-white rounded-3xl p-6 flex flex-col justify-between h-44 shadow-md shadow-[#FD704E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-left group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📅
          </div>
          <div>
            <span className="font-brand font-black text-lg block leading-tight">
              Agendar
            </span>
            <span className="font-brand font-black text-lg block leading-tight">
              servicio
            </span>
          </div>
        </button>

        {/* Tarjeta 2: Tienda para mascotas (Rosa Mimos #F4CCEE) */}
        <button
          onClick={() => onNavigate("tienda", "tazon-essential")}
          className="bg-[#F4CCEE] text-[#9D3C8D] rounded-3xl p-6 flex flex-col justify-between h-44 border border-[#F4CCEE] shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all text-left group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-[#9D3C8D] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
            🛍️
          </div>
          <div>
            <span className="font-brand font-black text-lg block leading-tight">
              Tienda
            </span>
            <span className="font-brand font-black text-lg block leading-tight">
              para mascotas
            </span>
          </div>
        </button>

        {/* Tarjeta 3: Consejos y bienestar (Crema/Amarillo Suave #FFF9C4) */}
        <button
          onClick={() => onNavigate("recursos")}
          className="bg-[#FFF9C4] text-amber-900 rounded-3xl p-6 flex flex-col justify-between h-44 border border-amber-100 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all text-left group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-amber-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
            📖
          </div>
          <div>
            <span className="font-brand font-black text-lg block leading-tight">
              Consejos
            </span>
            <span className="font-brand font-black text-lg block leading-tight">
              y bienestar
            </span>
          </div>
        </button>

        {/* Tarjeta 4: Comunidad PeTopia (Verde Menta Suave #E8F5E9) */}
        <button
          onClick={() => onNavigate("comunidad")}
          className="bg-[#E8F5E9] text-emerald-900 rounded-3xl p-6 flex flex-col justify-between h-44 border border-emerald-100 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all text-left group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
            👥
          </div>
          <div>
            <span className="font-brand font-black text-lg block leading-tight">
              Comunidad
            </span>
            <span className="font-brand font-black text-lg block leading-tight">
              PeTopia
            </span>
          </div>
        </button>
      </div>

      {/* ── SECCIÓN: TUS MASCOTAS ────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-[#174C58] font-brand">
            Tus mascotas
          </h2>
          <button
            onClick={() => onNavigate("mascotas")}
            className="text-xs font-bold text-[#FD704E] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Ver todas</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Fila Horizontal de Mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Mascota 1: Luna */}
          <button
            onClick={() => onNavigate("mascotas")}
            className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-[#174C58]/30 hover:bg-slate-50/50 transition-all text-left cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-[#F4CCEE] text-[#9D3C8D] flex items-center justify-center text-2xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              🔮
            </div>
            <div>
              <h3 className="font-bold text-[#333333] text-base group-hover:text-[#174C58]">
                Luna
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                2 años · Perro
              </p>
            </div>
          </button>

          {/* Mascota 2: Simba */}
          <button
            onClick={() => onNavigate("mascotas")}
            className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-[#174C58]/30 hover:bg-slate-50/50 transition-all text-left cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-[#FFF2EE] text-[#FD704E] flex items-center justify-center text-2xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              🐱
            </div>
            <div>
              <h3 className="font-bold text-[#333333] text-base group-hover:text-[#174C58]">
                Simba
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                3 años · Gato
              </p>
            </div>
          </button>

          {/* Botón: + Agregar mascota */}
          <button
            onClick={() => onNavigate("mascotas")}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#174C58]/40 hover:bg-slate-50 transition-all text-slate-500 font-bold text-sm cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#174C58] group-hover:text-white flex items-center justify-center text-lg font-black transition-colors">
              +
            </div>
            <span>Agregar mascota</span>
          </button>
        </div>
      </div>
    </div>
  )
}
