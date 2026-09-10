import React from "react"
import PetopiaLogo from "../../components/ui/PetopiaLogo"

interface AuthScreenProps {
  onLogin: () => void
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-[#f4ccee]/30 font-body">
      {/* Contenedor principal estilo mockup */}
      <div className="w-full max-w-5xl bg-[#174C58] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative min-h-[580px]">
        {/* Decoración de ondas orgánicas en el lado izquierdo */}
        <div className="absolute top-0 right-1/2 w-72 h-72 bg-[#FD704E] rounded-full blur-3xl opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4CCEE] rounded-full blur-3xl opacity-20 pointer-events-none translate-y-1/3 -translate-x-1/3" />

        {/* ── LADO IZQUIERDO: HERO DE MARCA ──────────────────────────── */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between relative z-10 text-white">
          <div>
            {/* Logo de PeTopia en Blanco */}
            <div className="mb-10">
              <PetopiaLogo variant="white" size="lg" />
            </div>

            {/* Titular Expresivo */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-brand leading-tight tracking-tight mb-8">
              Un mundo mejor <br />
              para su bienestar
            </h1>

            {/* Lista de características con viñetas redondas */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F4CCEE]/30 text-[#F4CCEE] flex items-center justify-center text-lg font-bold shadow-xs">
                  💕
                </div>
                <span className="font-bold text-lg text-slate-100">Cuidado</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FD704E] text-white flex items-center justify-center text-lg font-bold shadow-xs">
                  🐾
                </div>
                <span className="font-bold text-lg text-slate-100">Comunidad</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9]/30 text-emerald-200 flex items-center justify-center text-lg font-bold shadow-xs">
                  🍃
                </div>
                <span className="font-bold text-lg text-slate-100">Vida más feliz</span>
              </div>
            </div>
          </div>

          {/* Microcopy inferior */}
          <p className="text-xs sm:text-sm font-medium text-teal-100/80 tracking-wide mt-6">
            Pequeñas acciones, grandes colas felices.
          </p>
        </div>

        {/* ── LADO DERECHO: FORMULARIO Y REGISTRO ────────────────────── */}
        <div className="w-full md:w-1/2 bg-[#F4CCEE]/60 p-6 sm:p-10 flex items-center justify-center relative">
          {/* Tarjeta Flotante Blanca */}
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-white/60 flex flex-col gap-6 text-center">
            <div>
              <h2 className="text-2xl font-black text-[#174C58] font-brand mb-2">
                Bienvenido a PeTopia
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Crea tu cuenta y comienza a vivir una mejor vida juntos.
              </p>
            </div>

            {/* Opciones de Registro / Inicio de sesión */}
            <div className="flex flex-col gap-3">
              {/* Continuar con Email (Verde Guardián) */}
              <button
                onClick={onLogin}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#174C58] hover:bg-[#0E4752] text-white font-bold text-sm shadow-md shadow-[#174C58]/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>✉️</span>
                <span>Continuar con email</span>
              </button>

              {/* Continuar con Google */}
              <button
                onClick={onLogin}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="font-black text-red-500">G</span>
                <span>Continuar con Google</span>
              </button>

              {/* Continuar con Apple */}
              <button
                onClick={onLogin}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🍎</span>
                <span>Continuar con Apple</span>
              </button>
            </div>

            {/* Footer enlace a inicio de sesión */}
            <div className="pt-2">
              <p className="text-xs text-slate-500 font-medium">
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={onLogin}
                  className="text-[#FD704E] font-bold hover:underline cursor-pointer"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
