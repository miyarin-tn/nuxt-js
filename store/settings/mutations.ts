import { Action } from '~/enum/action'
import { SettingsState } from '~/interface/state'

export default {
  [Action.SET_LANGUAGE](state: SettingsState, payload: string) {
    state.language = payload
  }
}
