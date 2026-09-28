import type { TechnicalDocument } from '../../domain/document'
import { DocumentArtwork } from '../shared/document-artwork'

export function DocumentCoverPage({ document }: { document: TechnicalDocument }) {
  return (
    <article className="document-sheet document-cover-page" id="document-page-2">
      <div className="cover-artwork">
        <DocumentArtwork document={document} />
      </div>
      <div className="cover-facts">
        <div>
          <span>EMPLAZAMIENTO</span>
          <strong>{document.location}</strong>
        </div>
        <div>
          <span>CONFIGURACIÓN</span>
          <strong>{document.scaffoldType}</strong>
        </div>
        <div>
          <span>DIMENSIONES DE REFERENCIA</span>
          <strong>
            {document.height} alto · {document.length} longitud
          </strong>
        </div>
      </div>
      <footer className="paper-footer">
        <span>PROYECTO TÉCNICO DE ANDAMIO</span>
        <span>02</span>
      </footer>
    </article>
  )
}
