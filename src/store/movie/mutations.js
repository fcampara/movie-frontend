export function setListDiscovery (state, payload) {
  const { results = [] } = payload || {}
  state.discovery = results
}

export function setMyList (state, payload) {
  state.myList = payload.data.map(({ details, ...rest }) => ({ ...details, ...rest }))
}

export function addMyList (state, payload) {
  const myList = state.myList
  const index = state.myList.findIndex(({ movieId }) => payload.data.movieId === movieId)
  const { details, ...rest } = payload.data
  if (index >= 0) {
    myList.splice(index, 1, { ...details, ...rest })
    state.myList = myList
  } else {
    state.myList.push({ ...details, ...rest })
  }
}

export function removeMovieFromList (state, payload) {
  state.myList = state.myList.filter((movie) => movie.movieId !== payload.movieId)
}

export function updateMyListSetWatched (state, payload) {
  const myList = state.myList
  const index = myList.findIndex(({ movieId }) => payload.data.movieId === movieId)
  const { details, ...rest } = payload.data
  if (index >= 0) {
    myList.splice(index, 1, { ...details, ...rest })
    state.myList = myList
  } else {
    state.myList.push({ ...details, ...rest })
  }
}

export function setSuggestionList (state, payload) {
  state.suggestions = payload.results
}
