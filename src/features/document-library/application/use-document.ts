import { useDocumentCatalog } from './document-catalog'

export function useDocument(documentId: string) {
  const { getDocument } = useDocumentCatalog()
  return getDocument(documentId)
}
