import { LocalStorage } from 'quasar'
import { token, userInfo } from '../../constants/localStorage'

export function setAuth (state, payload) {
  state.user = payload.user
  state.token = payload.token

  LocalStorage.set(token, state.token)
  LocalStorage.set(userInfo, state.user)
}

export function logout (state) {
  state.user = null
  state.token = null

  LocalStorage.remove(token)
  LocalStorage.remove(userInfo)
}
