import { describe, expect, it } from 'vitest'

import { sampleDocuments } from '../infrastructure/sample-documents'
import { searchDocuments } from './document'

describe('searchDocuments', () => {
  it('matches location and reference without case sensitivity', () => {
    expect(searchDocuments(sampleDocuments, 'CARRER DEL PROGRÉS').map((item) => item.id)).toEqual([
      'rehabilitacion-fachada',
    ])
    expect(searchDocuments(sampleDocuments, 'ET-026-009').map((item) => item.id)).toEqual([
      'cubierta-nave',
    ])
  })

  it('returns the full list when the query is empty', () => {
    expect(searchDocuments(sampleDocuments, ' ')).toEqual(sampleDocuments)
  })
})
