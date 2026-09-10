import React, { useState } from "react"

interface PetsViewProps {
  onNavigate: (tab: string) => void
}

export default function PetsView({ onNavigate }: PetsViewProps) {
  const [activePet, setActivePet] = useState<"luna" | "simba">("luna")

  return (
    <div className="flex flex-col gap-6 font-body">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
            Mis Mascotas
          </h1>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
            Gestiona la salud, carnet e identificación de tus compañeros.
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-[#FD704E] hover:bg-[#E85D3B] text-white font-bold text-xs shadow-md shadow-[#FD704E]/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5">
          <span>+</span>
          <span>Agregar mascota</span>
        </button>
      </div>

      {/* Selector de Mascota */}
      <div className="flex gap-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActivePet("luna")}
          className={`flex items-center gap-3 p-3.5 px-5 rounded-2xl border transition-all cursor-pointer ${
            activePet === "luna"
              ? "bg-white border-[#174C58] shadow-md ring-2 ring-[#174C58]/10"
              : "bg-white/70 border-slate-200/80 hover:bg-white"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#F4CCEE] text-[#9D3C8D] flex items-center justify-center text-xl font-bold">
            🔮
          </div>
          <div className="text-left">
            <div className="font-bold text-[#333333] text-sm">Luna</div>
            <div className="text-[11px] text-slate-400 font-semibold">Perro · 2 años</div>
          </div>
        </button>

        <button
          onClick={() => setActivePet("simba")}
          className={`flex items-center gap-3 p-3.5 px-5 rounded-2xl border transition-all cursor-pointer ${
            activePet === "simba"
              ? "bg-white border-[#174C58] shadow-md ring-2 ring-[#174C58]/10"
              : "bg-white/70 border-slate-200/80 hover:bg-white"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF2EE] text-[#FD704E] flex items-center justify-center text-xl font-bold">
            🐱
          </div>
          <div className="text-left">
            <div className="font-bold text-[#333333] text-sm">Simba</div>
            <div className="text-[11px] text-slate-400 font-semibold">Gato · 3 años</div>
          </div>
        </button>
      </div>

      {/* Ficha de Mascota Seleccionada */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${activePet === "luna" ? "bg-[#F4CCEE] text-[#9D3C8D]" : "bg-[#FFF2EE] text-[#FD704E]"} flex items-center justify-center text-3xl font-bold shadow-xs`}>
              {activePet === "luna" ? "🔮" : "🐱"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#174C58] font-brand">
                  {activePet === "luna" ? "Luna" : "Simba"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-emerald-800 text-[10px] font-bold">
                  ✓ Verificado
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {activePet === "luna" ? "Caniche Toy · Hembra · 2 años · 6.2 kg" : "Siamés · Macho · 3 años · 4.5 kg"}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate("servicios")}
            className="px-5 py-2.5 rounded-full bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Agendar veterinario
          </button>
        </div>

        {/* Datos de Salud y Vacunación */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#f7f6f2] border border-slate-200/50">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Vacunas</span>
            <span className="text-sm font-bold text-[#333333] mt-1 block">Al día (Rabia, Séxtuple)</span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">✓ Próxima: Mar 2027</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f6f2] border border-slate-200/50">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Microchip</span>
            <span className="text-sm font-bold text-[#333333] mt-1 block">#985112009841</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Registrado en ICA</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f6f2] border border-slate-200/50">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Seguro Médico</span>
            <span className="text-sm font-bold text-[#333333] mt-1 block">Petopia Shield Pro</span>
            <span className="text-[11px] text-[#FD704E] font-semibold mt-1 block">Activo · Cobertura 100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
