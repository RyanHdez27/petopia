import React from "react"

export default function CommunityView() {
  const posts = [
    {
      author: "Camila R.",
      pet: "Mochi (Golden)",
      avatar: "🐶",
      bgAvatar: "bg-[#FFF2EE] text-[#FD704E]",
      time: "Hace 2 horas",
      title: "¡Recomendación de parque canino en Chapinero!",
      content: "Ayer llevamos a Mochi al parque remodelado. ¡El área con césped sintético y bebederos automáticos quedó genial!",
      likes: 24,
      comments: 7,
      tag: "Parques y Rutas",
    },
    {
      author: "Mateo S.",
      pet: "Kira (Gato Persa)",
      avatar: "🐱",
      bgAvatar: "bg-[#F4CCEE] text-[#9D3C8D]",
      time: "Hace 5 horas",
      title: "¿Algún consejo para desparasitación de gatos jóvenes?",
      content: "Kira cumplió 6 meses y estoy buscando recomendaciones de clínicas vet aliadas que tengan atención sin estrés.",
      likes: 18,
      comments: 12,
      tag: "Consejos Vet",
    },
  ]

  return (
    <div className="flex flex-col gap-6 font-body">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
          Comunidad PeTopia
        </h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
          Conecta con otros tutores de mascotas, comparte experiencias y resuelve dudas.
        </p>
      </div>

      {/* Rejilla de Publicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((p, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${p.bgAvatar} flex items-center justify-center text-xl font-bold`}>
                    {p.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] text-sm">{p.author}</h3>
                    <p className="text-[11px] text-slate-400 font-semibold">{p.pet} · {p.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E8F5E9] text-emerald-800 text-[10px] font-bold">
                  {p.tag}
                </span>
              </div>

              <h4 className="font-bold text-[#174C58] text-base mb-2 font-brand">
                {p.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {p.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
              <button className="flex items-center gap-1.5 hover:text-[#FD704E] cursor-pointer">
                <span>❤️</span> {p.likes} me gusta
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#174C58] cursor-pointer">
                <span>💬</span> {p.comments} comentarios
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
