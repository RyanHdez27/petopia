# 🏛️ Plan de Arquitectura y Migración: Petopia (Laravel 11+ API REST + React 19 SPA)

Este documento define la reestructuración completa del proyecto Petopia para adoptar **Laravel (PHP)** como Backend API y conservar **React 19 + TypeScript + Tailwind CSS** como Frontend SPA desacoplado dentro de un repositorio unificado (Monorepo o estructura organizada).

---

## 🧭 1. Visión General de la Arquitectura

```
                        ┌──────────────────────────────┐
                        │      Cliente Navegador       │
                        │    (React 19 + TypeScript)   │
                        └──────────────┬───────────────┘
                                       │ HTTP / JSON (Axios/Fetch)
                                       │ Bearer Token (Sanctum)
                                       ▼
                        ┌──────────────────────────────┐
                        │        Nginx / Apache        │
                        └──────────────┬───────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │       Laravel 11+ REST       │
                        │ ┌──────────────────────────┐ │
                        │ │  Routes (routes/api.php) │ │
                        │ └────────────┬─────────────┘ │
                        │ ┌────────────▼─────────────┐ │
                        │ │  Controllers & FormReqs  │ │
                        │ └────────────┬─────────────┘ │
                        │ ┌────────────▼─────────────┐ │
                        │ │   Services / Domain Log  │ │
                        │ └────────────┬─────────────┘ │
                        │ ┌────────────▼─────────────┐ │
                        │ │   Eloquent Models & ORM  │ │
                        │ └────────────┬─────────────┘ │
                        └──────────────┼───────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │    PostgreSQL / MySQL / DB   │
                        └──────────────────────────────┘
```

---

## 📂 2. Estructura de Carpetas Propuesta

Adoptamos una arquitectura clara y desacoplada:

```text
Petopia/
├── backend/                       # 🐘 Backend Laravel (PHP 8.2+)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/   # Controladores REST API
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PetController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   ├── BookingController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── CommunityPostController.php
│   │   │   │   └── ResourceController.php
│   │   │   ├── Requests/          # Validaciones de entrada (FormRequests)
│   │   │   │   ├── PetRequest.php
│   │   │   │   └── BookingRequest.php
│   │   │   └── Resources/         # Transformadores JSON (API Resources)
│   │   │       ├── PetResource.php
│   │   │       ├── ServiceResource.php
│   │   │       └── BookingResource.php
│   │   ├── Models/                # Modelos Eloquent
│   │   │   ├── User.php
│   │   │   ├── Pet.php
│   │   │   ├── Service.php
│   │   │   ├── Booking.php
│   │   │   ├── Product.php
│   │   │   ├── CommunityPost.php
│   │   │   └── ResourceArticle.php
│   │   └── Services/              # Lógica de Negocio desacoplada
│   ├── config/
│   │   ├── cors.php               # Habilitar CORS para el cliente Vite
│   │   └── sanctum.php            # Autenticación por Tokens
│   ├── database/
│   │   ├── migrations/            # Definición del esquema de base de datos
│   │   ├── seeders/               # Población de datos de prueba
│   │   └── factories/
│   ├── routes/
│   │   └── api.php                # Endpoints REST (/api/v1/...)
│   ├── composer.json              # Dependencias PHP
│   └── .env.example
│
├── frontend/                      # ⚛️ Frontend React 19 + Vite (o raíz actual)
│   ├── src/
│   │   ├── api/                   # Cliente HTTP (Axios / Fetch) y endpoints
│   │   │   ├── client.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── pets.service.ts
│   │   │   ├── services.service.ts
│   │   │   └── products.service.ts
│   │   ├── types/                 # Interfaces TypeScript espejo de los modelos
│   │   ├── components/            # UI compartida
│   │   └── features/              # Vistas y componentes de dominio
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                          # Documentación del proyecto
└── docker-compose.yml             # Orquestador local (PHP + Nginx + MySQL/Postgres)
```

---

## 🗄️ 3. Modelo de Datos y Entidades (Eloquent)

### 1. `User`
- `id`, `name`, `email`, `password`, `phone`, `role` (owner, provider, vet, admin), `avatar_url`, `timestamps`

### 2. `Pet`
- `id`, `user_id` (FK), `name`, `species` (perro, gato, otro), `breed`, `gender`, `birthdate_or_age`, `weight`, `microchip_id`, `avatar_url`, `medical_notes`, `timestamps`

