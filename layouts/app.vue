<template>
  <div>
    <div class="c-options">
      <select
        v-model="currentLanguage"
        @change="setLocale($event.target.value)"
      >
        <option v-for="lng in allLanguages" :key="lng">{{ lng }}</option>
      </select>
      <label class="c-switch">
        <input v-model="checked" type="checkbox" @input="changeMode" />
        <span class="c-slider round"></span>
      </label>
    </div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACE, MODE_THEME } from '~/constants/configs'

export default {
  data() {
    return {
      modes: MODE_THEME,
      isDarkMode: false
    }
  },
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
    },
    checked: {
      get(): boolean {
        // @ts-ignore
        return this.$colorMode.value === 'dark'
      },
      set(newColor: string) {
        return newColor
      }
    }
  },
  methods: {
    ...mapActions(NAMESPACE.settings, ['setLanguage']),
    setLocale(lang: string) {
      // @ts-ignore
      this.$i18n.setLocale(lang)
      this.setLanguage(lang)
    },
    changeMode() {
      // @ts-ignore
      this.$colorMode.preference = this.checked ? 'light' : 'dark'
    }
  }
}
</script>
