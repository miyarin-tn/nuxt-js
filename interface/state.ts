export interface Credential {
  access: string
  refresh: string
}

export interface State {
  version: string
  mode: 'light' | 'dark'
  credential?: Credential
  isRefreshingToken: boolean
  isMaintenance: boolean
}

export interface SettingsState {
  language: string
}
