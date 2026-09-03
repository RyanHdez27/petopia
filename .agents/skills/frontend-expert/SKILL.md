---
name: frontend-expert
description: Estándares de desarrollo para React 19 + TypeScript + Tailwind CSS v4 en Petopia Web. Incluye patrones de arquitectura por features, preparación para React Router y TanStack Query, tipado estricto alineado a SQL/Backend y optimización de rendimiento.
---

# Frontend Expert (Petopia Web Edition)

Guía de desarrollo para construir una aplicación React 19 + TypeScript de nivel de producción, optimizada para **Tailwind CSS v4** y preparada para la integración con equipos de **Backend** y **Base de Datos (SQL)**.

---

## 🎯 Pilares del Stack

1. **Tailwind CSS v4:** Estilizado mediante clases utilitarias directas y tokens de marca (Teal & Orange), sin dependencias pesadas de librerías externas de UI.
2. **Feature-Driven Architecture:** Organización modular por dominios de negocio en `src/features/`.
3. **Tipado Estricto listo para SQL / Backend:** Modelos de datos en `src/types/` que reflejan directamente los esquemas y entidades de base de datos (IDs, relaciones, enums).
4. **Estrategia de Enrutamiento (React Router):** Preparación para rutas RESTful / SPA que el equipo de backend integrará para autenticación y vistas protegidas.
5. **Capa de Datos y Servicios (API Ready):** Mocks estructurados que facilitan la transición a llamadas HTTP reales (`fetch` / `axios` / `TanStack Query`).

---

## 📋 Checklist de Componentes

```markdown
- [ ] Tipado explícito con TypeScript (`interface Props`, `import type`)
- [ ] Sin uso de `any`; usar tipos estrictos o genéricos
- [ ] Estilos con Tailwind CSS v4 utilitarios (respetando tokens de Petopia)
- [ ] Optimización de funciones pasadas a hijos con `useCallback`
- [ ] Memoización de cálculos pesados o filtros de datos con `useMemo`
- [ ] Separación de lógica compleja en Custom Hooks (`hooks/`)
- [ ] Export default del componente al final del archivo
```

---

## 📋 Checklist de Features (`src/features/{feature-name}/`)

```markdown
- [ ] Carpeta de la feature: `src/features/{feature-name}/`
- [ ] `components/` - Componentes visuales específicos de este módulo
- [ ] `hooks/` - Lógica de estado y custom hooks del módulo
- [ ] `types/` - Tipados específicos del módulo (si no son globales)
- [ ] `api/` o `data/` - Capa de servicios y datos listos para endpoints de Backend / SQL
- [ ] `index.ts` - Exportación limpia de la vista principal del módulo
```

---

## 🧩 Aliases de Importación

| Alias | Resuelve a | Ejemplo |
| :--- | :--- | :--- |
| `@/*` | `src/*` | `import { WBadge } from '@/components/ui/WBadge'` |
| `@/features/*` | `src/features/*` | `import { Dashboard } from '@/features/dashboard'` |
| `@/types/*` | `src/types/*` | `import type { Pet, Provider } from '@/types/pet'` |
| `@/data/*` | `src/data/*` | `import { MOCK_PROVIDERS } from '@/data/providers.mock'` |

---

## 🗄️ Preparación para SQL / Base de Datos

Para cuando el equipo de base de datos (SQL) y backend se integre:

1. **Entidades con IDs y Claves:**
   ```typescript
   export interface Pet {
     id: string;              // UUID o BIGINT primario
     ownerId: string;         // Foreign Key a Users/Owners
     name: string;
     species: 'canine' | 'feline' | 'other';
     breed: string;
     ageMonths: number;
     weightKg: number;
     createdAt: string;       // ISO Timestamp
     updatedAt: string;
   }
   ```
2. **Servicios Desacoplados:**
   ```typescript
   // src/features/provider/api/providerService.ts
   import { MOCK_PROVIDERS } from '@/data/providers.mock';
   import type { Provider } from '@/types/provider';

   export const providerService = {
     // Fácilmente reemplazable por: await fetch('/api/providers')
     getAll: async (): Promise<Provider[]> => {
       return Promise.resolve(MOCK_PROVIDERS);
     },
     getById: async (id: string): Promise<Provider | undefined> => {
       return Promise.resolve(MOCK_PROVIDERS.find(p => p.id === id));
     }
   };
   ```

---

## 🚦 Preparación para Enrutamiento (React Router)

Para cuando el backend suministre autenticación y rutas de sesión:
- Mantener las rutas declarativas con `react-router`:
  - `/` -> Dashboard
  - `/servicios` -> Buscador de proveedores
  - `/proveedor/:id` -> Detalle del prestador
  - `/mascota/:id` -> Expediente clínico
  - `/reservas` -> Historial y seguimiento
