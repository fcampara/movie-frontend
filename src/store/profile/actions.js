import { axios } from '../../boot/axios'
import { Loading } from 'quasar'

const URL = '/users/profiles'
export function getProfile ({ commit }, payload) {
  Loading.show('Loading profiles')
  return new Promise((resolve, reject) => {
    axios(URL).then(({ data }) => {
      commit('setList', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function createProfile ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(URL, payload).then(({ data }) => {
      commit('addProfile', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    })
  })
}

export function removeProfile ({ commit }, { id }) {
  Loading.show()
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${id}`).then(({ data }) => {
      commit('removeProfile', { id })
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}
