# ADR-001: stack y base visual de la demo

## Estado

Aceptado para el prototipo local; revisar al confirmar el flujo de producción.

## Decisión

- Usar React, Vite, TanStack Router, Tailwind v4, @doscientos/ui y @doscientos/configs.
- No añadir servidor, auth, Supabase, proveedor de IA, PWA, billing ni integración de firma.
- Componer el shell y la UI de dominio en la app; reutilizar primitivos publicados desde Doscientos.
- Usar base visual temporal hueso/blanco y verde apagado, sin logo ni tipografía remota.
- Mantener las páginas de documento como HTML imprimible para la demostración; no prometer edición completa de maquetación.

## Motivo

El objetivo actual es validar experiencia, campos, fuentes y revisión con una persona usuaria. Las integraciones y retención documental dependen de decisiones pendientes. El prototipo debe arrancar localmente, sin credenciales ni red, y mantener una posible ruta de evolución en la arquitectura de features.

## Revisión al avanzar

Cambiar esta decisión si el usuario necesita documentos Word editables, editor de maquetación, acceso multiusuario, conservación documental, extracción de planos o una fuente normativa conectada.
