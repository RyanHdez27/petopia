import React, { useState } from "react"

interface ProductDetailViewProps {
  onBack: () => void
  onAddToCart?: (qty: number) => void
}

type ColorOpt = "orange" | "pink" | "teal" | "cream"

export default function ProductDetailView({ onBack, onAddToCart }: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOpt>("orange")
  const [quantity, setQuantity] = useState<number>(1)
  const [addedToast, setAddedToast] = useState(false)

  const colors: { id: ColorOpt; label: string; hex: string; bgClass: string; bowlColor: string }[] = [
    { id: "orange", label: "Naranja", hex: "#FD704E", bgClass: "bg-[#FD704E]", bowlColor: "#FD704E" },
    { id: "pink", label: "Rosa", hex: "#F4CCEE", bgClass: "bg-[#F4CCEE]", bowlColor: "#F4CCEE" },
    { id: "teal", label: "Verde Guardián", hex: "#174C58", bgClass: "bg-[#174C58]", bowlColor: "#174C58" },
    { id: "cream", label: "Crema", hex: "#FFFFE9", bgClass: "bg-[#FFFFE9] border border-slate-300", bowlColor: "#F7F5DC" },
  ]

  const currentColor = colors.find((c) => c.id === selectedColor) || colors[0]

  const handleAdd = () => {
    onAddToCart?.(quantity)
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 font-body max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ── COLUMNA IZQUIERDA: GALERÍA DE PRODUCTO ────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* VISTA PREVIA PRINCIPAL DEL TAZÓN EN CONTENEDOR CREMA */}
          <div className="w-full aspect-4/3 rounded-3xl bg-[#FFFDF5] border border-amber-100/80 p-8 flex items-center justify-center relative overflow-hidden shadow-xs">
            {/* Render 3D SVG estilizado del Tazón Essential */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
              {/* Sombra de suelo */}
              <div className="absolute bottom-4 w-40 h-8 bg-slate-900/10 rounded-full blur-md" />

              {/* Cuerpo del Tazón 3D con huella de mascota */}
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id={`bowlGrad-${selectedColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={currentColor.bowlColor} />
                    <stop offset="100%" stopColor={selectedColor === "cream" ? "#E2DFBE" : "#0E4752"} stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                {/* Base del tazón */}
                <ellipse cx="100" cy="125" rx="85" ry="25" fill={`url(#bowlGrad-${selectedColor})`} />
                <path
                  d="M15 125 C 15 70, 40 45, 100 45 C 160 45, 185 70, 185 125 Z"
                  fill={currentColor.bowlColor}
                />
                {/* Borde superior del tazón */}
                <ellipse cx="100" cy="45" rx="60" ry="18" fill="#FFFFFF" fillOpacity="0.4" />
                <ellipse cx="100" cy="48" rx="54" ry="14" fill={currentColor.bowlColor} />
                {/* Huella estilizada en el centro del tazón */}
                <g fill="#FFFFFF" fillOpacity="0.9" transform="translate(100, 95) scale(0.65)">
                  <ellipse cx="0" cy="5" rx="14" ry="11" />
                  <circle cx="-16" cy="-12" r="5" />
                  <circle cx="-6" cy="-18" r="5.5" />
                  <circle cx="6" cy="-18" r="5.5" />
                  <circle cx="16" cy="-12" r="5" />
                </g>
              </svg>
            </div>
          </div>

          {/* CILINDRO DE MINIATURAS / THUMBNAILS ACORDE AL MOCKUP */}
          <div className="grid grid-cols-4 gap-3">
            {colors.map((c) => {
              const isSelected = selectedColor === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`aspect-square rounded-2xl bg-[#FFFDF5] border-2 flex items-center justify-center p-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#174C58] shadow-sm scale-105"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* ── COLUMNA DERECHA: INFORMACIÓN Y COMPRA ────────────────────── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
              Tazón Essential
            </h1>
            <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">
              Diseño simple. Grandes momentos.
            </p>

            {/* Precio */}
            <div className="text-3xl font-black text-[#174C58] font-brand mt-4">
              $249 MXN
            </div>

            {/* Calificación por Estrellas */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-[#FD704E] text-sm">
                ★ ★ ★ ★ ★
              </div>
              <span className="font-bold text-sm text-slate-700">4.8</span>
              <span className="text-slate-400 text-xs">(96 reseñas)</span>
            </div>

            {/* Descripción */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
              Tazón de alta calidad, antideslizante y fácil de limpiar. Perfecto para el día a día de tu mascota.
            </p>
          </div>

          {/* SELECCIÓN DE COLOR */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Color: <span className="font-normal text-slate-500">{currentColor.label}</span>
            </label>
            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`w-7 h-7 rounded-full transition-all cursor-pointer ${c.bgClass} ${
                    selectedColor === c.id
                      ? "ring-2 ring-offset-2 ring-[#174C58] scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* SELECCIÓN DE CANTIDAD */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Cantidad
            </label>
            <div className="inline-flex items-center rounded-2xl bg-slate-100 p-1 border border-slate-200/80">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm text-[#333333]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* BOTÓN AGREGAR AL CARRITO */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-4 rounded-full bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-sm shadow-md shadow-[#174C58]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              <span>{addedToast ? "¡Agregado al carrito! ✓" : "Agregar al carrito"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
