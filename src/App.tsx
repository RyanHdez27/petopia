import { useState } from "react"
import WebApp from "./web/WebApp"
import { BrandingGallery } from "./components/branding/BrandingGallery"

export default function App() {
  const [viewMode, setViewMode] = useState<"branding" | "platform">("branding")

  return (
    <div>
      {viewMode === "branding" ? (
        <BrandingGallery onNavigateToFullApp={() => setViewMode("platform")} />
      ) : (
        <div>
          {/* Botón flotante para regresar a la vista de Branding */}
          <div className="fixed bottom-5 right-5 z-50">
            <button
              onClick={() => setViewMode("branding")}
              className="bg-[#174C58] hover:bg-[#0E4752] text-white px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 border border-white/20 transition-all hover:scale-105"
            >
              <span>🎨</span>
              <span>Ver UI Branding Guide (4 Pantallas)</span>
            </button>
          </div>
          <WebApp />
        </div>
      )}
    </div>
  )
}


