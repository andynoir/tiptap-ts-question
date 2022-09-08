<template>
  <div>
    <div class="link">
      <icon @click.native="handleLinkEdit()" />
    </div>
    <hr>
    <editor-content
      :editor="editor"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

import { Editor, EditorContent } from '@tiptap/vue-2'

import type { Editor as IEditor } from '@tiptap/vue-2'

import Starter from '@tiptap/starter-kit'

import LinkExtension from '@tiptap/extension-link'

import Icon from '@/components/Icon/Icon.vue'

const ExtendedLink = LinkExtension.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      rel: {
        default: this.options.HTMLAttributes.rel
      }
    }
  }
})

@Component({
  components: {
    EditorContent,
    Icon
  }
})
export default class TheEditor extends Vue {
  @Prop({ default: '', type: String }) value!: string

  private editor: IEditor = null

  @Watch('value')
  valueHandler (value: string) {
    const isSame = this.editor.getHTML() === value

    if (isSame) {
      return
    }
    this.editor.commands.setContent(value, false)
  }

  handleLinkEdit (): void {
    const previousUrl = this.editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    const rel = window.prompt('rel', 'default-rel')

    if (url === null && rel === null) {
      return
    }

    if (url === '' && rel === '') {
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()
      return
    }

    this.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url as string, rel }) // <- typescript error here, href & target are typed, rel is not
      .run()
  }

  mounted () {
    this.editor = new Editor({
      extensions: [
        Starter,
        ExtendedLink.configure({
          openOnClick: false,
          autolink: false
        })
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  }

  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  }
}
</style>
