<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link]
    }
  }
}
</script>
