import { Link, createFileRoute } from '@tanstack/react-router'

import { useDocument } from '@/features/document-library/application/use-document'
import { DocumentPreviewPage } from '@/features/document-library/ui/preview/document-preview-page'

export const Route = createFileRoute('/documents/$documentId/')({ component: DocumentPreviewRoute })

function DocumentPreviewRoute() {
  const { documentId } = Route.useParams()
  const document = useDocument(documentId)

  if (!document) return <DocumentNotFound />
  return <DocumentPreviewPage document={document} />
}

function DocumentNotFound() {
  return (
    <main className="route-state">
      <h1>No encontramos ese documento</h1>
      <p>Puede que el expediente ya no esté disponible en este navegador.</p>
      <Link to="/">Volver a documentos</Link>
    </main>
  )
}
