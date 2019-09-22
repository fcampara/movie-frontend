export function setListDiscovery (state, payload) {
  state.discovery = payload
}

export function setMyList (state, payload) {
  state.myList = payload.data.map(({ details, ...rest }) => ({ ...details, ...rest }))
}
