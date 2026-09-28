# Evolución a producto

Esta demo solo verifica la forma de navegar entre una biblioteca, la vista previa y una edición sencilla. No hay ninguna integración de producción activa.

| Acción                | Demo actual                           | Decisión para producto                                                        | Puerta antes de producción                                      |
| --------------------- | ------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Biblioteca            | Tres expedientes ficticios            | Expedientes del cliente, búsqueda y permisos por organización                 | Validar usuarios, propiedad, visibilidad y retención            |
| Abrir y previsualizar | Dos páginas HTML con datos sintéticos | Documento completo con páginas, anexos, fotos y tablas                        | Elegir formato fuente y validar una plantilla real autorizada   |
| Editar                | Bloques de texto en el navegador      | Edición/versiones colaborativas y registro de cambios                         | Definir concurrencia, historial y aprobación profesional        |
| Guardar               | `localStorage` del navegador          | Persistencia privada por cliente/proyecto                                     | Acordar alojamiento, acceso, copias y ciclo de vida de archivos |
| Exportar PDF          | Diálogo de impresión del navegador    | PDF paginado y versionado a partir de una plantilla validada                  | Revisar saltos, fuentes, tablas, imágenes, metadatos y firma    |
| Generación asistida   | No hay IA                             | Borradores controlados con fuentes y datos trazables                          | Definir proveedor, tratamiento de datos, coste y evaluación     |
| Cálculo y normativa   | No se calculan ni verifican           | El software de cálculo existente y fuentes aprobadas siguen siendo referencia | Confirmar formatos de intercambio y responsable técnico         |
| Revisión y firma      | Indicadores visuales de muestra       | Aprobación firmada por profesional autorizado                                 | Definir roles, evidencias, bloqueo de emisión y firma/visado    |

## Pasos de producto

1. Elegir una plantilla concreta y una obra representativa autorizada.
2. Mapear campos obligatorios, opcionales, calculados y ausentes.
3. Acordar formatos de exportación del software actual y vínculo a planos, tablas y fotos.
4. Determinar fuentes normativas aprobadas, vigencia, citación y quién revisa.
5. Prototipar generación de apartados con referencias a los datos de entrada y abstención ante vacíos o contradicciones.
6. Validar estructura y salida editable/PDF con el técnico antes de integrar usuarios, almacenamiento o automatización de emisión.

## Arquitectura actual

- Dominio independiente de React: documento, bloques y búsqueda.
- Aplicación: puerto de repositorio y catálogo compartido de sesión.
- Infraestructura: fixtures y adaptador local.
- UI separada en biblioteca, tarjeta, preview, páginas A4, editor y bloques.
- Rutas tipadas con TanStack Router.

El repositorio local es un adaptador explícito de demo y se reemplaza mediante el contrato `DocumentRepository`; `localStorage` no acredita seguridad, autorización, disponibilidad ni colaboración.
