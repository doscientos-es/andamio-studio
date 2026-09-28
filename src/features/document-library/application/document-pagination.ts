import type { DocumentBlock } from '../domain/document'

const BODY_PAGE_CHARACTER_LIMIT = 1800
const TARGET_DEMO_PAGE_COUNT = 100

const technicalSections = [
  'Datos de partida',
  'Emplazamiento e implantación',
  'Descripción del sistema',
  'Configuración del andamio',
  'Apoyos y nivelación',
  'Estabilidad y arriostramiento',
  'Accesos y circulación',
  'Protecciones colectivas',
  'Secuencia de montaje',
  'Uso, inspección y mantenimiento',
  'Limitaciones y revisión',
]

const calculationTables = [
  'Resumen de datos de entrada',
  'Relación de elementos',
  'Características del sistema',
  'Propiedades de materiales',
  'Parámetros de cálculo',
  'Acciones consideradas',
  'Combinaciones de acciones',
  'Reacciones en apoyos',
  'Comprobación de montantes',
  'Comprobación de largueros',
  'Comprobación de diagonales',
  'Comprobación de plataformas',
  'Anclajes y amarres',
  'Despiece por niveles',
  'Resumen de comprobaciones',
  'Registro de revisión',
]

const drawingViews = [
  'Alzado general',
  'Planta de implantación',
  'Sección transversal',
  'Detalle de unión',
]

export type DocumentPreviewPageType =
  | 'certificate'
  | 'cover'
  | 'content'
  | 'section'
  | 'table'
  | 'drawing'
  | 'photo'
  | 'closing'

export type DocumentPreviewPageDescriptor = {
  pageNumber: number
  type: DocumentPreviewPageType
  label: string
  title?: string
  blocks?: DocumentBlock[]
  sequence?: number
}

export function paginateDocumentBody(blocks: DocumentBlock[]) {
  const pages: DocumentBlock[][] = []
  let page: DocumentBlock[] = []
  let pageLength = 0

  for (const block of blocks) {
    const blockLength = block.text.length
    if (page.length > 0 && pageLength + blockLength > BODY_PAGE_CHARACTER_LIMIT) {
      pages.push(page)
      page = []
      pageLength = 0
    }
    page.push(block)
    pageLength += blockLength
  }

  if (page.length > 0 || pages.length === 0) pages.push(page)
  return pages
}

export function getDocumentPageCount(blocks: DocumentBlock[], photoCount: number) {
  return getDocumentPagePlan(blocks, photoCount).length
}

export function getDocumentPagePlan(blocks: DocumentBlock[], photoCount: number) {
  const bodyPages = paginateDocumentBody(blocks)
  const photoPages = Math.ceil(photoCount / 4)
  const drawingPageCount = Math.max(
    18,
    TARGET_DEMO_PAGE_COUNT -
      3 -
      bodyPages.length -
      technicalSections.length -
      calculationTables.length -
      photoPages,
  )

  const pages: Omit<DocumentPreviewPageDescriptor, 'pageNumber'>[] = [
    { type: 'certificate', label: 'Certificado' },
    { type: 'cover', label: 'Portada técnica' },
    ...bodyPages.map((page, index) => ({
      type: 'content' as const,
      label: getBodyPageLabel(page, index, bodyPages.length),
      blocks: page,
    })),
    ...technicalSections.map((title) => ({ type: 'section' as const, label: title, title })),
    ...calculationTables.map((title, index) => ({
      type: 'table' as const,
      label: title,
      title,
      sequence: index + 1,
    })),
    ...Array.from({ length: drawingPageCount }, (_, index) => {
      const sequence = index + 1
      const view = drawingViews[index % drawingViews.length] ?? 'Alzado general'
      return {
        type: 'drawing' as const,
        label: `${view} · ${String(sequence).padStart(2, '0')}`,
        title: view,
        sequence,
      }
    }),
    ...Array.from({ length: photoPages }, (_, index) => ({
      type: 'photo' as const,
      label: photoPages > 1 ? `Reportaje fotográfico · ${index + 1}` : 'Reportaje fotográfico',
      sequence: index,
    })),
    { type: 'closing', label: 'Cierre y firma' },
  ]

  return pages.map((page, index) => ({ ...page, pageNumber: index + 1 }))
}

function getBodyPageLabel(page: DocumentBlock[], index: number, pageCount: number) {
  if (pageCount === 1) return 'Memoria técnica'
  const heading = page.find((block) => block.type === 'heading')?.text
  return heading ?? `Memoria · ${index + 1}`
}
