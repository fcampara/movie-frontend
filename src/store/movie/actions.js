import { axiosMovies, axios } from '../../boot/axios'
import { Loading, extend } from 'quasar'
import { formatMovies, getLanguage } from './functions'

const URL = '/movies'
export function moviesDicovery ({ commit }) {
  const language = getLanguage()
  Loading.show()
  const page = 1
  axiosMovies('/discover/movie', {
    params: {
      language,
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

export function suggestionsMovies ({ commit, state }, payload) {
  Loading.show()
  return new Promise((resolve, reject) => {
    const language = getLanguage()
    const genres = state.myList.map(({ genres }) => genres).flat().filter((genre) => genre)
    const noRepeatGenres = [...new Set(genres)]
    const params = 'with_genres=' + noRepeatGenres.join('&with_genres=')
    const page = 1
    axiosMovies(`/discover/movie?${params}`, {
      params: {
        language,
        page
      }
    }).then(({ data }) => {
      commit('setSuggestionList', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}

export function searchMovies (_, query) {
  const language = getLanguage()
  const page = 1
  return new Promise((resolve, reject) => {
    axiosMovies('/search/movie', {
      params: {
        language,
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

export function addWatchedToMovie ({ commit, rootState }, payload) {
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
