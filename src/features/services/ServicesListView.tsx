import React from "react"

interface ServicesListViewProps {
  onSelectService: (serviceId: string) => void
}

export default function ServicesListView({ onSelectService }: ServicesListViewProps) {
  const serviceList = [
    {
      id: "consulta-vet",
      title: "Consulta veterinaria",
      subtitle: "Salud hoy, más momentos juntos mañana.",
      rating: "4.9",
      reviews: 128,
      duration: "45 min",
      price: "$250 MXN",
      icon: "🩺",
      bgIcon: "bg-[#F4CCEE] text-[#9D3C8D]",
    },
    {
      id: "paseo-perros",
      title: "Paseos diarios y ejercicio",
      subtitle: "Rutas activas con paseadores certificados.",
      rating: "4.8",
      reviews: 95,
      duration: "60 min",
      price: "$180 MXN",
      icon: "🐕",
      bgIcon: "bg-[#FFF2EE] text-[#FD704E]",
    },
    {
      id: "spa-estetica",
      title: "Baño y corte de estetica",
      subtitle: "Cuidado de pelaje e higiene completa.",
      rating: "4.9",
      reviews: 64,
      duration: "90 min",
      price: "$350 MXN",
      icon: "✂️",
      bgIcon: "bg-[#E8F5E9] text-emerald-800",
    },
  ]

  return (
    <div className="flex flex-col gap-6 font-body">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
          Servicios de Cuidado
        </h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
          Reserva citas veterinarias, paseos y grooming con profesionales verificados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {serviceList.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectService(s.id)}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-[#174C58]/40 hover:shadow-md transition-all text-left flex flex-col justify-between h-64 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${s.bgIcon} flex items-center justify-center text-3xl font-bold group-hover:scale-105 transition-transform`}>
                  {s.icon}
                </div>
                <span className="font-black text-[#174C58] text-lg font-brand">
                  {s.price}
                </span>
              </div>

              <h3 className="font-bold text-[#174C58] text-lg group-hover:text-[#FD704E] transition-colors font-brand">
                {s.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {s.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold">
              <span className="text-[#FD704E]">★ {s.rating} ({s.reviews})</span>
              <span className="text-slate-400">⏱ {s.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
