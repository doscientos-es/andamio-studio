import type { TechnicalDocument } from '../../domain/document'
import { DocumentPreviewPages } from './document-preview-pages'

import './document-paper.css'

export function DocumentPrintView({ document }: { document: TechnicalDocument }) {
  return (
    <div className="print-root">
      <DocumentPreviewPages document={document} />
    </div>
  )
}
