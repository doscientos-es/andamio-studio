import { getDocumentPageCount } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'

import './document-artwork.css'

export function DocumentArtwork({ document }: { document: TechnicalDocument }) {
  const pageCount = getDocumentPageCount(document.blocks, document.photos?.length ?? 0)

  return (
    <div className="document-artwork" aria-hidden="true">
      <div className="artwork-head">
        <span className="artwork-monogram">E</span>
        <span>{document.reference}</span>
      </div>
      <div className="artwork-copy">
        <strong>{document.title}</strong>
        <small>{document.location}</small>
      </div>
      <svg className="artwork-scaffold" viewBox="0 0 420 176" fill="none">
        <path d="M0 150H420" stroke="currentColor" strokeOpacity=".18" />
        <path d="M80 150V35M160 150V35M240 150V35M320 150V35" stroke="currentColor" />
        <path d="M67 65H333M67 105H333M67 145H333" stroke="currentColor" />
        <path
          d="M80 105L160 65M80 145L160 105M160 105L240 65M160 145L240 105M240 105L320 65M240 145L320 105"
          stroke="currentColor"
          strokeOpacity=".58"
        />
        <path d="M56 150H345M75 157H325" stroke="currentColor" strokeOpacity=".44" />
      </svg>
      <div className="artwork-foot">
        <span>{pageCount} páginas</span>
      </div>
    </div>
  )
}
