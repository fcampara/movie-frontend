import Axios from 'axios'
import { Notify } from 'quasar'
import humps from 'humps'
import store from '../store'
const baseURL = process.env.n.BASE_URL
const movieURL = process.env.n.MOVIE_API_URL
const movieKey = process.env.n.MOVIE_API_KEY

const instanceMovies = Axios.create({
  baseURL: `${movieURL}`,
  transformResponse: (data) => {
    let response = JSON.parse(data)
    if (response) {
      response = humps.camelizeKeys(response)
    }
    return response
  }
})

instanceMovies.defaults.params = {}
instanceMovies.defaults.params['api_key'] = movieKey

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
export const axiosMovies = instanceMovies
