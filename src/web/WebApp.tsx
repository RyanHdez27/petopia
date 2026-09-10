import React, { useState } from "react"
import SidebarLayout, { NavTab } from "../components/layout/SidebarLayout"

import AuthScreen from "../features/auth/AuthScreen"
import DashboardView from "../features/dashboard/DashboardView"
import ServiceDetailView from "../features/services/ServiceDetailView"
import ServicesListView from "../features/services/ServicesListView"
import ProductDetailView from "../features/store/ProductDetailView"
import StoreListView from "../features/store/StoreListView"
import PetsView from "../features/pets/PetsView"
import CommunityView from "../features/community/CommunityView"
import ResourcesView from "../features/resources/ResourcesView"

export default function WebApp() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard")
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [cartCount, setCartCount] = useState<number>(0)

  // Cambia la pestaña activa y resetea sub-páginas
  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab)
    setActiveSubPage(null)
  }

  // Navegación directa con sub-páginas (desde acciones rápidas del dashboard)
  const handleNavigate = (tab: string, detailId?: string) => {
    setActiveTab(tab as NavTab)
    if (detailId) {
      setActiveSubPage(detailId)
    } else {
      setActiveSubPage(null)
    }
  }

  // Volver desde detalle a lista
  const handleBack = () => {
    if (activeSubPage) {
      setActiveSubPage(null)
    } else {
      setActiveTab("dashboard")
    }
  }

  const handleAddToCart = (qty: number) => {
    setCartCount((prev) => prev + qty)
  }

  return (
    <SidebarLayout
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onBack={activeSubPage ? handleBack : undefined}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      cartCount={cartCount}
    >
      {/* ── RENDERING SEGÚN PESTAÑA Y SUBPÁGINA ──────────────────────── */}
      
      {/* 1. AUTH / BIENVENIDA (Mockup Top-Left) */}
      {activeTab === "auth" && (
        <AuthScreen onLogin={() => handleSelectTab("dashboard")} />
      )}

      {/* 2. INICIO / DASHBOARD (Mockup Top-Right) */}
      {activeTab === "dashboard" && (
        <DashboardView onNavigate={handleNavigate} />
      )}

      {/* 3. SERVICIOS (Mockup Bottom-Left cuando está en detalle consulta-vet) */}
      {activeTab === "servicios" && (
        activeSubPage === "consulta-vet" ? (
          <ServiceDetailView
            onBack={() => setActiveSubPage(null)}
            onBookSuccess={() => handleSelectTab("history")}
          />
        ) : (
          <ServicesListView
            onSelectService={(serviceId) => setActiveSubPage(serviceId)}
          />
        )
      )}

      {/* 4. TIENDA (Mockup Bottom-Right cuando está en detalle tazon-essential) */}
      {activeTab === "tienda" && (
        activeSubPage === "tazon-essential" ? (
          <ProductDetailView
            onBack={() => setActiveSubPage(null)}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <StoreListView
            onSelectProduct={(productId) => setActiveSubPage(productId)}
          />
        )
      )}

      {/* 5. MASCOTAS */}
      {activeTab === "mascotas" && (
        <PetsView onNavigate={handleNavigate} />
      )}

      {/* 6. COMUNIDAD */}
      {activeTab === "comunidad" && (
        <CommunityView />
      )}

      {/* 7. RECURSOS Y CONSEJOS */}
      {activeTab === "recursos" && (
        <ResourcesView />
      )}

      {/* 8. MIS RESERVAS / HISTORIAL */}
      {activeTab === "history" && (
        <div className="flex flex-col gap-6 font-body">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#174C58] font-brand tracking-tight">
              Mis Reservas
            </h1>
            <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
              Historial y estado de tus citas veterinarias y paseos.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#E8F5E9]/50 border border-emerald-200 text-emerald-900">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-bold text-sm">Consulta veterinaria agendada</h3>
                <p className="text-xs text-slate-600">Mié 19 de Agosto · 10:30 AM · Presencial</p>
              </div>
              <span className="ml-auto text-xs font-bold px-3 py-1 bg-white rounded-full text-emerald-800 shadow-xs">
                Confirmada
              </span>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  )
}
