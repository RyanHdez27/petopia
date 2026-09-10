import { useState } from "react"
import WebApp from "./web/WebApp"
import { BrandingGallery } from "./components/branding/BrandingGallery"

export default function App() {
  const [viewMode, setViewMode] = useState<"platform" | "branding">("platform")

  return (
    <div>
      {viewMode === "platform" ? (
        <div>
          {/* Botón flotante para validar el UI Design System */}
          <aside aria-label="Validar UI Design System" className="fixed bottom-5 right-5 z-50">
            <button
              onClick={() => setViewMode("branding")}
              className="bg-[#FD704E] hover:bg-[#E85D3B] text-white px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 border border-white/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>🎨</span>
              <span>Validar UI Design System</span>
            </button>
          </aside>
          <WebApp />
        </div>
      ) : (
        <BrandingGallery onNavigateToFullApp={() => setViewMode("platform")} />
      )}
    </div>
  )
}


