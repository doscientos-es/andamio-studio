import { Badge } from '@doscientos/ui'

import type { DocumentStatus } from '../../domain/document'

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  if (status === 'Revisado') return <Badge variant="success">Revisado</Badge>
  if (status === 'En revisión') return <Badge variant="warning">En revisión</Badge>
  return <Badge variant="outline">Borrador</Badge>
}
