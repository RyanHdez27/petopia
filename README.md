# 🐾 Petopia Web - Frontend (CRM & Gestión de Mascotas)

Plataforma web tipo CRM y gestión de servicios para responsables de mascotas, cuidadores, paseadores y veterinarias. 

> **Nota:** Este repositorio corresponde exclusivamente al desarrollo del **Frontend Web**.

---

## 🚀 Stack Tecnológico

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Lenguaje:** TypeScript 5.7
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Enrutamiento / Estado UI:** React Router & React Hooks

---

## 🛠️ Requisitos Previos

Asegúrate de contar con:
- **Node.js** (versión 18+ o superior recomendada)
- Un gestor de paquetes: **npm**, **pnpm** o **yarn**

---

## 📦 Instalación y Ejecución

### 1. Clonar el repositorio / Ubicarse en el proyecto
```bash
cd Petopia
```

### 2. Instalar dependencias
Usando **npm**:
```bash
npm install
```
*(O usando `pnpm install` / `yarn install`)*

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

El servidor iniciará localmente (habitualmente en `http://localhost:5173` o en el puerto indicado en la consola). Abre esa URL en tu navegador para ver la aplicación web.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement (HMR). |
| `npm run build` | Compila y genera el paquete de producción optimizado en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run format` | Formatea el código fuente utilizando `oxfmt`. |

---

## 📁 Estructura del Proyecto

```text
Petopia/
├── src/
│   ├── web/
│   │   └── WebApp.tsx       # Contenedor principal de la plataforma Web / CRM
│   ├── components/          # Componentes reutilizables (botones, tablas, modales, etc.)
│   ├── App.tsx              # Componente raíz
│   ├── main.tsx             # Entrypoint de React
│   └── index.css            # Importaciones de Tailwind CSS v4 y estilos globales
├── public/                  # Archivos y recursos estáticos
├── index.html               # Shell HTML de Vite
├── package.json             # Dependencias y scripts de ejecución
├── tsconfig.json            # Configuración de TypeScript
└── vite.config.ts           # Configuración de Vite + Tailwind CSS v4
```

---

## 🎨 Vistas y Módulos Web Incluidos

1. **Dashboard / Inicio:** Resumen de citas activas, estado de mascotas y accesos rápidos.
2. **Buscador de Servicios:** Directorio con filtros por categoría (cuidadores, veterinarias, paseadores), precios y ubicación.
3. **Perfil del Prestador:** Vista detallada con reseñas, tarifas, servicios ofrecidos y widget de reserva.
4. **Expediente / Ficha de Mascota:** Historial clínico, vacunas, datos preventivos y recordatorios.
5. **Mis Reservas / Historial:** Gestión y seguimiento del estado de solicitudes y citas.
