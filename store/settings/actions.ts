import { ActionContext } from 'vuex'
import { SettingsState } from '~/interface/state'
import { Action } from '~/enum/action'

export default {
  setLanguage(
    { commit }: ActionContext<SettingsState, any>,
    payload: string
  ): Promise<any> {
    return new Promise((resolve) => {
      commit(Action.SET_LANGUAGE, payload)
      resolve(payload)
    })
  }
}
