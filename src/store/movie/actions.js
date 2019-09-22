import { axiosMovies } from '../../boot/axios'

export function moviesDicovery ({ commit }, payload) {
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
  })
}
