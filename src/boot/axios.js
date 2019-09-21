import Axios from 'axios'
import { Notify } from 'quasar'
import store from '../store'
const baseURL = process.env.n.BASE_URL
const instance = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  const token = store().state.auth.token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { errors = [] } = error.response.data || {}
  const [message] = errors
  if (message) {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'fas fa-exclamation-triangle',
      actions: [{ icon: 'close', color: 'white' }],
      message
    })
  }

  return Promise.reject(error.response.data)
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = instance
}

export const axios = instance
