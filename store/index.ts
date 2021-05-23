import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import { State } from '~/interface/state'
import { Action } from '~/enum/action'
import { MODE_THEME } from '~/constants/configs'

const initialState = (): State => ({
  version: '0.1',
  mode: 'light',
  isMaintenance: false
})

const state = initialState

const getters = <GetterTree<State, any>>{
  getVersion: (state: State) => state.version
}
const mutations = <MutationTree<State>>{
  [Action.SET_MODE](state: State, payload: State['mode']) {
    state.mode = payload
  }
}
const actions = <ActionTree<State, any>>{
  setMode({ commit }: ActionContext<State, any>): void {
    commit(Action.SET_MODE, MODE_THEME[1])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
