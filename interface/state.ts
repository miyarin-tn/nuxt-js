export interface State {
  version: string
  mode: 'light' | 'dark'
  isMaintenance: boolean
}

export interface SettingsState {
  language: string
}
