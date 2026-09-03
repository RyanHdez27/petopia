---
name: frontend-architecture
description: >-
  Guía y estándares de arquitectura frontend modular basada en features para Petopia Web (React 19 + TypeScript + Vite).
---

# Frontend Architecture Skill (Petopia Web)

## Principios de Diseño
1. **Modularidad por Features:** Cada dominio o módulo de negocio vive en `src/features/<feature-name>/`.
2. **Componentes Atómicos Reutilizables:** Componentes genéricos de UI (botones, inputs, badges, cards) van en `src/components/ui/`.
3. **Tipado Estricto:** Todos los modelos e interfaces globales de TypeScript residen en `src/types/`. Tipos específicos de una feature pueden residir localmente en su propia carpeta.
4. **Separación de Lógica y Presentación:** Custom hooks reutilizables en `src/hooks/` o dentro de la feature correspondiente.
5. **Mock Data y Servicios:** Los datos ficticios y contratos de servicio van en `src/data/` listos para ser conectados a APIs reales.
