import { createFileRoute } from '@tanstack/react-router'

import { DocumentLibraryPage } from '@/features/document-library/ui/library/document-library-page'

export const Route = createFileRoute('/')({ component: DocumentLibraryPage })
