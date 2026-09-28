import { Button } from '@doscientos/ui'
import DragHandle from '@tiptap/extension-drag-handle-react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { GripVertical, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { DocumentBlock } from '../../domain/document'
import { fromEditorContent, toEditorContent } from './document-block-converter'
import { EditorToolbar } from './editor-toolbar'

import './rich-document-editor.css'

type HandleTarget = { pos: number } | null

export function RichDocumentEditor({
  documentId,
  blocks,
  onChange,
}: {
  documentId: string
  blocks: DocumentBlock[]
  onChange: (blocks: DocumentBlock[]) => void
}) {
  const latestBlocks = useRef(blocks)
  useEffect(() => {
    latestBlocks.current = blocks
  }, [blocks])
  const [handleTarget, setHandleTarget] = useState<HandleTarget>(null)

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: toEditorContent(blocks),
      immediatelyRender: false,
      onUpdate: ({ editor: currentEditor }) => {
        const nextBlocks = fromEditorContent(currentEditor.getJSON(), latestBlocks.current)
        latestBlocks.current = nextBlocks
        onChange(nextBlocks)
      },
      editorProps: {
        attributes: {
          class: 'rich-document-prose',
          'aria-label': 'Contenido del documento',
        },
      },
    },
    [documentId],
  )

  if (!editor) return <div className="rich-document-loading" aria-label="Preparando editor" />

  return (
    <div className="rich-document-editor">
      <EditorToolbar editor={editor} />
      <div className="rich-document-editor-surface">
        <DragHandle
          editor={editor}
          onNodeChange={({ node, pos }) => setHandleTarget(node ? { pos } : null)}
        >
          <div className="rich-document-block-actions" contentEditable={false}>
            <span className="rich-document-drag-handle" aria-label="Mover bloque">
              <GripVertical aria-hidden="true" size={15} />
            </span>
            {handleTarget && (
              <Button
                className="rich-document-delete-button"
                variant="ghost"
                size="icon-sm"
                aria-label="Eliminar bloque seleccionado"
                onPress={() =>
                  editor.chain().focus().setNodeSelection(handleTarget.pos).deleteSelection().run()
                }
              >
                <Trash2 aria-hidden="true" size={14} />
              </Button>
            )}
          </div>
        </DragHandle>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
