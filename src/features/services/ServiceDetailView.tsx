import React, { useState } from "react"

interface ServiceDetailViewProps {
  onBack: () => void
  onBookSuccess?: () => void
}

export default function ServiceDetailView({ onBack, onBookSuccess }: ServiceDetailViewProps) {
  const [selectedDate, setSelectedDate] = useState<string>("Mié 19")
  const [selectedTime, setSelectedTime] = useState<string>("10:30")
  const [isBooked, setIsBooked] = useState(false)

  const dates = [
    { day: "Mar", num: "18" },
    { day: "Mié", num: "19" },
    { day: "Jue", num: "20" },
    { day: "Vie", num: "21" },
    { day: "Sáb", num: "22" },
  ]

  const times = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"]

  const handleContinue = () => {
    setIsBooked(true)
    setTimeout(() => {
      onBookSuccess?.()
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 font-body max-w-4xl mx-auto">
      {/* ── ENCABEZADO Y FICHA DEL SERVICIO ──────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start gap-6">
        {/* Icono de Estetoscopio en Caja Rosa */}
        <div className="w-24 h-24 rounded-3xl bg-[#F4CCEE] text-[#9D3C8D] flex items-center justify-center text-4xl flex-shrink-0 shadow-xs">
          🩺
        </div>

        {/* Detalles del Servicio */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
            Consulta veterinaria
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Salud hoy, más momentos juntos mañana.
          </p>

          {/* Calificación por Estrellas */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex text-[#FD704E] text-sm">
              ★ ★ ★ ★ ★
            </div>
            <span className="font-bold text-sm text-slate-700">4.9</span>
            <span className="text-slate-400 text-xs">(128 reseñas)</span>
          </div>

          {/* Viñetas / Badges informativos */}
          <div className="flex flex-wrap items-center gap-6 mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">⏱</span>
              <div>
                <span className="font-bold text-[#333333] block">45 min</span>
                <span className="text-slate-400 text-[11px]">Consulta presencial</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">👤</span>
              <div>
                <span className="font-bold text-[#333333] block">Veterinarios</span>
                <span className="text-slate-400 text-[11px]">certificados</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">📍</span>
              <div>
                <span className="font-bold text-[#333333] block">Disponibilidad</span>
                <span className="text-slate-400 text-[11px]">en tu zona</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PASO 1: SELECCIONA UNA FECHA ─────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
        <h2 className="text-sm font-black text-[#333333] font-brand mb-4">
          Selecciona una fecha
        </h2>

        {/* Carrusel de Días */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#174C58] hover:border-[#174C58] transition-colors cursor-pointer">
            &lt;
          </button>

          <div className="flex-1 grid grid-cols-5 gap-2 sm:gap-3">
            {dates.map((d) => {
              const dateId = `${d.day} ${d.num}`
              const isSelected = selectedDate === dateId
              return (
                <button
                  key={d.num}
                  onClick={() => setSelectedDate(dateId)}
                  className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#FD704E] text-white font-bold shadow-md shadow-[#FD704E]/25 scale-105"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  <span className="text-xs font-medium">{d.day}</span>
                  <span className="text-lg font-black font-brand mt-0.5">{d.num}</span>
                </button>
              )
            })}
          </div>

          <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#174C58] hover:border-[#174C58] transition-colors cursor-pointer">
            &gt;
          </button>
        </div>
      </div>

      {/* ── PASO 2: SELECCIONA UN HORARIO ────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
        <h2 className="text-sm font-black text-[#333333] font-brand mb-4">
          Selecciona un horario
        </h2>

        {/* Rejilla de Horarios */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {times.map((t) => {
            const isSelected = selectedTime === t
            return (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FD704E] text-white shadow-md shadow-[#FD704E]/25 scale-105"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── FOOTER Y CTA CONTINUAR ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
          Puedes cancelar o reprogramar sin costo hasta 24 h antes.
        </p>

        <button
          onClick={handleContinue}
          disabled={isBooked}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-sm shadow-md shadow-[#174C58]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isBooked ? "¡Reserva confirmada! ✓" : "Continuar"}
        </button>
      </div>
    </div>
  )
}
