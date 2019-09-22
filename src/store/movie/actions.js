import { axiosMovies, axios } from '../../boot/axios'
import { Loading, extend } from 'quasar'
import { formatMovies } from './functions'

const URL = '/movies'
export function moviesDicovery ({ commit }) {
  Loading.show()
  const page = 1
  axiosMovies('/discover/movie', {
    params: {
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_video: true,
      page
    }
  }).then(({ data }) => {
    commit('setListDiscovery', data)
  }).finally(() => {
    Loading.hide()
  })
}

export function searchMovies ({ commit }, query) {
  const page = 1
  return new Promise((resolve, reject) => {
    axiosMovies('/search/movie', {
      params: {
        language: 'en-US',
        query,
        page
      }
    }).then(({ data }) => {
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    })
  })
}

export function addMovieToMyList ({ commit, rootState }, payload) {
  Loading.show()
  return new Promise((resolve, reject) => {
    const profileId = rootState.profile.id
    const formattedPayload = formatMovies({ ...payload, wantWatched: true })
    axios.post(`${URL}/${profileId}/myList`, formattedPayload).then(({ data }) => {
      commit('addMyList', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function getMyListMovies ({ rootState, commit }) {
  Loading.show()
  return new Promise((resolve, reject) => {
    const profileId = rootState.profile.id
    axios(`${URL}/${profileId}/myList`).then(({ data }) => {
      commit('setMyList', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function deleteMovieFromMyList ({ commit, rootState }, payload) {
  return new Promise((resolve, reject) => {
    const profileId = rootState.profile.id
    axios.delete(`${URL}/${profileId}/myList/${payload.movieId}`).then(({ data }) => {
      data = extend({}, data)
      if (payload.watched) commit('updateMyListSetWatched', data)
      else commit('removeMovieFromList', payload)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function addWatchedToMovie ({ commit, state, rootState }, payload) {
  Loading.show()
  const profileId = rootState.profile.id
  const watched = !payload.watched
  const formattedPayload = formatMovies({ ...payload, watched })
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/${profileId}/watched/${formattedPayload.movieId}`, formattedPayload).then(({ data }) => {
      commit('updateMyListSetWatched', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}
