---
name: mock-data-api
description: >-
  Estrategia y estructura para mock data, tipados de API y preparación para consumo de backend en Petopia Web.
---

# Mock Data & API Skill (Petopia Web)

## Organización de Datos Mock
- Mantener los mocks en `src/data/` estructurados por dominio:
  - `pets.mock.ts` - Mascotas, historial de vacunas, desparasitaciones y alergias.
  - `providers.mock.ts` - Prestadores de servicios (cuidadores, paseadores, clínicas), valoraciones y disponibilidad.
  - `bookings.mock.ts` - Reservas activas, pendientes e historial.
- Cada mock debe cumplir estrictamente con los tipos definidos en `src/types/`.
