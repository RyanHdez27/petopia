import React from "react"

interface StoreListViewProps {
  onSelectProduct: (productId: string) => void
}

export default function StoreListView({ onSelectProduct }: StoreListViewProps) {
  const products = [
    {
      id: "tazon-essential",
      title: "Tazón Essential",
      subtitle: "Diseño simple. Grandes momentos.",
      price: "$249 MXN",
      rating: "4.8",
      reviews: 96,
      icon: "🥣",
      bg: "bg-[#FFFDF5] border-amber-100",
      accent: "text-[#FD704E]",
    },
    {
      id: "cama-cozy",
      title: "Cama Soft Cloud",
      subtitle: "Descanso ergonómico de máxima suavidad.",
      price: "$699 MXN",
      rating: "4.9",
      reviews: 142,
      icon: "🛏️",
      bg: "bg-[#F4CCEE]/30 border-[#F4CCEE]",
      accent: "text-[#9D3C8D]",
    },
    {
      id: "juguete-interactivo",
      title: "Pelota de Juego Activo",
      subtitle: "Resistente y libre de BPA para mordidas.",
      price: "$149 MXN",
      rating: "4.7",
      reviews: 58,
      icon: "🎾",
      bg: "bg-[#E8F5E9]/50 border-emerald-200",
      accent: "text-emerald-800",
    },
  ]

  return (
    <div className="flex flex-col gap-6 font-body">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
          Tienda PeTopia
        </h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
          Productos esenciales con entrega rápida y calidad certificada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProduct(p.id)}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-[#174C58]/40 hover:shadow-md transition-all text-left flex flex-col justify-between h-72 group cursor-pointer"
          >
            <div className={`w-full h-36 rounded-2xl ${p.bg} border flex items-center justify-center text-5xl mb-4 group-hover:scale-[1.02] transition-transform`}>
              {p.icon}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#174C58] text-lg font-brand group-hover:text-[#FD704E] transition-colors">
                  {p.title}
                </h3>
                <span className="font-black text-[#174C58] text-base font-brand">
                  {p.price}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {p.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold">
              <span className="text-[#FD704E]">★ {p.rating} ({p.reviews})</span>
              <span className="text-[#174C58] font-bold">Ver producto &rarr;</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
