import { Link, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { useDocument } from '@/features/document-library/application/use-document'

const DocumentEditorPage = lazy(() =>
  import('@/features/document-library/ui/editor/document-editor-page').then((module) => ({
    default: module.DocumentEditorPage,
  })),
)

export const Route = createFileRoute('/documents/$documentId/edit')({
  component: DocumentEditorRoute,
})

function DocumentEditorRoute() {
  const { documentId } = Route.useParams()
  const document = useDocument(documentId)

  if (!document) {
    return (
      <main className="route-state">
        <h1>No encontramos ese documento</h1>
        <p>Puede que el expediente ya no esté disponible en este navegador.</p>
        <Link to="/">Volver a documentos</Link>
      </main>
    )
  }

  return (
    <Suspense fallback={<p className="route-state">Preparando editor…</p>}>
      <DocumentEditorPage document={document} />
    </Suspense>
  )
}
