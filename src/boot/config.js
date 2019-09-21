
export default async ({ Vue }) => {
  Vue.mixin({
    computed: {
      _config: () => ({
        input: {
          outlined: true,
          dense: true,
          class: 'q-pa-xs q-mb-xs primary'
        }
      })
    }
  })
}
