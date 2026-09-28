import { Button } from '@doscientos/ui'
import { ArrowDownToLine } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { TechnicalDocument } from '../../domain/document'
import { DocumentPrintView } from '../preview/document-print-view'

export function PdfExportButton({ document }: { document: TechnicalDocument }) {
  const [printReady, setPrintReady] = useState(false)

  useEffect(() => {
    const resetPrintView = () => setPrintReady(false)
    window.addEventListener('afterprint', resetPrintView)
    return () => window.removeEventListener('afterprint', resetPrintView)
  }, [])

  function exportPdf() {
    setPrintReady(true)
    window.setTimeout(() => window.print(), 100)
  }

  return (
    <>
      <Button variant="outline" size="sm" onPress={exportPdf}>
        <ArrowDownToLine aria-hidden="true" />
        PDF
      </Button>
      {printReady && <DocumentPrintView document={document} />}
    </>
  )
}
