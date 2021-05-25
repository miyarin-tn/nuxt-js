import webpack from 'webpack'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME || 'NuxtJS',
    titleTemplate: '%s | Yuudachi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://i18n.nuxtjs.org/setup
    'nuxt-i18n', // i18n have to put before axios
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt'
  ],

  router: {
    middleware: ['authenticated', 'slash']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8080'
  },

  auth: {
    strategies: {
      /* local: {
        scheme: 'local',
        token: {
          property: 'access'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh-token', method: 'post' },
          user: { url: '/auth/me', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      } */
      local: {
        scheme: 'local',
        endpoints: false
      }
    },
    localStorage: false,
    /* cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        secure: true
      }
    }, */
    cookie: false,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  // i18n module configuration: https://i18n.nuxtjs.org/setup
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.ts'
      },
      {
        code: 'vi',
        iso: 'vi-VN',
        file: 'vi.ts'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },

  // Server Middleware custom API endpoint
  serverMiddleware: [
    '~/server-middleware/hook.ts',
    { path: '/api', handler: '~/server-middleware/index.ts' }
  ],

  // Server Configuration
  server: {
    port: process.env.APP_PORT || 3000
  }
}
