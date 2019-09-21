import { i18n } from '../../boot/i18n'
import { axios } from '../../boot/axios'
import { Loading } from 'quasar'

export function loginWithMailPassword ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    Loading.show(i18n.t('loadingUserInformation'))
    axios.post('/sessions', payload).then(({ data }) => {
      if (data) {
        commit('setAuth', data)
        return resolve()
      }
      return reject()
    }).catch(() => {
      return reject()
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function logout ({ commit }) {
  commit('logout', null)
}
