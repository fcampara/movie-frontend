import { axios } from '../../boot/axios'
import { i18n } from '../../boot/i18n'
import { notify } from '../../utils/notify'

export function loginWithMailPassword ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post('/sessions', payload).then(({ data }) => {
      if (data) {
        commit('setAuth', data)
        return resolve()
      }
      return reject()
    }).catch(() => {
      return reject()
    })
  })
}

export function logout ({ commit }) {
  commit('logout', null)
}

export function createAccount (_, payload) {
  console.log(payload)
  return new Promise((resolve, reject) => {
    axios.post('/users', payload).then(({ data }) => {
      notify(i18n.t('successCreateUser'))
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    })
  })
}
