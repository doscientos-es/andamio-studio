import type { ReactNode } from 'react'

import type { DocumentBlock, DocumentMark } from '../../domain/document'

export function DocumentBlockContent({ blocks }: { blocks: DocumentBlock[] }) {
  const elements: ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (!block) continue
    if (block.type === 'bullet' || block.type === 'ordered') {
      const type = block.type
      const items: DocumentBlock[] = []
      while (blocks[index]?.type === type) {
        const item = blocks[index]
        if (!item) break
        items.push(item)
        index += 1
      }
      index -= 1
      const List = type === 'bullet' ? 'ul' : 'ol'
      elements.push(
        <List key={block.id}>
          {items.map((item) => (
            <li key={item.id}>{renderRuns(item)}</li>
          ))}
        </List>,
      )
      continue
    }

    if (block.type === 'heading') {
      elements.push(<h3 key={block.id}>{renderRuns(block)}</h3>)
      continue
    }

    if (block.type === 'quote') {
      elements.push(<blockquote key={block.id}>{renderRuns(block)}</blockquote>)
      continue
    }

    elements.push(<p key={block.id}>{renderRuns(block)}</p>)
  }

  return <>{elements}</>
}

function renderRuns(block: DocumentBlock): ReactNode {
  if (!block.runs?.length) return block.text

  return block.runs.map((run, index) => (
    <span key={`${block.id}-${index}`}>
      {(run.marks ?? []).reduce<ReactNode>((content, mark) => wrapMark(content, mark), run.text)}
    </span>
  ))
}

function wrapMark(content: ReactNode, mark: DocumentMark): ReactNode {
  switch (mark) {
    case 'bold':
      return <strong>{content}</strong>
    case 'italic':
      return <em>{content}</em>
    case 'strike':
      return <s>{content}</s>
    case 'code':
      return <code>{content}</code>
    case 'underline':
      return <u>{content}</u>
  }
}
