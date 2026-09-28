import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

import type { TechnicalDocument } from '../domain/document'
import { LocalDocumentRepository } from '../infrastructure/local-document-repository'

type DocumentCatalogValue = {
  documents: TechnicalDocument[]
  getDocument: (id: string) => TechnicalDocument | undefined
  createDocument: (document: TechnicalDocument) => void
  updateDocument: (document: TechnicalDocument) => void
  deleteDocument: (id: string) => void
}

const DocumentCatalogContext = createContext<DocumentCatalogValue | null>(null)

export function DocumentCatalogProvider({ children }: { children: ReactNode }) {
  const [repository] = useState(() => new LocalDocumentRepository())
  const [documents, setDocuments] = useState(() => repository.load())
  const currentDocuments = useRef(documents)

  const updateDocument = useCallback(
    (updatedDocument: TechnicalDocument) => {
      const nextDocuments = currentDocuments.current.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document,
      )
      currentDocuments.current = nextDocuments
      setDocuments(nextDocuments)
      repository.save(nextDocuments)
    },
    [repository],
  )

  const createDocument = useCallback(
    (document: TechnicalDocument) => {
      const nextDocuments = [document, ...currentDocuments.current]
      repository.save(nextDocuments)
      currentDocuments.current = nextDocuments
      setDocuments(nextDocuments)
    },
    [repository],
  )

  const deleteDocument = useCallback(
    (id: string) => {
      const nextDocuments = currentDocuments.current.filter((document) => document.id !== id)
      if (nextDocuments.length === currentDocuments.current.length) return
      repository.save(nextDocuments)
      currentDocuments.current = nextDocuments
      setDocuments(nextDocuments)
    },
    [repository],
  )

  const getDocument = useCallback(
    (id: string) => documents.find((document) => document.id === id),
    [documents],
  )

  return (
    <DocumentCatalogContext.Provider
      value={{ documents, getDocument, createDocument, updateDocument, deleteDocument }}
    >
      {children}
    </DocumentCatalogContext.Provider>
  )
}

export function useDocumentCatalog() {
  const context = useContext(DocumentCatalogContext)
  if (!context) throw new Error('useDocumentCatalog debe usarse dentro de DocumentCatalogProvider.')
  return context
}
