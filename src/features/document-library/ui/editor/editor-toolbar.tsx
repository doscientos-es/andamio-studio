import { Button } from '@doscientos/ui'
import { useEditorState, type Editor } from '@tiptap/react'
import { Bold, Italic, List, ListOrdered, Pilcrow, Strikethrough } from 'lucide-react'

import './editor-toolbar.css'

export function EditorToolbar({ editor }: { editor: Editor }) {
  const active = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      bold: currentEditor.isActive('bold'),
      italic: currentEditor.isActive('italic'),
      strike: currentEditor.isActive('strike'),
    }),
  })

  return (
    <div className="editor-toolbar" role="toolbar" aria-label="Formato del documento">
      <div className="editor-toolbar-group">
        <Button
          className="editor-format-button"
          variant="ghost"
          size="icon-sm"
          aria-label="Negrita"
          aria-pressed={active.bold}
          onPress={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold aria-hidden="true" size={15} />
        </Button>
        <Button
          className="editor-format-button"
          variant="ghost"
          size="icon-sm"
          aria-label="Cursiva"
          aria-pressed={active.italic}
          onPress={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic aria-hidden="true" size={15} />
        </Button>
        <Button
          className="editor-format-button"
          variant="ghost"
          size="icon-sm"
          aria-label="Tachado"
          aria-pressed={active.strike}
          onPress={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough aria-hidden="true" size={15} />
        </Button>
      </div>
      <span className="toolbar-separator" />
      <div className="editor-toolbar-group editor-insert-group">
        <Button
          variant="ghost"
          size="sm"
          onPress={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow aria-hidden="true" size={15} /> Texto
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span className="heading-tool-icon">T</span> Título
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List aria-hidden="true" size={15} /> Viñeta
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered aria-hidden="true" size={15} /> Numerada
        </Button>
      </div>
    </div>
  )
}
