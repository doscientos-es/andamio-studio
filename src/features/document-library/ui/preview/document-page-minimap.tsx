import { useEffect, useRef, useState } from 'react'

import { getDocumentPageCount, getDocumentPagePlan } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'

export function DocumentPageMinimap({ document }: { document: TechnicalDocument }) {
  const pages = getDocumentPagePlan(document.blocks, document.photos?.length ?? 0)
  const [activePage, setActivePage] = useState(1)
  const pageListRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const pageElements = window.document.querySelectorAll<HTMLElement>('[id^="document-page-"]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const pageNumber = Number(visible.target.id.replace('document-page-', ''))
        if (Number.isFinite(pageNumber)) setActivePage(pageNumber)
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.1, 0.3, 0.6, 0.9] },
    )
    pageElements.forEach((page) => observer.observe(page))
    return () => observer.disconnect()
  }, [pages.length])

  useEffect(() => {
    const list = pageListRef.current
    const item = list?.querySelector<HTMLElement>(`[data-page-number="${activePage}"]`)
    if (!list || !item) return
    list.scrollTo({
      top: item.offsetTop - list.offsetTop - list.clientHeight / 3,
      behavior: 'smooth',
    })
  }, [activePage])

  return (
    <nav className="page-minimap" aria-label="Páginas del documento">
      <div className="page-minimap-heading">
        <strong>Páginas</strong>
        <span>
          {String(activePage).padStart(2, '0')} /{' '}
          {getDocumentPageCount(document.blocks, document.photos?.length ?? 0)}
        </span>
      </div>
      <ol ref={pageListRef}>
        {pages.map((page) => (
          <li data-page-number={page.pageNumber} key={page.pageNumber}>
            <a
              aria-current={activePage === page.pageNumber ? 'location' : undefined}
              aria-label={`Ir a la página ${page.pageNumber}: ${page.label}`}
              href={`#document-page-${page.pageNumber}`}
            >
              <span
                className={`page-minimap-thumb page-minimap-thumb-${page.type}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="page-minimap-label">
                <small>{String(page.pageNumber).padStart(2, '0')}</small>
                <span>{page.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
