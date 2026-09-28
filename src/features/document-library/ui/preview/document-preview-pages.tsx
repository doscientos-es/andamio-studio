import { getDocumentPagePlan } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'
import { DocumentCertificatePage } from './document-certificate-page'
import { DocumentClosingPage } from './document-closing-page'
import { DocumentCoverPage } from './document-cover-page'
import { DocumentMemoPage } from './document-memo-page'
import { DocumentPhotoPages } from './document-photo-pages'
import { DocumentTechnicalPage } from './document-technical-page'

import './document-paper.css'

export function DocumentPreviewPages({ document }: { document: TechnicalDocument }) {
  const pages = getDocumentPagePlan(document.blocks, document.photos?.length ?? 0)
  const bodyPages = pages.filter((page) => page.type === 'content')
  const technicalPages = pages.filter(
    (page) => page.type === 'section' || page.type === 'table' || page.type === 'drawing',
  )
  const firstPhotoPage = pages.find((page) => page.type === 'photo')?.pageNumber ?? 0
  const closingPage = pages[pages.length - 1]?.pageNumber ?? 1

  return (
    <div className="document-preview-pages">
      <DocumentCertificatePage document={document} />
      <DocumentCoverPage document={document} />
      {bodyPages.map((page) => (
        <DocumentMemoPage
          blocks={page.blocks ?? []}
          document={document}
          key={page.pageNumber}
          pageNumber={page.pageNumber}
        />
      ))}
      {technicalPages.map((page) => (
        <DocumentTechnicalPage document={document} key={page.pageNumber} page={page} />
      ))}
      {firstPhotoPage > 0 && (
        <DocumentPhotoPages document={document} firstPageNumber={firstPhotoPage} />
      )}
      <DocumentClosingPage document={document} pageNumber={closingPage} />
    </div>
  )
}
