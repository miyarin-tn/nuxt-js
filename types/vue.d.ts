import { NuxtCookies } from 'cookie-universal-nuxt'
import type { AxiosResponse } from 'axios'

declare type ErrorListener = (...args: unknown[]) => void
declare type RedirectListener = (to: string, from: string) => string

type Auth = {
  user: any
  loggedIn: boolean
  loginWith(name: string, ...args: unknown[]): Promise<AxiosResponse | void>
  login(...args: unknown[]): Promise<AxiosResponse | void>
  fetchUser(...args: unknown[]): Promise<AxiosResponse | void>
  logout(...args: unknown[]): Promise<void>
  setUserToken(
    token: string | boolean,
    refreshToken?: string | boolean
  ): Promise<AxiosResponse | void>
  reset(...args: unknown[]): void
  refreshTokens(): Promise<AxiosResponse | void>
  setUser(user: unknown): void
  redirect(name: string, noRouter?: boolean): void
  onError(listener: ErrorListener): void
  onRedirect(listener: RedirectListener): void
  hasScope(scope: string): boolean
}

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: NuxtCookies
    $auth: Auth
  }
}
