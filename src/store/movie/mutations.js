export function setListDiscovery (state, payload) {
  state.discovery = payload
}

export function setMyList (state, payload) {
  state.myList = payload.data.map(({ details, ...rest }) => ({ ...details, ...rest }))
}

export function addMyList (state, payload) {
  const { details, ...rest } = payload.data
  state.myList.push({ ...rest, ...details })
}

export function removeMovieFromList (state, payload) {
  state.myList = state.myList.filter((movie) => movie.movieId !== payload.movieId)
}
