import type { DocumentRepository } from '../application/document-repository'
import type { TechnicalDocument } from '../domain/document'
import { sampleDocuments } from './sample-documents'

const STORAGE_KEY = 'andamio-studio:documents:v1'

export class LocalDocumentRepository implements DocumentRepository {
  constructor(
    private readonly storage: Pick<Storage, 'getItem' | 'setItem'> | null = getStorage(),
  ) {}

  load(): TechnicalDocument[] {
    const raw = this.storage?.getItem(STORAGE_KEY)
    if (!raw) return sampleDocuments

    try {
      const value: unknown = JSON.parse(raw)
      if (!isDocumentList(value)) return sampleDocuments

      const documents = value.map(normalizeSampleContent)
      if (
        documents.some(
          (document, index) => JSON.stringify(document) !== JSON.stringify(value[index]),
        )
      ) {
        this.save(documents)
      }
      return documents
    } catch {
      return sampleDocuments
    }
  }

  save(documents: TechnicalDocument[]) {
    this.storage?.setItem(STORAGE_KEY, JSON.stringify(documents))
  }
}

function normalizeSampleContent(document: TechnicalDocument): TechnicalDocument {
  const source = sampleDocuments.find((item) => item.id === document.id)
  if (!source) return document

  const previousValues: Record<string, string> = {
    'rehabilitacion-fachada': 'Cliente de muestra',
    'cubierta-nave': 'Polígono industrial · ejemplo',
    'estructura-deposito': 'Instalación industrial · ejemplo',
  }
  const previousClients: Record<string, string> = {
    'rehabilitacion-fachada': 'Cliente de muestra',
    'cubierta-nave': 'Empresa cliente ficticia',
    'estructura-deposito': 'Titular de muestra',
  }
  const previousSummaries: Record<string, string> = {
    'cubierta-nave':
      'Documento inicial con ficha de obra y estructura preparada para completar el procedimiento.',
    'estructura-deposito':
      'Muestra de expediente para explorar una segunda estructura de memoria técnica.',
  }
  const previousBlocks: Record<string, string> = {
    'roof-intro':
      'Documento de muestra para planificar el acceso temporal a la cubierta de una nave industrial.',
    'roof-scope':
      'La tipología, el emplazamiento y las dimensiones indicadas son datos ficticios. El profesional responsable debe completarlos y contrastarlos con las fuentes de obra.',
    'tank-intro':
      'Este ejemplo organiza el alcance documental para una actuación de inspección y mantenimiento en un depósito industrial.',
    'tank-scope':
      'Los datos de emplazamiento y configuración se muestran únicamente para enseñar la biblioteca de documentos. No constituyen indicaciones de diseño o montaje.',
  }

  return {
    ...document,
    location:
      document.location === previousValues[document.id] ? source.location : document.location,
    client: document.client === previousClients[document.id] ? source.client : document.client,
    summary:
      document.summary === previousSummaries[document.id] ? source.summary : document.summary,
    blocks: document.blocks.map((block) => {
      const sourceBlock = source.blocks.find((item) => item.id === block.id)
      return sourceBlock && block.text === previousBlocks[block.id]
        ? { ...block, text: sourceBlock.text }
        : block
    }),
  }
}

function getStorage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

function isDocumentList(value: unknown): value is TechnicalDocument[] {
  return (
    Array.isArray(value) &&
    value.every(
      (document) =>
        typeof document === 'object' &&
        document !== null &&
        'id' in document &&
        typeof document.id === 'string' &&
        'title' in document &&
        typeof document.title === 'string' &&
        'blocks' in document &&
        Array.isArray(document.blocks),
    )
  )
}
