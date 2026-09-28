import type { TechnicalDocument } from '../domain/document'

export interface DocumentRepository {
  load(): TechnicalDocument[]
  save(documents: TechnicalDocument[]): void
}
