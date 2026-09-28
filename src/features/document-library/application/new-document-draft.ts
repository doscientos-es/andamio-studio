import type { DocumentBlock, DocumentPhoto, TechnicalDocument } from '../domain/document'
import { getDocumentPageCount } from './document-pagination'

export type NewDocumentDraft = {
  title: string
  workName: string
  client: string
  location: string
  scaffoldType: string
  intendedUse: string
  height: string
  length: string
  description: string
  observations: string
  photos: DocumentPhoto[]
}

export function createTechnicalDocument(
  draft: NewDocumentDraft,
  documents: TechnicalDocument[],
  blocks: DocumentBlock[],
): TechnicalDocument {
  const referenceNumber = getNextReferenceNumber(documents)
  const reference = `ET-${String(new Date().getFullYear()).slice(-3)}-${String(referenceNumber).padStart(3, '0')}`
  return {
    id: crypto.randomUUID(),
    reference,
    title: draft.title.trim(),
    location: draft.location.trim(),
    client: draft.client.trim(),
    scaffoldType: draft.scaffoldType.trim(),
    intendedUse: draft.intendedUse.trim(),
    height: draft.height.trim() || 'Pendiente',
    length: draft.length.trim() || 'Pendiente',
    status: 'Borrador',
    updatedAt: new Date().toISOString().slice(0, 10),
    pageCount: getDocumentPageCount(blocks, draft.photos.length),
    sourceCount: 0,
    summary: draft.description.trim(),
    blocks,
    workName: draft.workName.trim(),
    photos: draft.photos,
  }
}

function getNextReferenceNumber(documents: TechnicalDocument[]) {
  const numbers = documents.flatMap((document) => {
    const match = /^ET-\d{3}-(\d+)$/.exec(document.reference)
    return match?.[1] ? [Number(match[1])] : []
  })
  return Math.max(0, ...numbers) + 1
}
