import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import cookie from 'cookie'
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY
} from '../constants/configs'
import { API_ROUTES } from '~/constants/api-routes'
import { State, Credential } from '~/interface/state'
import { Action } from '~/enum/action'
import { MODE_THEME } from '~/constants/configs'
import {
  isAliveJWT,
  setCookiesOfTokens,
  clearCookiesOfTokens
} from '~/utils/token'

const initialState = (): State => ({
  version: '0.1',
  mode: 'light',
  isRefreshingToken: false,
  isMaintenance: false
})

const state = initialState

const getters = <GetterTree<State, any>>{
  getVersion: (state: State) => state.version
}
const mutations = <MutationTree<State>>{
  [Action.SET_MODE](state: State, payload: State['mode']) {
    state.mode = payload
  },
  [Action.SET_CREDENTIAL](state: State, payload: Credential) {
    state.credential = payload
  },
  [Action.SET_IS_REFRESHING_TOKEN](state: State, payload: boolean) {
    state.isRefreshingToken = payload
  }
}
const actions = <ActionTree<State, any>>{
  // Nuxt call when mode is universal (only process.server)
  async nuxtServerInit(
    { commit }: ActionContext<State, any>,
    { req, res }: any
  ) {
    const cookies = cookie.parse(req?.headers.cookie || '') || {}
    const credential = {
      access: cookies[AUTH_ACCESS_TOKEN_KEY],
      refresh: cookies[AUTH_REFRESH_TOKEN_KEY]
    }
    if (!isAliveJWT(credential.access) && isAliveJWT(credential.refresh)) {
      try {
        const newCredential = await this.$axios.post(API_ROUTES.AUTH_REFRESH, {
          refresh: credential.refresh
        })
        credential.access = newCredential?.data?.access
        credential.refresh = newCredential?.data?.refresh
        setCookiesOfTokens(res, credential)
      } catch (error) {
        if (error.response?.data?.error.statusCode === 401) {
          clearCookiesOfTokens(res)
        }
      }
    }
    if (isAliveJWT(credential.access) && isAliveJWT(credential.refresh)) {
      commit(Action.SET_CREDENTIAL, credential)
    }
  },
  setMode({ commit }: ActionContext<State, any>): void {
    commit(Action.SET_MODE, MODE_THEME[1])
  },
  setCredential(
    { commit }: ActionContext<State, any>,
    payload: Credential
  ): void {
    commit(Action.SET_CREDENTIAL, payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
