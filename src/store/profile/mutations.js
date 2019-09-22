import { LocalStorage } from 'quasar'
import { profileName, profileId } from '../../constants/localStorage'

export function setList (state, payload) {
  const newList = payload.data
  state.list = newList
}

export function addProfile (state, payload) {
  const list = state.list
  list.push(payload.data)
  state.list = list
}

export function removeProfile (state, payload) {
  const list = state.list
  state.list = list.filter((profile) => profile.id !== payload.id)
}

export function setProfile (state, payload) {
  state.id = payload.id
  state.name = payload.name

  LocalStorage.set(profileId, state.id)
  LocalStorage.set(profileName, state.name)
}
