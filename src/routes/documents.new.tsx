import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const NewDocumentPage = lazy(() =>
  import('@/features/document-library/ui/create/new-document-page').then((module) => ({
    default: module.NewDocumentPage,
  })),
)

export const Route = createFileRoute('/documents/new')({
  component: () => (
    <Suspense fallback={<p className="route-state">Preparando formulario…</p>}>
      <NewDocumentPage />
    </Suspense>
  ),
})
