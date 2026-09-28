export type DocumentStatus = 'Borrador' | 'En revisión' | 'Revisado'

export type DocumentBlockType = 'heading' | 'paragraph' | 'bullet' | 'ordered' | 'quote'

export type DocumentMark = 'bold' | 'italic' | 'strike' | 'code' | 'underline'

export type DocumentTextRun = {
  text: string
  marks?: DocumentMark[]
}

export type DocumentPhoto = {
  id: string
  name: string
  caption: string
  dataUrl: string
}

export type DocumentBlock = {
  id: string
  type: DocumentBlockType
  text: string
  runs?: DocumentTextRun[]
}

export type TechnicalDocument = {
  id: string
  reference: string
  title: string
  location: string
  client: string
  scaffoldType: string
  intendedUse: string
  height: string
  length: string
  status: DocumentStatus
  updatedAt: string
  pageCount: number
  sourceCount: number
  summary: string
  blocks: DocumentBlock[]
  workName?: string
  photos?: DocumentPhoto[]
}

export function searchDocuments(documents: TechnicalDocument[], query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase('es')
  if (!normalizedQuery) return documents

  return documents.filter((document) =>
    [document.title, document.reference, document.location, document.client]
      .join(' ')
      .toLocaleLowerCase('es')
      .includes(normalizedQuery),
  )
}
