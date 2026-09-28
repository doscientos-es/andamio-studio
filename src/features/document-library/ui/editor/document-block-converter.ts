import type { JSONContent } from '@tiptap/core'

import type {
  DocumentBlock,
  DocumentBlockType,
  DocumentMark,
  DocumentTextRun,
} from '../../domain/document'

const MARK_NAMES = ['bold', 'italic', 'strike', 'code', 'underline'] as const

export function toEditorContent(blocks: DocumentBlock[]): JSONContent {
  const content: JSONContent[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (!block) continue

    if (block.type === 'bullet' || block.type === 'ordered') {
      const listType = block.type === 'bullet' ? 'bulletList' : 'orderedList'
      const items: JSONContent[] = []
      while (blocks[index]?.type === block.type) {
        const item = blocks[index]
        if (!item) break
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: toInlineContent(item.runs, item.text) }],
        })
        index += 1
      }
      index -= 1
      content.push({ type: listType, content: items })
      continue
    }

    if (block.type === 'quote') {
      content.push({
        type: 'blockquote',
        content: [{ type: 'paragraph', content: toInlineContent(block.runs, block.text) }],
      })
      continue
    }

    content.push({
      type: block.type === 'heading' ? 'heading' : 'paragraph',
      ...(block.type === 'heading' ? { attrs: { level: 2 } } : {}),
      content: toInlineContent(block.runs, block.text),
    })
  }

  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph' }] }
}

export function fromEditorContent(
  content: JSONContent,
  previous: DocumentBlock[],
): DocumentBlock[] {
  const blocks: Array<Omit<DocumentBlock, 'id'>> = []

  for (const node of content.content ?? []) {
    if (node.type === 'bulletList' || node.type === 'orderedList') {
      const type: DocumentBlockType = node.type === 'bulletList' ? 'bullet' : 'ordered'
      for (const item of node.content ?? []) {
        const runs = inlineRuns(item.content?.flatMap((child) => child.content ?? []) ?? [])
        blocks.push({ type, text: runs.map((run) => run.text).join(''), runs })
      }
      continue
    }

    if (node.type === 'blockquote') {
      const runs = inlineRuns(node.content?.flatMap((child) => child.content ?? []) ?? [])
      blocks.push({ type: 'quote', text: runs.map((run) => run.text).join(''), runs })
      continue
    }

    const type: DocumentBlockType = node.type === 'heading' ? 'heading' : 'paragraph'
    const runs = inlineRuns(node.content ?? [])
    blocks.push({ type, text: runs.map((run) => run.text).join(''), runs })
  }

  return blocks.map((block, index) => ({
    ...block,
    id: previous[index]?.id ?? crypto.randomUUID(),
  }))
}

function toInlineContent(runs: DocumentTextRun[] | undefined, text: string): JSONContent[] {
  const source = runs?.length ? runs : text ? [{ text }] : []
  return source.map((run) => ({
    type: 'text',
    text: run.text,
    ...(run.marks?.length ? { marks: run.marks.map((type) => ({ type })) } : {}),
  }))
}

function inlineRuns(nodes: JSONContent[]): DocumentTextRun[] {
  return nodes.flatMap((node) => {
    if (node.type === 'hardBreak') return [{ text: '\n' }]
    if (node.type !== 'text' || !node.text) return []
    const marks = node.marks?.map((mark) => mark.type).filter(isMark)
    return [{ text: node.text, ...(marks?.length ? { marks } : {}) }]
  })
}

function isMark(mark: string): mark is DocumentMark {
  return MARK_NAMES.includes(mark as (typeof MARK_NAMES)[number])
}
