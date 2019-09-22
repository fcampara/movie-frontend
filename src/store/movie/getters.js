export function wantWatch (state) {
  return state.myList.filter(({ wantWatch }) => wantWatch)
}
