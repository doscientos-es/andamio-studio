# Brief de la demo

## Problema confirmado

El profesional diseña y calcula estructuras con software propio. El trabajo que quiere reducir es la preparación manual de documentación adicional: planes específicos de montaje y desmontaje, procedimiento, información descriptiva, dibujos complementarios y referencias normativas.

Los PDFs compartidos son ejemplos de proyectos técnicos extensos con portada, memoria, información de intervención, anexos y planos. La demo no reutiliza su texto, sus firmas ni los datos identificables de sus clientes.

## Recorrido de la demo

- **Biblioteca:** cuadrícula de expedientes sintéticos con referencia, emplazamiento, estado, fecha y páginas. La tarjeta completa abre la preview; también incluye acciones explícitas de abrir e imprimir.
- **Vista previa:** páginas de muestra, ficha del documento y controles profesionales pendientes.
- **Editor:** título y bloques de párrafo, título o viñeta editables; las modificaciones se guardan en el navegador y aparecen al volver a la preview.
- **Salida PDF:** diálogo de impresión del navegador con la portada y la memoria breve de muestra.

## Alcance y supuestos

- Tres documentos son fixtures inventados para demostrar el historial; no representan proyectos ejecutados.
- El guardado usa `localStorage` en el navegador actual. No es un backend ni un expediente compartido.
- El editor modifica bloques de texto locales. No hay generación mediante IA, lectura de archivos, fotos, tablas o conexión con software técnico.
- El PDF contiene dos páginas HTML de ejemplo. No es un documento visado, una memoria completa ni una salida técnica aprobada.
- Los avisos de revisión son ilustrativos. La validación, cálculo, firma y decisión profesional no se automatizan.

## Preguntas para validar

1. ¿Qué tipo de documento se repite más y debería ser la primera plantilla real?
2. ¿Qué información puede exportar el software propio y en qué formato?
3. ¿Qué secciones son estables y cuáles requieren redacción específica en cada obra?
4. ¿Cómo se vincularán cálculo, planos, fotografías, tablas y revisiones?
5. ¿Dónde quiere cerrar la maquetación: editor propio o Word/Drive?
6. ¿Qué normas y fuentes aprueba para cada tipo de intervención, y quién valida su aplicación?
7. ¿Quién puede revisar, firmar y visar la versión definitiva?

## Guion de cinco minutos

1. Abrir la biblioteca y explicar que son expedientes de muestra.
2. Abrir una tarjeta para enseñar la preview y las comprobaciones pendientes.
3. Entrar en **Editar**; cambiar un título o párrafo y añadir un bloque.
4. Volver a la preview para enseñar el cambio y la persistencia local.
5. Mostrar **PDF** como diálogo de impresión, aclarando que la exportación profesional se definirá en el piloto.
6. Preguntar qué plantilla y qué datos reales del software propio permitirían diseñar la primera fase.

## Módulos

| Necesidad                                | Decisión                      | Motivo                                                        |
| ---------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Primitivas de interfaz React             | Adoptar `@doscientos/ui`      | Shell, botones, campos, badges y tokens compartidos.          |
| Lint, formato, TypeScript y arquitectura | Adoptar `@doscientos/configs` | Perfiles Oxlint/Oxfmt y chequeo de capas.                     |
| React, Vite y TanStack Router            | Adoptar                       | SPA local con rutas de biblioteca, preview y editor.          |
| Tailwind CSS v4                          | Adoptar                       | Base compartida junto a CSS específico de las páginas A4.     |
| Supabase, API y autenticación            | No aplica                     | La demo no necesita usuarios ni servicios externos.           |
| IA y fuentes normativas                  | Pendiente                     | Elegir tras validar documentos, entradas, fuentes y revisión. |
| PWA, billing y VERI*FACTU                | No aplica                     | No forman parte del flujo confirmado.                         |
