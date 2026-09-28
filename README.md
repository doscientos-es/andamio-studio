# Demo de documentación técnica

Prototipo local para enseñar una biblioteca de documentos técnicos y el recorrido **biblioteca → vista previa → edición**. Usa expedientes ficticios. No llama a un modelo de IA, no calcula estructuras y no está conectado a servicios externos.

## Arrancar

Requiere Node.js 22.18.0 o superior y pnpm 9.15.2 o superior.

```powershell
pnpm install
pnpm dev
```

Vite muestra la dirección local. Para enseñar el flujo:

1. La entrada abre una cuadrícula de documentos ficticios. Busca por referencia, título o emplazamiento; haz clic en una tarjeta para abrirla.
2. En la vista previa se muestran portada, memoria de muestra, ficha y comprobaciones profesionales pendientes.
3. **Editar** abre un editor por bloques. Cambia el título o el contenido, añade texto, títulos o viñetas y vuelve a la vista previa.
4. **PDF** abre el diálogo de impresión del navegador para guardar las dos páginas de muestra como PDF.

Las ediciones se guardan en `localStorage` de este navegador para que el historial se mantenga al volver a cargar. **Restablecer datos del sitio** desde las herramientas del navegador vuelve a las fichas sintéticas originales.

## Estructura

- `src/features/document-library/domain`: documento, bloques y búsqueda pura.
- `src/features/document-library/application`: contrato del repositorio, estado compartido y hooks de lectura.
- `src/features/document-library/infrastructure`: datos sintéticos y adaptador local de demostración.
- `src/features/document-library/ui/library`: biblioteca, tarjetas y acción de impresión.
- `src/features/document-library/ui/preview`: preview y componentes de página A4 reutilizables.
- `src/features/document-library/ui/editor`: editor, barra de bloques y controles de bloque.
- `src/routes`: ruta raíz, biblioteca, vista previa y edición mediante TanStack Router.

La UI usa `@doscientos/ui`; el proyecto usa `@doscientos/configs`, Tailwind v4, Oxlint y Oxfmt.

## Calidad

```powershell
pnpm format
pnpm quality
pnpm build
```

## Límites

- Los tres expedientes son datos sintéticos; no se copian empresas, firmas, planos ni información de los PDFs recibidos.
- `localStorage` es estado de demostración del navegador, no persistencia compartida ni almacenamiento seguro de expedientes reales.
- La impresión incluye dos páginas de ejemplo y depende del diálogo del navegador; no es un generador profesional de documentos multipágina.
- Los bloques editables son texto local. La demo no lee fuentes, adjuntos, planos ni fotografías y no usa IA.
- Los estados de revisión son de interfaz. No hay aprobaciones, firma, visado, cálculo resistente ni validez legal.

Lee [el brief de demo](./DEMO_BRIEF.md) y [el mapa de evolución](./docs/demo-to-production.md) antes de ampliar el alcance.
