# 🐾 Petopia - Plataforma de Gestión y Servicios de Mascotas

Plataforma integral tipo CRM y marketplace de servicios para tutores de mascotas, cuidadores, paseadores y veterinarias.

Arquitectura basada en **Backend API REST con Laravel 11 (PHP)** y **Frontend SPA con React 19, TypeScript y Tailwind CSS v4**.

---

## 🚀 Stack Tecnológico

### Frontend (SPA)
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Lenguaje:** TypeScript 5.7
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Enrutamiento / Estado UI:** React Router & Hooks
- **Capa API:** Cliente HTTP Fetch/Axios desacoplado con interceptores de autenticación Bearer Token

### Backend (REST API)
- **Framework:** Laravel 11
- **Lenguaje:** PHP 8.2+
- **Autenticación:** Laravel Sanctum
- **Base de Datos:** SQLite (desarrollo local) / PostgreSQL o MySQL
- **Contenedores:** Docker & Docker Compose (Sail)

---

## 📁 Estructura del Proyecto

```text
Petopia/
├── backend/                       # 🐘 Backend Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/  # Controladores REST (Auth, Pets, Services, Bookings, Products)
│   │   └── Models/                # Modelos Eloquent (User, Pet, Service, Booking, Product, etc.)
│   ├── config/                    # Configuración (cors.php, sanctum.php, etc.)
│   ├── database/                  # Migraciones y seeders con datos iniciales
│   ├── routes/
│   │   └── api.php                # Endpoints de la API (/api/v1/...)
│   └── composer.json              # Dependencias de PHP
│
├── src/                           # ⚛️ Frontend React 19 + TypeScript
│   ├── api/                       # Cliente HTTP y servicios desacoplados
│   │   ├── client.ts              # Cliente HTTP centralizado con token Bearer
│   │   └── services.ts            # Servicios de Pets, Services, Products y Bookings
│   ├── types/                     # Interfaces TypeScript alineadas con los modelos Eloquent
│   ├── components/                # Componentes reutilizables (layout, ui, branding)
│   ├── features/                  # Módulos y vistas de dominio (dashboard, pets, services, store, etc.)
│   ├── web/WebApp.tsx             # Contenedor principal de la aplicación web
│   ├── App.tsx                    # Componente raíz
│   ├── main.tsx                   # Entrypoint de React
│   └── index.css                  # Estilos globales y Tailwind CSS v4
│
├── docs/                          # Documentación del proyecto
│   ├── LARAVEL_ARCHITECTURE_PLAN.md # Especificación y plan de arquitectura completo
│   └── Petopia - Documento Consolidado.pdf
│
├── docker-compose.yml             # Orquestador Docker para ejecutar Laravel
├── package.json                   # Dependencias y scripts de Node.js
└── vite.config.ts                 # Configuración de Vite
```

---

## 🛠️ Requisitos Previos

- **Node.js** (versión 18+ o superior)
- **npm**, **pnpm** o **yarn**
- *(Opcional para el backend)* **PHP 8.2+** con **Composer** o **Docker Desktop**

---

## 📦 Instalación y Ejecución

### 1. Frontend (React 19 + Vite)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (puerto 5173 / 8443)
npm run dev
```

### 2. Backend (Laravel 11 API)

#### Opción A: Con PHP y Composer local
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
La API estará disponible en `http://localhost:8000/api/v1`.

#### Opción B: Con Docker Compose
```bash
docker compose up -d
```

---

## 📜 Scripts Disponibles en Frontend

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement (HMR). |
| `npm run build` | Compila y genera el paquete de producción optimizado en `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run format` | Formatea el código fuente utilizando `oxfmt`. |

---

## 🎨 Módulos y Vistas Web Incluidos

1. **Dashboard / Inicio:** Resumen de citas activas, estado de mascotas y accesos directos.
2. **Servicios de Cuidado:** Directorio y reserva de consultas veterinarias, paseos y spa con profesionales verificados.
3. **Tienda PeTopia:** Catálogo de productos esenciales y selector interactivo con vista previa.
4. **Mis Mascotas:** Carnet de salud, control de peso, vacunas e información médica.
5. **Comunidad:** Espacio de interacción entre tutores para compartir consejos y rutas.
6. **Recursos y Bienestar:** Guías y artículos especializados avalados por veterinarios.
