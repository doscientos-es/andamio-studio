# Estado de implementación

## Incluido

- Biblioteca inicial en cuadrícula con tres expedientes totalmente sintéticos.
- Búsqueda por título, referencia, emplazamiento o cliente.
- Tarjetas clicables con preview e impresión del documento elegido.
- Ruta de preview con portada, memoria breve, ficha y controles pendientes.
- Ruta de edición con bloques de título, párrafo y viñeta.
- Guardado local en el navegador mediante un adaptador implementado tras el contrato de repositorio.
- Shell mínimo basado en `@doscientos/ui` y estilos por componente/pantalla.

## Excluido

- API, backend, Supabase, autenticación y almacenamiento remoto.
- Lectura de los dos PDFs de cliente dentro de la aplicación.
- IA, generación de texto, cálculo, validación normativa, firma o visado.
- Composición multipágina completa; la impresión solo presenta dos páginas de muestra.
- Fotos, tablas y planos reales.

## Arquitectura

- `features/document-library/domain`: modelo y búsqueda.
- `features/document-library/application`: puerto, catálogo y hook.
- `features/document-library/infrastructure`: datos semilla y repositorio local.
- `features/document-library/ui`: biblioteca, preview, papel A4 y editor por componentes.
- `routes`: TanStack Router con ruta índice y rutas de preview y edición.

## Siguiente validación de producto

Validar la plantilla prioritaria, datos disponibles en el software existente, política de archivos y fuentes normativas antes de integrar un modelo de IA o documentos de cliente.
