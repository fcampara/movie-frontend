
export function setList (state, payload) {
  const newList = payload.data
  state.list = newList
}

export function addProfile (state, payload) {
  const list = state.list
  list.push(payload.data)
  state.list = list
}

export function removeProfile (state, payload) {
  const list = state.list
  state.list = list.filter((profile) => profile.id !== payload.id)
}
