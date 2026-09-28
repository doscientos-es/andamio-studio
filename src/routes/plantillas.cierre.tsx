import { createFileRoute } from '@tanstack/react-router'

import { DocumentTemplateEditorPage } from '@/features/document-library/ui/templates/document-template-editor-page'

export const Route = createFileRoute('/plantillas/cierre')({
  component: () => <DocumentTemplateEditorPage section="cierre" />,
})
