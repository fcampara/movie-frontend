import { axiosMovies, axios } from '../../boot/axios'
import { Loading } from 'quasar'

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

export function addMovieToMyList ({ rootState }, payload) {
  Loading.show()
  return new Promise((resolve, reject) => {
    const profileId = rootState.profile.id
    const { id, title, posterPath, voteAverage, releaseDate, overview, genreIds } = payload
    const formattedPayload = {
      movieId: id,
      movieName: title,
      wantWatch: true,
      genres: genreIds,
      details: {
        posterPath,
        voteAverage,
        releaseDate,
        overview
      }
    }
    axios.post(`/movies/${profileId}/myList`, formattedPayload).then(({ data }) => {
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
    axios(`/movies/${profileId}/myList`).then(({ data }) => {
      commit('setMyList', data)
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    }).finally(() => {
      Loading.hide()
    })
  })
}