import axios from 'axios'
import { API_ROUTES } from '~/constants/api-routes'
import { APP_ROUTES } from '~/constants/app-routes'
import { CODE_RAR, TITLE_RAR, MESSAGE_RAR } from '~/constants/req-and-res'
import { Action } from '~/enum/action'
import { isAliveJWT } from '~/utils/token'

export default ({ $axios, app, store, redirect, _route, error }: any) => {
  const checkAndRefreshToken = async ({
    baseURL,
    accessToken,
    refreshToken,
    configURL,
    keepAwaitIn = 200,
    maxLoopCounter = 1000
  }: any) => {
    if (
      isAliveJWT(refreshToken) &&
      !isAliveJWT(accessToken) &&
      (!configURL.includes(API_ROUTES.AUTH_REFRESH) ||
        !configURL.includes(API_ROUTES.AUTH_LOGIN))
    ) {
      // Is any other requesting API is refreshing token ?
      if (!store.state?.isRefreshingToken) {
        // Set the other requesting is waiting
        store.commit(Action.SET_IS_REFRESHING_TOKEN, true)

        try {
          // Request the refresh token on server-middleware of nuxt.
          const res = await axios.post(`${baseURL}/refresh-token`)

          // Update store value and response data on client memory
          store.commit(Action.SET_CREDENTIAL, res?.data)

          // Clear waiting
          store.commit(Action.SET_IS_REFRESHING_TOKEN, false)
          return { ...res, headers: axios.defaults.headers }
        } catch (err) {
          console.log(err)
          // Clear waiting
          store.commit(Action.SET_IS_REFRESHING_TOKEN, false)
        }
      }

      // Return immidiately if keepAwait = 0
      if (!keepAwaitIn) {
        return
      }

      // The other requesting API is refreshing token, just waiting here.
      const isLoopChecking = async (
        ms: number,
        count: number
      ): Promise<any> => {
        if (count > maxLoopCounter) {
          return
        }

        // Check refreshing token and waiting
        if (store.state?.isRefreshingToken) {
          await new Promise((resolve) => setTimeout(resolve, ms))
          return isLoopChecking(ms, count + 1)
        }
      }
      await isLoopChecking(keepAwaitIn, 0)
    }
  }

  /**
   * Set Authorization header
   *
   * @param  {any} config
   * @param  {string} accessToken
   */
  const setAuthorizationHeader = (config: any, accessToken: string) => {
    $axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  let lang = store.state?.settings?.language
  const browserLang = app.$cookies.get('i18n_redirected')
  if (browserLang) {
    lang = browserLang
  }
  if (lang) {
    $axios.defaults.headers.common['Accept-Language'] = lang.replace(/_/g, '-')
  } else {
    delete $axios.defaults.headers.common['accept-language']
  }

  $axios.interceptors.request.use(
    async (config: any) => {
      const accessToken = store?.state?.credential?.access
      const refreshToken = store?.state?.credential?.refresh

      // Check the both site but only refresh token on client
      // On server will be refresh token at nuxtServerInit in store/index
      if (process.client) {
        if (accessToken) {
          try {
            const res = await checkAndRefreshToken({
              baseURL: API_ROUTES.BASE_API,
              accessToken,
              refreshToken,
              configURL: config.url
            })
            // Token was expired & refreshed token successfully.
            if (res) {
              if (config.baseURL === '/') {
                // Keep the same headers while requesting nuxt API server
                $axios.defaults.headers = { ...res.headers }
                config.headers = { ...res.headers.common }
              } else {
                // Only set headers Authorization if request to API.
                setAuthorizationHeader(config, res.data.access)
              }
            } else if (isAliveJWT(accessToken)) {
              // Keep the same header if nothing changed
              setAuthorizationHeader(config, accessToken)
            }
          } catch (err) {
            if (err.response?.data.code === CODE_RAR.TOKEN_EXPIRED) {
              redirect(APP_ROUTES.LOGIN)
            }
            throw err
          }
        }
      } else if (isAliveJWT(accessToken)) {
        // Keep the same header if nothing changed
        setAuthorizationHeader(config, accessToken)
      }
      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )

  $axios.interceptors.response.use(
    (res: any) => {
      return res
    },
    (err: any) => {
      const statusCode = err.response?.status
      if (statusCode === 502) {
        redirect(APP_ROUTES.MAINTENANCE)
      } else if (statusCode === 401) {
        return error({
          statusCode: 401,
          title: app.i18n.t(TITLE_RAR.ERROR),
          message: app.i18n.t(MESSAGE_RAR.UNAUTHORIZED)
        })
      }
      return Promise.reject(err)
    }
  )
}
