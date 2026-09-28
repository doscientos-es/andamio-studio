import { Input } from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { FilePlus2, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useDocumentCatalog } from '../../application/document-catalog'
import { searchDocuments } from '../../domain/document'
import { DocumentCard } from './document-card'

import './document-library-page.css'

export function DocumentLibraryPage() {
  const { documents } = useDocumentCatalog()
  const [query, setQuery] = useState('')
  const filteredDocuments = useMemo(() => searchDocuments(documents, query), [documents, query])

  return (
    <div className="library-page">
      <div className="library-heading">
        <div>
          <h1>Documentos técnicos</h1>
          <p>Consulta, revisa y continúa trabajando en tus expedientes.</p>
        </div>
        <div className="library-heading-actions">
          <span className="library-count">{documents.length} documentos</span>
          <Link className="new-document-link" to="/documents/new">
            <FilePlus2 aria-hidden="true" size={15} /> Nuevo documento
          </Link>
        </div>
      </div>
      <label className="library-search">
        <Search aria-hidden="true" size={16} />
        <span className="sr-only">Buscar documentos</span>
        <Input
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Buscar por obra, referencia o ubicación"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
            Limpiar
          </button>
        )}
      </label>
      {filteredDocuments.length > 0 ? (
        <div className="document-grid">
          {filteredDocuments.map((document) => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      ) : (
        <div className="library-empty">
          <Search aria-hidden="true" size={18} />
          <strong>No hay documentos con esa búsqueda</strong>
          <span>Prueba con otro título, referencia o emplazamiento.</span>
        </div>
      )}
    </div>
  )
}
