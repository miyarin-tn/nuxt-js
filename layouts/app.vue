<template>
  <div>
    <select
      v-model="currentLanguage"
      class="c-lang"
      @change="setLocale($event.target.value)"
    >
      <option v-for="lng in allLanguages" :key="lng">{{ lng }}</option>
    </select>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACE } from '~/constants/configs'

export default {
  head(): any {
    // @ts-ignore
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link]
    }
  },
  computed: {
    ...mapGetters(NAMESPACE.settings, ['getLanguage']),
    allLanguages(): readonly string[] {
      // @ts-ignore
      return this.$i18n.localeCodes
    },
    currentLanguage: {
      get(): string {
        // @ts-ignore
        return this.getLanguage
      },
      set(newLang: string) {
        return newLang
      }
    }
  },
  methods: {
    ...mapActions(NAMESPACE.settings, ['setLanguage']),
    setLocale(lang: string) {
      // @ts-ignore
      this.$i18n.setLocale(lang)
      this.setLanguage(lang)
    }
  }
}
</script>
