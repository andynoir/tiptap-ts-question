<template>
  <div>
    <client-only>
      <the-editor v-model="text" />
    </client-only>

    <hr>

    raw:
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import TheEditor from '@/components/TheEditor/TheEditor.vue'

@Component({
  components: {
    TheEditor
  }
})
export default class MainPage extends Vue {
  private text: string = ''
}
</script>
