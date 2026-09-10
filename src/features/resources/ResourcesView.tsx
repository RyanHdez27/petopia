import React from "react"

export default function ResourcesView() {
  const articles = [
    {
      title: "Guía completa de nutrición canina y felina",
      category: "Alimentación",
      readTime: "5 min de lectura",
      bg: "bg-[#FFF9C4]",
      textColor: "text-amber-900",
      icon: "🥗",
    },
    {
      title: "Cómo preparar a tu mascota para su primera consulta vet",
      category: "Salud y Cuidado",
      readTime: "4 min de lectura",
      bg: "bg-[#F4CCEE]",
      textColor: "text-[#9D3C8D]",
      icon: "🩺",
    },
    {
      title: "5 Ejercicios diarios para perros en departamentos",
      category: "Bienestar",
      readTime: "6 min de lectura",
      bg: "bg-[#E8F5E9]",
      textColor: "text-emerald-900",
      icon: "🎾",
    },
  ]

  return (
    <div className="flex flex-col gap-6 font-body">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
          Consejos y Bienestar
        </h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
          Artículos, guías y recomendaciones avaladas por veterinarios para el cuidado de tu mascota.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((art, idx) => (
          <div
            key={idx}
            className={`${art.bg} ${art.textColor} rounded-3xl p-6 border border-white/40 shadow-xs flex flex-col justify-between h-56 cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-xs">
              {art.icon}
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block mb-1">
                {art.category} · {art.readTime}
              </span>
              <h3 className="font-brand font-black text-lg leading-snug">
                {art.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
