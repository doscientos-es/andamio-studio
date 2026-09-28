import type { DocumentPhoto, TechnicalDocument } from '../../domain/document'

export function DocumentPhotoPages({
  document,
  firstPageNumber,
}: {
  document: TechnicalDocument
  firstPageNumber: number
}) {
  const photos = document.photos ?? []
  const pages = Array.from({ length: Math.ceil(photos.length / 4) }, (_, index) =>
    photos.slice(index * 4, index * 4 + 4),
  )

  return pages.map((page, index) => (
    <DocumentPhotoPage
      document={document}
      key={page[0]?.id ?? index}
      page={page}
      pageNumber={firstPageNumber + index}
    />
  ))
}

function DocumentPhotoPage({
  document,
  page,
  pageNumber,
}: {
  document: TechnicalDocument
  page: DocumentPhoto[]
  pageNumber: number
}) {
  return (
    <article className="document-sheet document-photo-page" id={`document-page-${pageNumber}`}>
      <div className="memo-head">
        <span>{document.reference}</span>
      </div>
      <h2>Reportaje fotográfico</h2>
      <p className="photo-page-location">{document.workName ?? document.location}</p>
      <div className="document-photo-grid">
        {page.map((photo, index) => (
          <figure key={photo.id}>
            <img src={photo.dataUrl} alt={photo.caption || `Fotografía ${index + 1}`} />
            <figcaption>{photo.caption || photo.name}</figcaption>
          </figure>
        ))}
      </div>
      <footer className="paper-footer">
        <span>Documentación gráfica aportada para revisión</span>
        <span>{String(pageNumber).padStart(2, '0')}</span>
      </footer>
    </article>
  )
}