### 3. `Service`
- `id`, `provider_id` (FK User), `title`, `slug`, `category` (veterinaria, paseo, spa, guarderia), `description`, `price`, `duration_minutes`, `rating`, `reviews_count`, `icon`, `is_active`, `timestamps`

### 4. `Booking` (Citas y Reservas)
- `id`, `user_id` (FK), `pet_id` (FK), `service_id` (FK), `booking_date`, `booking_time`, `status` (pending, confirmed, completed, cancelled), `notes`, `total_price`, `timestamps`

### 5. `Product` (Tienda PeTopia)
- `id`, `name`, `slug`, `category`, `description`, `price`, `stock`, `rating`, `color_variants` (JSON), `image_url`, `timestamps`

### 6. `CommunityPost` (Comunidad)
- `id`, `user_id` (FK), `pet_id` (FK nullable), `title`, `content`, `tag`, `likes_count`, `timestamps`

### 7. `ResourceArticle` (Guías y Artículos)
- `id`, `title`, `slug`, `category`, `read_time`, `content`, `image_url`, `timestamps`

---

## 🌐 4. Definición de Endpoints API (`routes/api.php`)

| Método | Endpoint | Descripción | Auth Requerida |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/login` | Inicio de sesión y emisión de Token | No |
| `POST` | `/api/v1/auth/register` | Registro de usuario | No |
| `POST` | `/api/v1/auth/logout` | Revocación de Token | Sí |
| `GET` | `/api/v1/auth/me` | Perfil del usuario autenticado | Sí |
| `GET` | `/api/v1/pets` | Listar mascotas del tutor actual | Sí |
| `POST` | `/api/v1/pets` | Crear expediente de mascota | Sí |
| `GET` | `/api/v1/pets/{id}` | Detalle y carnet de salud | Sí |
| `PUT` | `/api/v1/pets/{id}` | Actualizar ficha médica de mascota | Sí |
| `DELETE` | `/api/v1/pets/{id}` | Eliminar mascota | Sí |
| `GET` | `/api/v1/services` | Directorio de servicios y filtros | No |
| `GET` | `/api/v1/services/{id}` | Ficha de servicio y disponibilidad | No |
| `GET` | `/api/v1/bookings` | Historial de citas del usuario | Sí |
| `POST` | `/api/v1/bookings` | Agendar nueva cita de servicio | Sí |
| `GET` | `/api/v1/products` | Catálogo de productos | No |
| `GET` | `/api/v1/products/{id}` | Detalle de producto | No |
| `GET` | `/api/v1/community/posts` | Muro de la comunidad | No |
| `POST` | `/api/v1/community/posts` | Crear publicación en comunidad | Sí |
| `GET` | `/api/v1/resources` | Artículos y consejos veterinarios | No |

---

## ⚡ 5. Integración en el Frontend React

1. **Cliente HTTP Centralizado (`src/api/client.ts`)**:
   - Axios / Fetch configurado con `baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'`.
   - Interceptores para adjuntar automáticamente el `Bearer ${token}` guardado en localStorage o cookie segura.
2. **Capa de Servicios**:
   - Funciones tipadas (`getPets()`, `bookService()`, `login()`) que devuelven Promesas con las interfaces de TypeScript alineadas a los esquemas de Laravel.
3. **Manejo de Estado Asíncrono**:
   - Preparación para TanStack Query o hooks de estado con indicadores de carga (`loading`), error y mutaciones optimistas.

---

## 🚀 6. Siguientes Pasos de Ejecución

1. **Creación del esqueleto Laravel (`backend/`)**:
   - Generar estructura estándar de Laravel con `composer.json`, kernel HTTP, configuración de base de datos, migraciones, modelos y controladores API.
2. **Configuración de Docker (`docker-compose.yml`)**:
   - Contenedor para PHP 8.2 FPM, MySQL/PostgreSQL y Nginx para poder ejecutar Laravel directamente sin necesidad de instalar PHP globalmente en la máquina física si se prefiere Docker.
3. **Capa de Conexión en React (`src/api/`)**:
   - Crear los tipos e interfaces basados en los modelos Eloquent y la capa de servicios API que reemplazará gradualmente los datos estáticos (`serviceList`, `products`, `posts`).
