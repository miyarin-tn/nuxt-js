import Vue from 'vue'
import combineURL from '~/utils/url'

Vue.mixin({
  methods: {
    assetsURL(url) {
      if (url) {
        switch (url) {
          case 'default_avatar':
            return require('~/assets/images/default_avatar.jpg')
          case 'default_thumb':
            return require('~/assets/images/default_thumb.jpg')
          default:
            return combineURL(process.env.STORAGE_BASE_URL || '', url)
        }
      }
      return require('~/assets/images/default_thumb.jpg')
    },
    browseImageURL(image: object | string): string {
      if (image) {
        try {
          return typeof image === 'object' ? URL.createObjectURL(image) : image
        } catch (err) {
          console.log(err)
          // @ts-ignore
          return this.assetsURL('default_avatar')
        }
      }
      // @ts-ignore
      return this.assetsURL('default_avatar')
    }
  }
})
